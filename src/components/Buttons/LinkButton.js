import '@/styles/global.scss';
import './linkButton.scss'
import Link from 'next/link';

export default function LinkButton({ path, title, variant, small=false }) {
	const buttonVariant = variant === "outlined" ? "outlined" : "filled";
	let variantClasses = `button--${buttonVariant}`
	small ? variantClasses += ' button--small' : null;

	return (
		<Link href={path} className={`button button--link ${variantClasses}`} >{title}</Link>
	)
}