
import { GeneralInfo } from '@/components/Messages'
import Link from 'next/link'

import routesMap from '@/resources/routesMap'
import { contentsList } from '@/resources/mockData'
import * as locale from '@/resources/locale'

import './contentsPage.scss'

function FeedListItem({ key, contentInfo}) {
	const contentPath = `${routesMap.contents.base}/${contentInfo.id}`
	const abstract = contentInfo.content.slice(0, 100) + '...'

	return (
		<Link key={key} className='flex flex--row feed__list-item' href={{ pathname: contentPath, query: contentInfo }}>
			<h2>{contentInfo.title}</h2>
			<p>{abstract}</p>
		</Link>
	)
}

export default function ContentsFeed() {
	return (
		<>
			<h1 className='contents__page-title'>{locale.pagesTitles.contents}</h1>
			<div className='contents__feed'>
				{
					contentsList.length > 0 ?
						contentsList.map((content) => {
							return <FeedListItem key={content.id} contentInfo={content} />
						})
						:
						<GeneralInfo content={locale.notFoundDefaults.contents} />
				}
			</div>
		</>
	)
}