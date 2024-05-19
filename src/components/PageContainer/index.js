import '@/styles/global.scss';
import './pageContainer.scss';

export function DashboardPageContainer({ children }) {
	return(
		<div className="flex flex--row container container--dashboard ">
			{children}
		</div>
	);
}

export function DefaultPageContainer({ children }) {
	return (
		<div className="flex container container--default">
			{children}
		</div>
	);
}