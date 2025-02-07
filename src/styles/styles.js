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
    select: {
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

export default styles;