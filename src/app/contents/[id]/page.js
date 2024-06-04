import './content.scss';

export default function ContentsFeed({ params, searchParams }) {
	return (
		<main className="flex flex--center content__container">
			<h1>{searchParams.title}</h1>
			<p>{searchParams.content}</p>
		</main>
	)
}