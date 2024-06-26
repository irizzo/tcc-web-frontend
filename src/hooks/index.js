'use client';

import { createContext, useState } from 'react';

export const UserAccessStateContext = createContext(null);

export function UserAccessStateProvider({ children }) {
	const [ userAccessState, setUserAccessState ] = useState(false);
	return <UserAccessStateContext.Provider value={{ userAccessState, setUserAccessState }}>{children}</UserAccessStateContext.Provider>;
}