import contentsList from '@/resources/contents'
import { PublicPageTitle } from '@/components/Menu'

import './content.scss'

export default function ContentPage({ params, searchParams }) {
	return (
		<>
			<PublicPageTitle pageTitle={searchParams.title} />
			<section className='flex content__inner-content'>
				{contentsList[searchParams.code].innerContent()}
			</section>
		</>
	)
}