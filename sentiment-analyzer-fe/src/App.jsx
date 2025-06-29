import { useState } from 'react'
import axios from 'axios'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
	const [feedback, setFeedback] = useState("");

	const handelFeedbackSubmit = async (e) => {
		e.preventDefault();
		const response = await axios.post('http://localhost:8080/api/feedback',
			feedback,
			{
				headers: { 'Content-Type': 'text/plain' }
			}
		);
		setFeedback("");
	};

	return (
		<>
			<div className='container mx-auto p-4'>
				<h1 className="text-2xl font-bold mb-4">Sentiment Feedback Analyzer</h1>
				<form onSubmit={handelFeedbackSubmit} className='mb-4'>
					<textarea
						value={feedback}
						onChange={(e) => setFeedback(e.target.value)}
						className='w-full p-2 border rounded mb-2'
						placeholder='Enter your feedback...'
						rows="4"
					></textarea>
					<button
						type='submit'
						className='bg-blue-500 text-white px-4 py-2 rounded'>
						Submit Feedback
					</button>
				</form>
				<h2 className='text-xl font-semibold mb-2'>Feedback History</h2>
				<table className='w-full border-collapse rounded-lg overflow-hidden'>
					<thead>
						<tr className='bg-orange-900 text-white'>
							<th className='px-4 py-2 text-left'>Feedback</th>
							<th className='px-4 py-2 text-left'>Score</th>
							<th className='px-4 py-2 text-left'>Sentiment</th>
						</tr>
					</thead>
					<tbody>
						<tr className="border-b">
							<td className='px-4 py-2 text-left'>Great service!</td>
							<td className='px-4 py-2 text-left'>+1</td>
							<td className='px-4 py-2 text-left'>Positive</td>
						</tr>
						<tr className="border-b">
							<td className='px-4 py-2 text-left'>Could be better.</td>
							<td className='px-4 py-2 text-left'>0</td>
							<td className='px-4 py-2 text-left'>Neutral</td>
						</tr>
						<tr className="border-b">
							<td className='px-4 py-2 text-left'>Not satisfied with the product.</td>
							<td className='px-4 py-2 text-left'>-1</td>
							<td className='px-4 py-2 text-left'>Negative</td>
						</tr>
					</tbody>
				</table>
			</div>
		</>
	)
}

export default App
