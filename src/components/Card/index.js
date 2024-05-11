import '@/styles/global.css';

export default function Card({ content }) {

	return(
		<div>
			<h2>Header</h2>
			<div className='content'>
				<p>{content}</p>
			</div>
		</div>
	)
}