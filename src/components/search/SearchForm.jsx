import React, { useState } from 'react';
import axios from 'axios';
import styles from '../../styles/styles';

const SearchForm = ({ setResults, setLoading, setError, edition, setEdition, loading, setAyahCount, setSearchTerm }) => {
    const [searchInput, setSearchInput] = useState('');

    const searchQuran = async (e) => {
        e.preventDefault();
        if (!searchInput) return;

        setLoading(true);
        setError('');
        setResults([]);
        setAyahCount(0); // Reset ayah count
        setSearchTerm(searchInput); // Set the searched keyword

        try {
            let searchResults = [];
            const isReference = /^\d+(:\d+)?$/.test(searchInput);

            if (isReference) {
                const response = await axios.get(
                    `http://api.alquran.cloud/v1/ayah/${searchInput}/editions/ar.alafasy,${edition}`
                );
                const data = response.data.data;
                searchResults.push({
                    reference: searchInput,
                    arabicText: data[0].text,
                    translatedText: data[1].text,
                    surahName: data[0].surah.name,
                    surahEnglishName: data[0].surah.englishName,
                    audioUrl: data[0].audio,
                });
                setAyahCount(1); // Set ayah count to 1 for a single reference
            } else {
                const response = await axios.get(`https://api.alquran.cloud/v1/search/${searchInput}/all/en`);
                const matches = response.data.data.matches;

                for (let match of matches) {
                    const reference = `${match.surah.number}:${match.numberInSurah}`;
                    const res = await axios.get(
                        `http://api.alquran.cloud/v1/ayah/${reference}/editions/ar.alafasy,${edition}`
                    );
                    const data = res.data.data;
                    searchResults.push({
                        reference: reference,
                        arabicText: data[0].text,
                        translatedText: data[1].text,
                        surahName: data[0].surah.name,
                        surahEnglishName: data[0].surah.englishName,
                        audioUrl: data[0].audio,
                    });
                }
                setAyahCount(matches.length); // Set ayah count to the number of matches
            }

            setResults(searchResults);
            if (searchResults.length === 0) {
                setError('No matches found. Try different keywords.');
            }
        } catch (err) {
            setError('Failed to fetch results. Please try again.');
            console.error('Error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={searchQuran} style={styles.searchForm}>
            <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Enter keyword or ayah reference (e.g., patience, 2:255)"
                style={styles.input}
            />
            <select value={edition} onChange={(e) => setEdition(e.target.value)} style={styles.select}>
                <option value="en.asad">English - Asad</option>
                <option value="ur.jalandhry">Urdu - Jalandhry</option>
                <option value="en.pickthall">English - Pickthall</option>
                {/* Add more editions as needed */}
            </select>
            <button type="submit" style={styles.button} disabled={loading}>
                {loading ? 'Searching...' : 'Search'}
            </button>
        </form>
    );
};

export default SearchForm;