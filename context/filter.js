import { createContext, useState } from 'react'

const FilterContext = createContext()

export function FilterContextProvider({ children }) {
	const [ridesCategoryId, setRidesCategoryId] = useState(0)

	const [filterState, setFilterState] = useState({
		label: 'State',
		value: 'state',
	})

	const [filterCity, setFilterCity] = useState({ label: 'City', value: 'city' })

	const [prevRidesCount, setPrevRidesCount] = useState(0)
	const [upcomingRidesCount, setUpcomingRidesCount] = useState(0)

	return (
		<FilterContext.Provider
			value={{
				ridesCategoryId,
				filterState,
				filterCity,
				upcomingRidesCount,
				prevRidesCount,
				setRidesCategoryId,
				setFilterState,
				setFilterCity,
				setUpcomingRidesCount,
				setPrevRidesCount,
			}}
		>
			{children}
		</FilterContext.Provider>
	)
}

export default FilterContext
