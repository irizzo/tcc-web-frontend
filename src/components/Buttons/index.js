import './globalButton.scss';

import Link from 'next/link';

export function DefaultButton({ title, variant, small = false, buttonType = 'button', onClickFunction = null, isDisabled=false, customStyles=null }) {
	const buttonVariant = variant === 'outlined' ? 'outlined' : 'filled';
	let variantClasses = `button--${buttonVariant}`;
	small ? variantClasses += ' button--small' : null;
	customStyles ? variantClasses += ` ${customStyles}` : null;

	return (
		<button
			className={`button ${variantClasses}`}
			type={buttonType}
			onClick={onClickFunction}
			disabled={isDisabled}
		>{title}</button>
	);
}

export function LinkButton({ path, title, variant, isDisabled=false, small = false }) {
	const buttonVariant = variant === 'outlined' ? 'outlined' : 'filled';
	let variantClasses = `button--${buttonVariant}`;
	small ? variantClasses += ' button--small' : null;

	return (
		<Link href={path} disabled={isDisabled} className={`button button--link ${variantClasses}`} >{title}</Link>
	);
}
