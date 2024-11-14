// import { useEffect } from 'react'

import { FaArrowRight } from 'react-icons/fa6'


import { GeneralInfo } from '@/components/Messages'
import Link from 'next/link'
import { FeedCard } from '@/components/Card'

import routesMap from '@/resources/routesMap'
import { contentsList } from '@/resources/mockData'
import * as locale from '@/resources/locale'

import './contentsPage.scss'

// const contentsList = [];

function FeedListItem({ key, contentInfo}) {
	const contentPath = `${routesMap.contents.base}/${contentInfo.id}`
	const abstract = contentInfo.content.slice(0, 100) + '...'

	return (
		<Link key={key} className='flex flex--row feed__list-item' href={contentPath}>
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
							// return <FeedCard key={content.id} contentInfo={content} />
							return <FeedListItem key={content.id} contentInfo={content} />
						})
						:
						<GeneralInfo content={locale.notFoundDefaults.contents} />
				}
			</div>
		</>
	)
}