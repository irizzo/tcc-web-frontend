import { signUpService } from '@/services/userAccessServices';
import messagesDictionary from '@/resources/messages';

export default async function handleSignUp(e, data) {
	console.log('[handleSignUp]');

	e.preventDefault();

	console.log(`[handleSignUp] data = ${JSON.stringify(data)}`);
	// validations
	if(!data.firstName || !data.lastName || !data.email || !data.password || !data.confirmPassword) {
		alert(messagesDictionary.EMPTY_FIELD);
		return;
	}

	if(data.password !== data.confirmPassword) {
		alert(messagesDictionary.DIF_CONFIRM_PASS);
		return;
	}

	const fetchRes = await signUpService(data);

	alert(fetchRes.message);

	// TODO: redirect to dashboard
}