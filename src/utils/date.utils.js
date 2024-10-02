export function needsRevalidation(updatedAt) {
	console.log('[needsRevalidation]')

	const now = new Date()

	const maxDiff = 3600000
	const dateInTime = updatedAt.getTime()
	const nowInTime = now.getTime()

	if ((nowInTime - dateInTime) > maxDiff) return true

	return false
}

export function convertStampToDate(timestamp) {
	return new Date(timestamp._seconds * 1000).toLocaleString()
}