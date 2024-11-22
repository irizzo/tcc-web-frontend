'use client'

import { useState } from 'react'
import { FaCircleInfo, FaEye, FaEyeSlash } from 'react-icons/fa6'
import './globalForm.scss'

export function FormContainer({ children, title, submitCallback, variantClasses = 'form__container--full' }) {
	return (
		<div className={`form__container ${variantClasses}`}>
			<h1 className='form__title'>{title}</h1>
			<form lang='pt-br' action={(e) => { submitCallback(e) }} className='form__content' autoComplete='off'>
				{children}
			</form>
		</div>
	)
}

export function FormSection({ children, sectionTitle, labelFor }) {
	return (
		<section className='form__section'>
			<label htmlFor={labelFor}>{sectionTitle}</label>
			{children}
		</section>
	)
}

export function FormInfo({ children }) {
	return (
		<div className='form__info'>
			<p>
				<i><FaCircleInfo /></i>
				{children}
			</p>
		</div>
	)
}

export function PasswordInput({ inputName, inputValue, onChangeFn }) {
	const [ showPass, setShowPass ] = useState(false)

	function EyeIcon() {
		return (
			<div style={{ height: '15px', width: '15px', color: 'white', cursor: 'pointer' }} onClick={() => setShowPass(!showPass)}>
				{showPass ?
					<FaEyeSlash style={{ height: '15px', width: '15px', color: 'white' }} />
					:
					<FaEye style={{ height: '15px', width: '15px', color: 'white' }} />
				}

			</div>
		)
	}

	return (
		<div className='flex flex--row password__container'>
			<input
				className='password__input'
				type={showPass ? 'text' : 'password'}
				placeholder='Senha'
				name={inputName}
				value={inputValue}
				onChange={onChangeFn}
				required
			/>
			<EyeIcon />
		</div>
	)
}