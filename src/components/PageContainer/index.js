import '@/styles/global.scss';
import './pageContainer.scss';

export default function PageContainer({ children }) {
	return(
		<div className="flex flex--row container">
			{children}
		</div>
	);
}