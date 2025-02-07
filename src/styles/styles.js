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
        flexWrap: 'wrap',
        gap: '10px',
        marginBottom: '30px',
    },
    input: {
        flex: '1 1 60%',
        padding: '12px',
        fontSize: '16px',
        border: '2px solid #ddd',
        borderRadius: '6px',
        outline: 'none',
        minWidth: '200px',
    },
    select: {
        flex: '1 1 30%',
        padding: '12px',
        fontSize: '16px',
        border: '2px solid #ddd',
        borderRadius: '6px',
        outline: 'none',
        minWidth: '150px',
    },
    button: {
        flex: '1 1 100%',
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
        flexWrap: 'wrap',
    },
    reference: {
        fontSize: '14px',
        fontWeight: 'bold',
        flex: '1 1 100%',
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
    '@media (max-width: 768px)': {
        input: {
            flex: '1 1 100%',
        },
        select: {
            flex: '1 1 100%',
        },
        button: {
            flex: '1 1 100%',
        },
        verseInfo: {
            flexDirection: 'column',
        },
        reference: {
            textAlign: 'center',
        },
        ayahInfoText: {
            textAlign: 'center',
        },
    },
    '@media (max-width: 480px)': {
        arabicText: {
            fontSize: '20px',
        },
        translation: {
            fontSize: '14px',
        },
    },
};

export default styles;