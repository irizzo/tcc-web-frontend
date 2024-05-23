'use client';

import './globalForm.scss';
import { FaCircleInfo } from 'react-icons/fa6';

export function FormContainer({ children, title, submitCallback, variantClasses ='form_container--full' }) {
	return (
		<div className={`form__container ${variantClasses}`} autoComplete='off' onSubmit={submitCallback}>
			<h1 className='form__title'>{title}</h1>
			<form className='form__content'>
				{children}
			</form>
		</div>
	);
}

export function FormSection({ children, sectionTitle, labelFor }) {
	return (
		<section className='form__section'>
			<label htmlFor={labelFor}>{sectionTitle}</label>
			{children}
		</section>
	);
}

export function FormInfo({ children }) {
	return (
		<div className='form__info'>
			<p>
				<i><FaCircleInfo /></i>
				{children}
			</p>
		</div>
	);
}