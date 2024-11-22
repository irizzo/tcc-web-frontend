import pomodoro from './pomodoro'
import introduction from './introduction'
import strategicPersonalPlanning from './strategicPersonalPlanning'
import timeManagement from './timeManagement'
import tutorial from './tutorial'

const contentsList = [
	// {
	// 	title: 'TCC Isabelle Rizzo',
	// 	innerContent: () => { return (<p>Acesse o trabalho pelo link: <a className='link'>https://docs.google.com/document/d/19tdLrRvUE02Tgw6qvq1FocMKfAE8kD0eXzUoxOlw6-0/edit?usp=sharing</a></p>) }
	// },
	{...tutorial},
	{...introduction},
	{...strategicPersonalPlanning},
	{...timeManagement},
	{...pomodoro}
]

contentsList.forEach((content, index) => {
	contentsList[index] = {code: index, ...content}
})

export default contentsList