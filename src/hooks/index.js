'use client'

import { createContext, useState } from 'react'

export const UserAccessStateContext = createContext(null)
export function UserAccessStateProvider({ children }) {
	const [ userAccessState, setUserAccessState ] = useState(false) // TODO: adicionar "updatedAt"
	return <UserAccessStateContext.Provider value={{ userAccessState, setUserAccessState }}>{children}</UserAccessStateContext.Provider>
}

export const UserInfoContext = createContext(null)
export function UserInfoProvider({ children }) {
	const [ userInfo, setUserInfo ] = useState({ data: null, updatedAt: new Date() })
	return <UserInfoContext.Provider value={{ userInfo, setUserInfo }}>{children}</UserInfoContext.Provider>
}

export const UserCategoriesContext = createContext(null)
export function UserCategoriesProvider({ children }) {
	const [ userCategories, setUserCategories ] = useState({ categoriesList: null, updatedAt: new Date() })
	return <UserCategoriesContext.Provider value={{ userCategories, setUserCategories }}>{children}</UserCategoriesContext.Provider>
}

export const UserTasksContext = createContext(null)
export function UserTasksProvider({ children }) {
	const [ userTasks, setUserTasks ] = useState({ tasksList: null, updatedAt: new Date() })
	return <UserTasksContext.Provider value={{ userTasks, setUserTasks }}>{children}</UserTasksContext.Provider>
}

export const UserEventsContext = createContext(null)
export function UserEventsProvider({ children }) {
	const [ userEvents, setUserEvents ] = useState({ eventsList: null, updatedAt: new Date() })
	return <UserEventsContext.Provider value={{ userEvents, setUserEvents }}>{children}</UserEventsContext.Provider>
}

export const UserNotesContext = createContext(null)
export function UserNotesProvider({ children }) {
	const [ userNotes, setUserNotes ] = useState({ notesList: null, updatedAt: new Date() })
	return <UserNotesContext.Provider value={{ userNotes, setUserNotes }}>{children}</UserNotesContext.Provider>
}

export const FocusContext = createContext(null)
export function FocusProvider({ children }) {
	const [ focus, setFocus ] = useState({ focus: 25, break: 5, longbreak: 15, current: null })
	return <FocusContext.Provider value={{ focus, setFocus }}>{children}</FocusContext.Provider>
}

export function UserProviders({ children }) {
	return (
		<UserAccessStateProvider>
			<UserInfoProvider>
				<UserCategoriesProvider>
					<UserEventsProvider>
						<UserNotesProvider>
							<UserTasksProvider>
								<FocusProvider>
									{children}
								</FocusProvider>
							</UserTasksProvider>
						</UserNotesProvider>
					</UserEventsProvider>
				</UserCategoriesProvider>
			</UserInfoProvider>
		</UserAccessStateProvider>
	)
}