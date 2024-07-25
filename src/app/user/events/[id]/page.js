'use client';

import { updateEventService, deleteEventService } from '@/services/eventServices';
import { getAllCategoriesService } from '@/services/categoryServices';
import { navigateTo } from '@/utils';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import Loading from '@/components/Loading';
import { FormContainer, FormSection } from '@/components/Form';
import { DefaultButton, DangerButton } from '@/components/Buttons';
import * as locale from '@/resources/locale';
import { treatUpdatedEventData } from '@/utils/dataTreatments.utils';
import routesMap from '@/resources/routesMap';

export default function EventPage({ params, searchParams }) {
	const router = useRouter();

	const [ title, setTitle ] = useState(searchParams.title);
	const [ description, setDescription ] = useState(searchParams.description);
	const [ startDate, setStartDate ] = useState(searchParams.startDate);
	const [ endDate, setEndDate ] = useState(searchParams.endDate);
	const [ categoryCode, setCategoryCode ] = useState(searchParams.categoryCode);

	const [ editing, setEditing ] = useState(false);
	const [ isLoading, setIsLoading ] = useState(false);
	const [ categoriesList, setCategoriesList ] = useState([]);

	useEffect(() => {
		async function loadResources() {
			setIsLoading(true);
			const res = await getAllCategoriesService();

			if (!res.success) {
				throw new Error(res.message);
			}

			setCategoriesList([ ...res.result ]);
			setIsLoading(false);
		}

		if (editing) {
			loadResources();
		}
	}, [ editing ]);


	if (isLoading) return <Loading />;

	function handleEditing() {
		if (editing) {
			setTitle(searchParams.title);
			setDescription(searchParams.description);
			setStartDate(searchParams.startDate);
			setEndDate(searchParams.endDate);
			setCategoryCode(searchParams.categoryCode);

			document.getElementById('category').value = categoryCode;
		}

		setEditing(!editing);
	}

	async function handleEditEventForm(e) {
		e.preventDefault();

		setIsLoading(true);
		setEditing(false);

		const updatedData = treatUpdatedEventData(searchParams, { title, description, startDate, endDate, categoryCode });
		const res = await updateEventService(searchParams.id, updatedData);

		setIsLoading(false);

		if (!res.success) {
			throw new Error(res.message);
		} else {
			alert(res.message);
		}
	};

	async function handleDeleteEvent() {
		setIsLoading(true);
		setEditing(false);

		const res = await deleteEventService(searchParams.id);

		if (!res.success) {
			throw new Error(res.message);
		}

		setIsLoading(false);

		await navigateTo({ path: routesMap.events.base });
	}

	return (
		<FormContainer
			title={locale.pagesTitles.events.view}
			submitCallback={(e) => handleEditEventForm(e).then(router.refresh())}
		>
			<FormSection labelFor='title' sectionTitle={locale.entitiesProperties.events.title}>
				<input name='title' value={title} readOnly={!editing} type='text' required placeholder={locale.entitiesProperties.events.title} onChange={(e) => { setTitle(e.target.value); }}></input>
			</FormSection>

			<FormSection labelFor='description' sectionTitle={locale.entitiesProperties.events.description}>
				<textarea name='description' readOnly={!editing} value={description} placeholder={locale.entitiesProperties.events.description} onChange={(e) => { setDescription(e.target.value); }}></textarea>
			</FormSection>

			<FormSection labelFor='startDate' sectionTitle={locale.entitiesProperties.events.startDate}>
				<input name='startDate' readOnly={!editing} value={startDate} type='datetime-local' onChange={(e) => { setDueDate(e.target.value); }}></input>
			</FormSection>

			<FormSection labelFor='endDate' sectionTitle={locale.entitiesProperties.events.endDate}>
				<input name='endDate' readOnly={!editing} value={endDate} type='datetime-local' onChange={(e) => { setToDoDate(e.target.value); }}></input>
			</FormSection>

			<FormSection labelFor='category' sectionTitle={locale.entitiesProperties.general.category}>
				<select id='category' name='category' disabled={!editing} onChange={(e) => { setCategoryCode(e.target.value); }}>
					<option defaultValue=''>{categoryCode}</option>

					{categoriesList.length > 0 ?
						categoriesList.map((category) => {
							return (
								<option key={category.code} value={category.code}>{category.title}</option>
							);
						})
						:
						<option disabled value=''>{locale.notFoundDefaults.categories}</option>
					}
				</select>
			</FormSection>

			<div className='flex flex--row flex--center'>
				<DefaultButton
					title={editing ? locale.actionsTitles.cancel : locale.actionsTitles.edit}
					variant='outlined'
					buttonType='button'
					onClickFunction={() => { handleEditing(); }}
				/>

				<DefaultButton
					title={locale.actionsTitles.save}
					variant='filled'
					buttonType='submit'
					isDisabled={editing ? false : true}
				/>

				<DangerButton
					title={locale.actionsTitles.delete}
					onClickFunction={() => { handleDeleteEvent(); }}
				/>
			</div>
		</FormContainer>
	);
}