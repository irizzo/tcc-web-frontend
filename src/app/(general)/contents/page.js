import { contentsList } from '@/resources/mockData';
import * as locale from '@/resources/locale';

import './contentsPage.scss';

import { GeneralInfo } from '@/components/Messages';
import { FeedCard } from '@/components/Card';

// const contentsList = [];

export default function ContentsFeed() {
	return (
		<>
			<h1 className='contents__page-title'>{locale.pagesTitles.contents}</h1>
			<div className='contents__feed'>
				{
					contentsList.length > 0 ?
						contentsList.map((content) => {
							return <FeedCard key={content.id} contentInfo={content} />;
						})
						:
						<GeneralInfo content={locale.notFoundDefaults.contents} />
				}
			</div>
		</>
	);
}