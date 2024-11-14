import * as pomodoro from './pomodoro/pomodoro'

const contentsList = [
	{
		title: pomodoro.title,
		innerContent: pomodoro.innerContent
	},
	{
		title: 'Introdução à gestão do tempo',
		innerContent: () => { return (<p>gerir o tempo</p>)}
	}
]

export default contentsList