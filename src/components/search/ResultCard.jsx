import React from 'react';
import styles from '../../styles/styles';

const ResultCard = ({ result, playAudio }) => {
    return (
        <div style={styles.resultCard}>
            <div style={styles.verseInfo}>
                <span style={styles.reference}>
                    Surah {result.surahName} ({result.surahEnglishName})
                </span>
                <span style={styles.reference}>
                    Verse {result.reference}
                </span>
            </div>
            <p style={styles.arabicText}>{result.arabicText}</p>
            <p style={styles.translation}>{result.translatedText}</p>
            <button onClick={() => playAudio(result.audioUrl)} style={styles.audioButton}>
                ▶ Play Recitation
            </button>
        </div>
    );
};

export default ResultCard;