'use client'

import { createContext, useState } from 'react'
import defaultContextData from '@/resources/defaultContextData'

export const UserAccessStateContext = createContext(null)
export function UserAccessStateProvider({ children }) {
	const [userAccessState, setUserAccessState] = useState(defaultContextData.userAccess)
	return <UserAccessStateContext.Provider value={{ userAccessState, setUserAccessState }}>{children}</UserAccessStateContext.Provider>
}

export const UserInfoContext = createContext(null)
export function UserInfoProvider({ children }) {
	const [userInfo, setUserInfo] = useState(defaultContextData.userInfo)
	return <UserInfoContext.Provider value={{ userInfo, setUserInfo }}>{children}</UserInfoContext.Provider>
}

export const UserCategoriesContext = createContext(null)
export function UserCategoriesProvider({ children }) {
	const [userCategories, setUserCategories] = useState(defaultContextData.userCategories)
	return <UserCategoriesContext.Provider value={{ userCategories, setUserCategories }}>{children}</UserCategoriesContext.Provider>
}

export const UserTasksContext = createContext(null)
export function UserTasksProvider({ children }) {
	const [userTasks, setUserTasks] = useState(defaultContextData.userTasks)
	return <UserTasksContext.Provider value={{ userTasks, setUserTasks }}>{children}</UserTasksContext.Provider>
}

export const UserEventsContext = createContext(null)
export function UserEventsProvider({ children }) {
	const [userEvents, setUserEvents] = useState(defaultContextData.userEvents)
	return <UserEventsContext.Provider value={{ userEvents, setUserEvents }}>{children}</UserEventsContext.Provider>
}

export const UserNotesContext = createContext(null)
export function UserNotesProvider({ children }) {
	const [userNotes, setUserNotes] = useState(defaultContextData.userNotes)
	return <UserNotesContext.Provider value={{ userNotes, setUserNotes }}>{children}</UserNotesContext.Provider>
}

export const UserTimersContext = createContext(null)
export function UserTimersProvider({children}) {
	const [userTimers, setUserTimers] = useState(defaultContextData.userTimers)
	return <UserTimersContext.Provider value={{ userTimers, setUserTimers}}>{children}</UserTimersContext.Provider>
}

export function UserProviders({ children }) {
	return (
		<UserAccessStateProvider>
			<UserInfoProvider>
				<UserCategoriesProvider>
					<UserEventsProvider>
						<UserNotesProvider>
							<UserTasksProvider>
								<UserTimersProvider>
									{children}
								</UserTimersProvider>
							</UserTasksProvider>
						</UserNotesProvider>
					</UserEventsProvider>
				</UserCategoriesProvider>
			</UserInfoProvider>
		</UserAccessStateProvider>
	)
}