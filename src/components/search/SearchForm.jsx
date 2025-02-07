import React, { useState } from 'react';
import axios from 'axios';
import styles from '../../styles/styles';

const SearchForm = ({ setResults, setLoading, setError, edition, setEdition, loading }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const searchQuran = async (e) => {
        e.preventDefault();
        if (!searchTerm) return;

        setLoading(true);
        setError('');
        setResults([]);

        try {
            let searchResults = [];
            const isReference = /^\d+(:\d+)?$/.test(searchTerm);

            if (isReference) {
                const response = await axios.get(
                    `http://api.alquran.cloud/v1/ayah/${searchTerm}/editions/ar.alafasy,${edition}`
                );
                const data = response.data.data;
                searchResults.push({
                    reference: searchTerm,
                    arabicText: data[0].text,
                    translatedText: data[1].text,
                    surahName: data[0].surah.name,
                    surahEnglishName: data[0].surah.englishName,
                    audioUrl: data[0].audio,
                });
            } else {
                const response = await axios.get(`https://api.alquran.cloud/v1/search/${searchTerm}/all/en`);
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
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
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