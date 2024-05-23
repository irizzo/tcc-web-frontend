import './loading.scss';

import { FaArrowsRotate } from 'react-icons/fa6';
import * as locale from '@/resources/locale';


export default function Loading() {
	return (
		<div className='flex flex--center loading__container'>
			<div class="spinner-box">
				<div class="circle-border">
					<div class="circle-core"></div>
				</div>
			</div>

			<h1 className='loading__title'>{locale.general.loading}</h1>
		</div>
	);
}