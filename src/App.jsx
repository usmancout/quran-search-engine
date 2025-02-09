import React, { useState } from 'react';
import Container from './components/layout/Container';
import SearchForm from './components/search/SearchForm';
import Results from './components/search/Results';
import styles from './styles/styles';

function App() {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [edition, setEdition] = useState('en.asad');
    const [ayahCount, setAyahCount] = useState(0); // State to hold the count of ayahs found

    const playAudio = (audioUrl) => {
        const audio = new Audio(audioUrl);
        audio.play();
    };

    return (
        <Container>
            <h1 style={styles.title}>Quran Search </h1>

            <SearchForm
                setResults={setResults}
                setLoading={setLoading}
                setError={setError}
                edition={edition}
                setEdition={setEdition}
                loading={loading}
                setAyahCount={setAyahCount} // Pass setAyahCount to SearchForm
            />

            {error && <p style={styles.error}>{error}</p>}

            {loading && <p style={styles.loading}>Searching through verses...</p>}

            {ayahCount > 0 && <p style={styles.ayahCount}>{ayahCount} ayahs found</p>} {/* Display the ayah count */}

            <Results results={results} playAudio={playAudio} />
        </Container>
    );
}

export default App;