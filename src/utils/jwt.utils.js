const jwt = require('jsonwebtoken')

const privateKey = process.env.JWT_SECRET

// TODO: implement custom error handling on the callback functions

/** Generate Token From User Id
 * @description Creates a JWT with the userId as data
 * @param {String} userId
 * @returns
 */
exports.generateTokenFromData = (tokenData) => {
	try {
		return jwt.sign({ data: { ...tokenData } }, privateKey, { expiresIn: 60 * 60 })
	} catch (error) {
		throw error
	}
}

/** Validate Token
 * @description Validates a JWT
 * @param {String} token
 * @returns decodedToken
 */
exports.validateToken = (token) => {
	try {
		const decodedToken = jwt.verify(token, privateKey)
		if (!decodedToken.data) {
			return false
		}
		return decodedToken

	} catch (error) {
		throw error
	}
}

/** Decode Token
 * @description Decode a JWT
 * @param {String} token
 * @returns decodedToken
 */
exports.decodeToken = (token) => {
	try {
		const decoded = jwt.decode(token)
		return decoded

	} catch (error) {
		throw error
	}
}

/** Get Data From Token
 * @description Get a certain data from a JWT
 * @param {Headers} token
 * @param {String} dataName
 * @returns {String} Required Data
 */
exports.extractDataFromToken = (token, dataName) => {
	const decodedToken = this.decodeToken(token)
	const requiredData = decodedToken.data[dataName]
	return requiredData ? requiredData : false
}