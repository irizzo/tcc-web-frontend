import Link from 'next/link'
import { PublicPageTitle } from '@/components/Menu'
import './contentsPage.scss'

import { routesMap } from '@/resources/routesMap'
import contentsList from '@/resources/contents'
import { pagesTitles } from '@/resources/locale'

function FeedListItem({ contentInfo }) {
	const contentPath = `${routesMap.contents.base}/${contentInfo.code}`
	const abstract = contentInfo.abstract ? contentInfo.abstract.slice(0, 80) + '...' : ''

	return (
		<Link className='flex flex--row feed__list-item' href={{ pathname: contentPath, query: contentInfo }}>
			<h2>{contentInfo.title}</h2>
			<p>{abstract}</p>
		</Link>
	)
}

export default function ContentsFeed() {
	const router = useRouter()

	return (
		<>
			<PublicPageTitle pageTitle={pagesTitles.contents.base} />
			<div className='contents__feed'>
				{
					contentsList.map((content) => {
						return (
							<FeedListItem
								key={content.code}
								contentInfo={{ code: content.code, title: content.title, abstract: content.abstract }}
							/>
						)
					})
				}
			</div>
		</>
	)
}