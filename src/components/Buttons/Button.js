import '@/styles/global.scss';
import './globalButton.scss';

export default function DefaultButton({ title, variant, small=false, buttonType="button" }) {
	const buttonVariant = variant === "outlined" ? "outlined" : "filled";
	let variantClasses = `button--${buttonVariant}`
	small ? variantClasses += ' button--small' : null;

	return (
		<button className={`button ${variantClasses}`} type={buttonType}>{title}</button>
	);
}
