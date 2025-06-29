import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
    const [feedback, setFeedback] = useState("");
    const [feedbackList, setfeedbackList] = useState([]);
    const [error, setError] = useState(false);
    const [newlyAddedId, setNewlyAddedId] = useState(null);
    const [loading, setLoading] = useState(false);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    // Sorting state
    const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'desc' });

    useEffect(() => {
        axios.get('http://localhost:8080/api/feedback')
            .then(response => setfeedbackList(response.data))
            .catch(error => console.error("There was an error fetching the feedback!", error));
    }, [])

    const handelFeedbackSubmit = async (e) => {
        e.preventDefault();
        if (!feedback.trim()) {
            setError(true);
            return;
        }
        setError(false);
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:8080/api/feedback',
                feedback,
                {
                    headers: { 'Content-Type': 'text/plain' }
                }
            );
            setfeedbackList([...feedbackList, response.data]);
            setNewlyAddedId(response.data.id);
            setFeedback("");
            setTimeout(() => setNewlyAddedId(null), 1000);
            // Go to first page after new entry added
            setCurrentPage(1);
        } catch (err) {
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    const getSentimentColor = (sentiment) => {
        switch (sentiment) {
            case 'POSITIVE':
                return 'bg-green-800 font-bold';
            case 'NEGATIVE':
                return 'bg-red-800 font-bold';
            default:
                return 'bg-yellow-800 font-bold';
        }
    }

    // Sorting logic
    const sortedFeedbackList = [...feedbackList].sort((a, b) => {
        let key = sortConfig.key;
        let dir = sortConfig.direction === 'asc' ? 1 : -1;
        if (key === 'sentimentScore') {
            return (a[key] - b[key]) * dir;
        }
        if (key === 'sentiment') {
            return a[key].localeCompare(b[key]) * dir;
        }
        // Default: id or content
        if (typeof a[key] === 'string') {
            return a[key].localeCompare(b[key]) * dir;
        }
        return (a[key] - b[key]) * dir;
    });

    const totalPages = Math.ceil(sortedFeedbackList.length / itemsPerPage);
    const paginatedFeedback = sortedFeedbackList.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleSort = (key) => {
        setSortConfig((prev) => ({
            key,
            direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
        }));
    };

    return (
        <>
            <title>Sentiment Feedback Analyzer</title>
            {/* Loading Prompt */}
            {loading && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
                    <div className="bg-white px-6 py-4 rounded shadow-lg flex items-center gap-3">
                        <svg className="animate-spin h-6 w-6 text-blue-600" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
                        </svg>
                        <span className="text-blue-700 font-semibold">Feedback is submitting...</span>
                    </div>
                </div>
            )}
            <div className='container mx-auto p-10 border rounded-lg'>
                {feedbackList.length === 0 ? (
                    <div className="max-w-2xl mx-auto">
                        {error && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 flex items-center justify-between">
                                <span>Provide Valid Feedback</span>
                                <button
                                    className="text-red-700 font-bold ml-4"
                                    onClick={() => setError(false)}
                                    aria-label="Close">
                                    &times;
                                </button>
                            </div>
                        )}
                        <h1 className="text-2xl font-bold mb-4 text-center">Sentiment Feedback Analyzer</h1>
                        <form onSubmit={handelFeedbackSubmit} className='mb-4'>
                            <textarea
                                value={feedback}
                                onChange={(e) => setFeedback(e.target.value)}
                                className='w-full p-2 border rounded mb-2'
                                placeholder='Enter your feedback...'
                                rows="4"
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        handelFeedbackSubmit(e);
                                    }
                                }}
                                disabled={loading}
                            ></textarea>
                            <button
                                type='submit'
                                className='bg-blue-500 text-white px-4 py-2 rounded w-full'
                                disabled={loading}
                            >
                                Submit Feedback
                            </button>
                        </form>
                    </div>
                ) : (
                    <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto">
                        <div className="md:w-1/2 w-full">
                            {error && (
                                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 flex items-center justify-between">
                                    <span>Provide Valid Feedback</span>
                                    <button
                                        className="text-red-700 font-bold ml-4"
                                        onClick={() => setError(false)}
                                        aria-label="Close">
                                        &times;
                                    </button>
                                </div>
                            )}
                            <h1 className="text-2xl font-bold mb-4">Sentiment Feedback Analyzer</h1>
                            <form onSubmit={handelFeedbackSubmit} className='mb-4'>
                                <textarea
                                    value={feedback}
                                    onChange={(e) => setFeedback(e.target.value)}
                                    className='w-full p-2 border rounded mb-2'
                                    placeholder='Enter your feedback...'
                                    rows="4"
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                            e.preventDefault();
                                            handelFeedbackSubmit(e);
                                        }
                                    }}
                                    disabled={loading}
                                ></textarea>
                                <button
                                    type='submit'
                                    className='bg-blue-500 text-white px-4 py-2 rounded'
                                    disabled={loading}
                                >
                                    Submit Feedback
                                </button>
                            </form>
                        </div>
                        <div className="md:w-1/2 w-full">
                            {feedbackList.length > 0 && (
                                <>
                                    <div className="flex items-center justify-between mb-2">
                                        <h2 className='text-xl font-semibold'>Feedback History</h2>
                                        <button
                                            className="text-xs px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded border border-gray-300 text-black"
                                            onClick={() => setSortConfig({ key: 'id', direction: 'desc' })}
                                        >
                                            Reset Sort
                                        </button>
                                    </div>
                                    <div className="w-full">
                                        <table className='w-full border-collapse rounded-lg overflow-hidden'>
                                            <thead>
                                                <tr className='bg-orange-900 text-white'>
                                                    <th className='px-4 py-2 text-left whitespace-nowrap'>
                                                        <div className="flex items-center justify-between">
                                                            <span>Feedback</span>
                                                            <span className="flex flex-col ml-2">
                                                                <button
                                                                    className="text-xs p-0.5 bg-white/10 rounded hover:bg-white/20 mb-0.5"
                                                                    style={{ lineHeight: 1 }}
                                                                    onClick={() => handleSort('content')}
                                                                    aria-label="Sort Feedback Asc"
                                                                    tabIndex={-1}
                                                                >
                                                                    <span className="inline-block align-middle">&#9650;</span>
                                                                </button>
                                                                <button
                                                                    className="text-xs p-0.5 bg-white/10 rounded hover:bg-white/20"
                                                                    style={{ lineHeight: 1 }}
                                                                    onClick={() => handleSort('content')}
                                                                    aria-label="Sort Feedback Desc"
                                                                    tabIndex={-1}
                                                                >
                                                                    <span className="inline-block align-middle">&#9660;</span>
                                                                </button>
                                                            </span>
                                                        </div>
                                                    </th>
                                                    <th className='px-4 py-2 text-left whitespace-nowrap'>
                                                        <div className="flex items-center justify-between">
                                                            <span>Score</span>
                                                            <span className="flex flex-col ml-2">
                                                                <button
                                                                    className="text-xs p-0.5 bg-white/10 rounded hover:bg-white/20 mb-0.5"
                                                                    style={{ lineHeight: 1 }}
                                                                    onClick={() => handleSort('sentimentScore')}
                                                                    aria-label="Sort Score Asc"
                                                                    tabIndex={-1}
                                                                >
                                                                    <span className="inline-block align-middle">&#9650;</span>
                                                                </button>
                                                                <button
                                                                    className="text-xs p-0.5 bg-white/10 rounded hover:bg-white/20"
                                                                    style={{ lineHeight: 1 }}
                                                                    onClick={() => handleSort('sentimentScore')}
                                                                    aria-label="Sort Score Desc"
                                                                    tabIndex={-1}
                                                                >
                                                                    <span className="inline-block align-middle">&#9660;</span>
                                                                </button>
                                                            </span>
                                                        </div>
                                                    </th>
                                                    <th className='px-4 py-2 text-left whitespace-nowrap'>
                                                        <div className="flex items-center justify-between">
                                                            <span>Sentiment</span>
                                                            <span className="flex flex-col ml-2">
                                                                <button
                                                                    className="text-xs p-0.5 bg-white/10 rounded hover:bg-white/20 mb-0.5"
                                                                    style={{ lineHeight: 1 }}
                                                                    onClick={() => handleSort('sentiment')}
                                                                    aria-label="Sort Sentiment Asc"
                                                                    tabIndex={-1}
                                                                >
                                                                    <span className="inline-block align-middle">&#9650;</span>
                                                                </button>
                                                                <button
                                                                    className="text-xs p-0.5 bg-white/10 rounded hover:bg-white/20"
                                                                    style={{ lineHeight: 1 }}
                                                                    onClick={() => handleSort('sentiment')}
                                                                    aria-label="Sort Sentiment Desc"
                                                                    tabIndex={-1}
                                                                >
                                                                    <span className="inline-block align-middle">&#9660;</span>
                                                                </button>
                                                            </span>
                                                        </div>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {paginatedFeedback.map((item) => (
                                                    <tr
                                                        key={item.id}
                                                        className={`border-b transition-all duration-700 ${
                                                            newlyAddedId === item.id
                                                                ? 'bg-green-200 animate-fade-in'
                                                                : ''
                                                        }`}
                                                    >
                                                        <td className='px-4 py-2 text-left'>{item.content}</td>
                                                        <td>{item.sentimentScore}</td>
                                                        <td className={`${getSentimentColor(item.sentiment)}`}>{item.sentiment}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    {/* Pagination Controls */}
                                    <div className="flex justify-center items-center gap-2 mt-4">
                                        <button
                                            className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 text-black"
                                            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                            disabled={currentPage === 1}
                                        >
                                            Prev
                                        </button>
                                        <span>Page {currentPage} of {totalPages}</span>
                                        <button
                                            className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 text-black"
                                            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                                            disabled={currentPage === totalPages}
                                        >
                                            Next
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
            <style>
                {`
                @keyframes fade-in {
                    0% { background-color: #bbf7d0; }
                    100% { background-color: transparent; }
                }
                .animate-fade-in {
                    animation: fade-in 1s ease;
                }
                `}
            </style>
        </>
    )
}

export default App
