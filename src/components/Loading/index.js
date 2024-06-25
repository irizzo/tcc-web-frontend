import './loading.scss';

import * as locale from '@/resources/locale';

export default function Loading() {
	return (
		<div className='flex flex--center loading__container'>
			<div className="spinner-box">
				<div className="circle-border">
					<div className="circle-core"></div>
				</div>
			</div>

			<h1 className='loading__title'>{locale.pageTitles.loading}</h1>
		</div>
	);
}