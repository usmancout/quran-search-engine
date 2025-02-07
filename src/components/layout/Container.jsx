import React from 'react';
import styles from '../../styles/styles';

const Container = ({ children }) => {
    return <div style={styles.container}>{children}</div>;
};

export default Container;