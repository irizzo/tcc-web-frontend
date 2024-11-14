import SideBar from '@/components/SideBar'
import { DefaultPageContainer } from '@/components/PageContainer'

export default function Ad() {
	return (
		<DefaultPageContainer>
			<SideBar />
			<main className='flex'>
				<div className='flex' style={{ height: '100px', width: '100px', backgroundColor: 'red'}}>
					a
				</div>
				<div className='flex' style={{ height: '100px', width: '100px', backgroundColor: 'blue' }}>
					b
				</div>
			</main>
		</DefaultPageContainer>
	)
}