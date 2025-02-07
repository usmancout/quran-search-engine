import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const searchQuran = async (e) => {
        e.preventDefault();
        if (!searchTerm) return;

        setLoading(true);
        setError('');
        setResults([]);

        try {
            const response = await axios.get(`https://api.alquran.cloud/v1/search/${searchTerm}/all/en`);
            const searchResults = response.data.data.matches.map(match => ({
                reference: `${match.surah.number}:${match.numberInSurah}`,
                arabicText: match.text,
                englishText: match.text,
                surahName: match.surah.name,
                surahEnglishName: match.surah.englishName,
                audioUrl: `https://cdn.alquran.cloud/media/audio/ayah/ar.alafasy/${match.surah.number}/${match.numberInSurah}`
            }));

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

    const playAudio = (audioUrl) => {
        const audio = new Audio(audioUrl);
        audio.play();
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Quran Search Engine</h1>

            <form onSubmit={searchQuran} style={styles.searchForm}>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Enter keyword (e.g., patience, mercy)"
                    style={styles.input}
                />
                <button type="submit" style={styles.button} disabled={loading}>
                    {loading ? 'Searching...' : 'Search'}
                </button>
            </form>

            {error && <p style={styles.error}>{error}</p>}

            {loading && <p style={styles.loading}>Searching through verses...</p>}

            <div style={styles.results}>
                {results.map((result, index) => (
                    <div key={index} style={styles.resultCard}>
                        <div style={styles.verseInfo}>
                            <span style={styles.reference}>
                                Surah {result.surahName} ({result.surahEnglishName})
                            </span>
                            <span style={styles.reference}>
                                Verse {result.reference}
                            </span>
                        </div>
                        <p style={styles.arabicText}>{result.arabicText}</p>
                        <p style={styles.translation}>{result.englishText}</p>
                        <button
                            onClick={() => playAudio(result.audioUrl)}
                            style={styles.audioButton}
                        >
                            ▶ Play Recitation
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

const styles = {
    container: {
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
    },
    title: {
        textAlign: 'center',
        color: '#2c3e50',
        marginBottom: '30px',
    },
    searchForm: {
        display: 'flex',
        gap: '10px',
        marginBottom: '30px',
    },
    input: {
        flex: 1,
        padding: '12px',
        fontSize: '16px',
        border: '2px solid #ddd',
        borderRadius: '6px',
        outline: 'none',
    },
    button: {
        padding: '12px 24px',
        backgroundColor: '#2c3e50',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '16px',
        transition: 'background-color 0.3s',
    },
    results: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
    },
    resultCard: {
        padding: '20px',
        borderRadius: '8px',
        backgroundColor: 'white',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
    verseInfo: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '10px',
        color: '#666',
    },
    reference: {
        fontSize: '14px',
        fontWeight: 'bold',
    },
    arabicText: {
        fontSize: '24px',
        textAlign: 'right',
        marginBottom: '10px',
        fontFamily: '"Traditional Arabic", serif',
        lineHeight: 1.6,
    },
    translation: {
        fontSize: '16px',
        color: '#444',
        lineHeight: 1.6,
        marginBottom: '15px',
    },
    error: {
        color: 'red',
        textAlign: 'center',
        marginBottom: '20px',
    },
    loading: {
        textAlign: 'center',
        color: '#666',
    },
    audioButton: {
        padding: '8px 16px',
        backgroundColor: '#27ae60',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '14px',
        transition: 'background-color 0.3s',
    }
};

export default App;