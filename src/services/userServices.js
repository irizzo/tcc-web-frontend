/* User Services
	* sign up
	* login
	* logout
	* list user info
	* delete user
	* alter user info
	* verifyUser 
*/


const baseUserPath = '/user'

/** Sign Up
 * 
 * @param {{email: String, password: String}} userSignUpData
 * @returns 
 */
async function signUp(userSignUpData) {
	// no auth
}

async function login(userLoginData) {
	// no auth
}

async function logout() {

}

async function listUserInfo() {

}

async function updateUserInfo() {

}

async function deleteUser() {

}


module.exports = {
	signUp,
	login,
	logout,
	listUserInfo,
	updateUserInfo,
	deleteUser
};