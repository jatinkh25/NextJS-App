import { createContext, useState } from 'react'

const UserContext = createContext()

export function UserContextProvider({ children }) {
	const [userData, setUserData] = useState({})
	return (
		<UserContext.Provider value={{ userData, setUserData }}>
			{children}
		</UserContext.Provider>
	)
}

export default UserContext
