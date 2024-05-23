import './globalButton.scss';

import Link from 'next/link';

export function DefaultButton({ title, variant, small = false, buttonType = 'button' }) {
	const buttonVariant = variant === 'outlined' ? 'outlined' : 'filled';
	let variantClasses = `button--${buttonVariant}`;
	small ? variantClasses += ' button--small' : null;

	return (
		<button className={`button ${variantClasses}`} type={buttonType}>{title}</button>
	);
}

export function LinkButton({ path, title, variant, small = false }) {
	const buttonVariant = variant === 'outlined' ? 'outlined' : 'filled';
	let variantClasses = `button--${buttonVariant}`;
	small ? variantClasses += ' button--small' : null;

	return (
		<Link href={path} className={`button button--link ${variantClasses}`} >{title}</Link>
	);
}
