import './loading.scss';

import { FaArrowsRotate } from 'react-icons/fa6';
import * as locale from '@/resources/locale';


export default function Loading() {
	return (
		<div className='flex flex--center loading__container'>
			<div className="spinner-box">
				<div className="circle-border">
					<div className="circle-core"></div>
				</div>
			</div>

			<h1 className='loading__title'>{locale.general.loading}</h1>
		</div>
	);
}