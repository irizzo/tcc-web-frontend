import './loading.scss';

import * as locale from '@/resources/locale';

export default function PartialLoading() {
	return (
		<div className='flex flex--center partial-loading'>
			<div className="spinner-box">
				<div className="circle-border">
					<div className="circle-core"></div>
				</div>
			</div>

			<h1 className='loading__title'>{locale.pagesTitles.loading}</h1>
		</div>
	);
}