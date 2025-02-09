const styles = {
    modalOverlay: {
        position: 'fixed',
        top: 0,
        right: 0,
        width: 'auto',
        height: 'auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        padding: '20px',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        textAlign: 'center',
        boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
        width: '300px',
        position: 'relative',
    },
    closeIcon: {
        position: 'absolute',
        top: '10px',
        right: '10px',
        fontSize: '20px',
        cursor: 'pointer',
        color: '#333',
        zIndex: 1001, // Ensure it's above the audio player
    },
    audioContainer: {
        marginTop: '20px', // Add space between close icon and audio player
    },
    audioPlayer: {
        width: '100%', // Make audio player responsive
    },

    container: {
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        width: '90%',
    },
    title: {
        textAlign: 'center',
        color: '#2c3e50',
        marginBottom: '30px',
        fontSize: '2em',
    },
    searchForm: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '10px',
        marginBottom: '30px',
        flexWrap: 'wrap',
    },
    input: {
        flex: '1 1 auto',
        padding: '12px',
        fontSize: '16px',
        border: '2px solid #ddd',
        borderRadius: '6px',
        outline: 'none',
        minWidth: '200px',
    },
    select: {
        flex: '1 1 auto',
        padding: '12px',
        fontSize: '16px',
        border: '2px solid #ddd',
        borderRadius: '6px',
        outline: 'none',
        minWidth: '120px',
    },
    button: {
        flex: '1 1 auto',
        padding: '12px 24px',
        backgroundColor: '#2c3e50',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '16px',
        transition: 'background-color 0.3s',
        whiteSpace: 'nowrap',
    },
    results: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        overflowY: 'auto',
        maxHeight: '70vh',
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
        flexWrap: 'wrap',
    },
    surahName: {
        fontSize: '14px',
        fontWeight: 'bold',
        textAlign: 'left', // Align Surah name to the left
    },
    verseNumber: {
        fontSize: '14px',
        fontWeight: 'bold',
        textAlign: 'right', // Align verse number to the right
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
    },
    ayahInfo: {
        display: 'flex',
        justifyContent: 'space-between',
        margin: '20px 0',
        padding: '10px',
        backgroundColor: '#f9f9f9',
        borderRadius: '6px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        fontSize: '18px',
        color: '#2c3e50',
        flexWrap: 'wrap',
    },
    ayahInfoText: {
        flex: '1 1 100%',
        textAlign: 'center',
    },
    '@media (max-width: 992px)': {
        container: {
            maxWidth: '100%',
            padding: '15px',
        },
        searchForm: {
            flexWrap: 'wrap',
            justifyContent: 'center',
        },
        input: {
            flex: '1 1 100%',
            minWidth: '100%',
            marginBottom: '10px',
        },
        select: {
            flex: '1 1 100%',
            minWidth: '100%',
            marginBottom: '10px',
        },
        button: {
            flex: '1 1 100%',
            minWidth: '100%',
            marginBottom: '10px',
        },
        verseInfo: {
            flexDirection: 'column',
        },
        surahName: {
            textAlign: 'center',
        },
        verseNumber: {
            textAlign: 'center',
        },
        ayahInfoText: {
            textAlign: 'center',
        },
    },
    '@media (max-width: 768px)': {
        title: {
            fontSize: '1.5em',
            marginBottom: '20px',
        },
        input: {
            padding: '10px',
            fontSize: '14px',
        },
        select: {
            padding: '10px',
            fontSize: '14px',
        },
        button: {
            padding: '10px 20px',
            fontSize: '14px',
        },
        arabicText: {
            fontSize: '20px',
        },
        translation: {
            fontSize: '14px',
        },
        modalContent: {
            padding: '15px',
            minWidth: '250px',
        },
        closeIcon: {
            top: '8px',
            right: '10px',
            fontSize: '20px',
        },
        audioButton: {
            padding: '6px 12px',
            fontSize: '12px',
        },
        ayahInfo: {
            padding: '8px',
            fontSize: '16px',
        },
    },
    '@media (max-width: 480px)': {
        title: {
            fontSize: '1.25em',
            marginBottom: '15px',
        },
        input: {
            padding: '8px',
            fontSize: '12px',
        },
        select: {
            padding: '8px',
            fontSize: '12px',
        },
        button: {
            padding: '8px 16px',
            fontSize: '12px',
        },
        arabicText: {
            fontSize: '18px',
        },
        translation: {
            fontSize: '12px',
        },
        modalContent: {
            padding: '10px',
            minWidth: '200px',
        },
        closeIcon: {
            top: '6px',
            right: '8px',
            fontSize: '18px',
        },
        audioButton: {
            padding: '4px 8px',
            fontSize: '10px',
        },
        ayahInfo: {
            padding: '6px',
            fontSize: '14px',
        },
    },
};

export default styles;