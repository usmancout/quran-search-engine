import React, { useState, useRef } from 'react';
import styles from '../../styles/styles';

const ResultCard = ({ result }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const audioRef = useRef(null);

    const playAudio = () => {
        setIsModalOpen(true);
        if (audioRef.current) {
            audioRef.current.play();
        }
    };

    const closeAudioModal = () => {
        setIsModalOpen(false);
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
    };

    return (
        <div style={styles.resultCard}>
            <div style={styles.verseInfo}>
                <span style={styles.surahName}>
                    Surah {result.surahName} ({result.surahEnglishName})
                </span>
                <span style={styles.verseNumber}>
                    Verse {result.reference}
                </span>
            </div>
            <p style={styles.arabicText}>{result.arabicText}</p>
            <p style={styles.translation}>{result.translatedText}</p>
            <button onClick={playAudio} style={styles.audioButton}>
                ▶ Play Recitation
            </button>

            {/* Modal for Audio Player */}
            {isModalOpen && (
                <div style={styles.modalOverlay}>
                    <div style={styles.modalContent}>
                        <span style={styles.closeIcon} onClick={closeAudioModal}>✖</span>
                        <div style={styles.audioContainer}>
                            <audio
                                ref={audioRef}
                                controls
                                onEnded={closeAudioModal}
                                autoPlay
                                style={styles.audioPlayer}
                            >
                                <source src={result.audioUrl} type="audio/mpeg" />
                                Your browser does not support the audio element.
                            </audio>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ResultCard;