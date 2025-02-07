import React from 'react';
import ResultCard from './ResultCard';
import styles from '../../styles/styles';

const Results = ({ results, playAudio }) => {
    return (
        <div style={styles.results}>
            {results.map((result, index) => (
                <ResultCard key={index} result={result} playAudio={playAudio} />
            ))}
        </div>
    );
};

export default Results;