'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FaArrowLeft } from 'react-icons/fa6'

import { routesMap } from '@/resources/routesMap'
import contentsList from '@/resources/contents'
import * as locale from '@/resources/locale'

import './contentsPage.scss'

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
		<div className='flex feed__container'>
			<div className='flex flex--row content__title'>
				<FaArrowLeft className='icon' onClick={() => { router.back() }} />
				<h1 className='contents__page-title'>{locale.pagesTitles.contents.base}</h1>
			</div>
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
		</div>
	)
}