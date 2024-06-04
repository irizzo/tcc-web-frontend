import * as locale from '@/resources/locale';

import './contentsPage.scss';

import { GeneralMessage } from '@/components/Messages';
import { FeedCard } from '@/components/Card';

import { contentsList } from '@/resources/mockData';
// const contentsList = [];

export default function ContentsFeed() {
	return (
		<main className='flex contents__main'>
			<h1 className='contents__page-title'>{locale.pageTitles.contents}</h1>
			<div className='contents__feed'>
				{
					contentsList.length > 0 ?
						contentsList.map((content) => {
							return <FeedCard key={content.id} contentInfo={content} />;
						})
						:
						<GeneralMessage content={'No available content.'} />
				}
			</div>
		</main>
	);
}