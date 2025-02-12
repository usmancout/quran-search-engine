import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import styles from '../../styles/styles';

const SearchForm = ({ setResults, setLoading, setError, edition, setEdition, loading, setAyahCount }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [results, setLocalResults] = useState([]);

    const RESULTS_PER_PAGE = 20; // Number of results to load per page

    const api = axios.create({
        baseURL: 'https://api.alquran.cloud/v1',
        timeout: 15000
    });

    // Handle scroll event to trigger loadMore
    useEffect(() => {
        const handleScroll = () => {
            const isAtBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 50;

            // Automatically load more when user reaches the bottom
            if (isAtBottom && hasMore && !loading) {
                loadMore();
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [hasMore, loading]);

    // Fetch search results
    const searchQuran = useCallback(async (e, newSearch = true) => {
        e?.preventDefault();
        if (!searchTerm.trim()) return;

        if (newSearch) {
            setLoading(true);
            setError('');
            setLocalResults([]);
            setResults([]);
            setAyahCount(0);
            setPage(1);
            setHasMore(true);
        } else {
            setLoading(true);
        }

        try {
            const isReference = /^\d+(:\d+)?$/.test(searchTerm);

            if (isReference) {
                const response = await api.get(`/ayah/${searchTerm}/editions/ar.alafasy,${edition}`);
                const data = response.data.data;
                const result = [{
                    reference: searchTerm,
                    arabicText: data[0].text,
                    translatedText: data[1].text,
                    surahName: data[0].surah.name,
                    surahEnglishName: data[0].surah.englishName,
                    surahNumber: data[0].surah.number,
                    ayahNumber: data[0].numberInSurah,
                    juz: data[0].juz,
                    page: data[0].page,
                    audioUrl: data[0].audio
                }];
                setLocalResults(result);
                setResults(result);
                setAyahCount(1);
                setHasMore(false);
            } else {
                const searchLanguage = getSearchLanguage(edition);
                const response = await api.get(`/search/${encodeURIComponent(searchTerm)}/all/${searchLanguage}`);
                const matches = response.data.data.matches;

                if (!matches.length) {
                    setError('No matches found. Try different keywords.');
                    setHasMore(false);
                    return;
                }

                setAyahCount(matches.length);
                const startIndex = (page - 1) * RESULTS_PER_PAGE;
                const endIndex = startIndex + RESULTS_PER_PAGE;

                // Check if there are more results to load
                setHasMore(endIndex < matches.length);

                // Process results in batches
                const batchResults = await processInBatches(matches, startIndex);
                setLocalResults(prevResults => [...prevResults, ...batchResults]);
                setResults(prevResults => [...prevResults, ...batchResults]);
            }
        } catch (err) {
            handleSearchError(err);
        } finally {
            setLoading(false);
        }
    }, [searchTerm, edition, page, setResults, setLoading, setError, setAyahCount]);

    // Load more results
    const loadMore = () => {
        if (!loading && hasMore) {
            setPage(prev => prev + 1);
            searchQuran(null, false);
        }
    };

    // Process results in batches
    const processInBatches = async (matches, startIndex) => {
        const results = [];
        const batchSize = 10;
        const endIndex = Math.min(startIndex + RESULTS_PER_PAGE, matches.length);
        const relevantMatches = matches.slice(startIndex, endIndex);

        for (let i = 0; i < relevantMatches.length; i += batchSize) {
            const batch = relevantMatches.slice(i, Math.min(i + batchSize, relevantMatches.length));

            const batchPromises = batch.map(match => {
                const reference = `${match.surah.number}:${match.numberInSurah}`;
                return api.get(`/ayah/${reference}/editions/ar.alafasy,${edition}`)
                    .then(response => ({
                        reference,
                        arabicText: response.data.data[0].text,
                        translatedText: response.data.data[1].text,
                        surahName: response.data.data[0].surah.name,
                        surahEnglishName: response.data.data[0].surah.englishName,
                        surahNumber: response.data.data[0].surah.number,
                        ayahNumber: response.data.data[0].numberInSurah,
                        juz: response.data.data[0].juz,
                        page: response.data.data[0].page,
                        audioUrl: response.data.data[0].audio,
                        searchScore: match.score || 0
                    }))
                    .catch(error => ({
                        reference,
                        error: true,
                        message: error.message
                    }));
            });

            try {
                const batchResults = await Promise.all(batchPromises);
                const validResults = batchResults.filter(result => !result.error);
                results.push(...validResults);
            } catch (error) {
                console.error('Batch processing error:', error);
            }
        }

        return results;
    };

    // Handle search errors
    const handleSearchError = (err) => {
        if (axios.isAxiosError(err)) {
            if (err.code === 'ERR_NETWORK') {
                setError('Network error. Please check your internet connection.');
            } else if (err.code === 'ECONNABORTED') {
                setError('Request timed out. Please try again.');
            } else {
                setError(`Error: ${err.response?.data?.message || 'Failed to fetch results'}`);
            }
        } else {
            setError('An unexpected error occurred. Please try again.');
        }
        console.error('Search error:', err);
    };

    // Get search language based on edition
    const getSearchLanguage = (editionCode) => {
        if (editionCode.startsWith('ur')) return 'ur';
        if (editionCode.startsWith('ar')) return 'ar';
        return 'en';
    };

    return (
        <div>
            <form onSubmit={(e) => searchQuran(e, true)} style={styles.searchForm}>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Enter keyword or ayah reference (e.g., patience, 2:255)"
                    style={styles.input}
                />
                <select
                    value={edition}
                    onChange={(e) => setEdition(e.target.value)}
                    style={styles.select}
                >
                    <option value="en.asad">English - Asad</option>
                    <option value="ur.jalandhry">Urdu - Jalandhry</option>
                    <option value="en.pickthall">English - Pickthall</option>
                    <option value="ar.alafasy">Arabic - Alafasy</option>
                </select>
                <button type="submit" style={styles.button} disabled={loading || !searchTerm.trim()}>
                    {loading && page === 1 ? 'Searching...' : 'Search'}
                </button>
            </form>

            {loading && page > 1 && (
                <div style={styles.loading}>
                    Loading more results...
                </div>
            )}
        </div>
    );
};

export default SearchForm;