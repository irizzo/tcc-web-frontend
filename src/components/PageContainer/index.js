import '@/styles/global.css';
import './pageContainer.css';

export default function PageContainer({ children }) {
	return(
		<main className="flex container">
			{children}
		</main>
	);
}