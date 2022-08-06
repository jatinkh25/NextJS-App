import { useContext, useEffect } from 'react'
import Head from 'next/head'
import FilterContext from '../context/filter'
import UserContext from '../context/user'
import { Header, Navbar, Ride } from '../components'
import { getFilteredRides, getPrevRidesCount } from '../utils'

export default function Home({ rides, userData }) {
	const {
		ridesCategoryId,
		filterState,
		filterCity,
		setPrevRidesCount,
		setUpcomingRidesCount,
	} = useContext(FilterContext)
	const { setUserData } = useContext(UserContext)

	// getting filtered rides on the basis of filter options
	const filteredRides = getFilteredRides(
		rides,
		ridesCategoryId,
		filterState,
		filterCity,
		userData.station_code
	)

	useEffect(() => {
		setUserData(userData)
		const prevRidesCount = getPrevRidesCount(rides)
		setPrevRidesCount(prevRidesCount)
		setUpcomingRidesCount(rides.length - prevRidesCount)
	}, [])

	return (
		<>
			<Head>
				<title>Edvora</title>
			</Head>

			<Header />
			<Navbar />

			<div>
				{filteredRides.map((rideDetails, idx) => (
					<Ride rideDetails={rideDetails} key={idx} />
				))}
			</div>
		</>
	)
}

export async function getServerSideProps() {
	// getting list of all rides available
	const ridesResponse = await fetch('https://assessment.api.vweb.app/rides')
	const ridesData = await ridesResponse.json()

	// getting current user data
	const userResponse = await fetch('https://assessment.api.vweb.app/user')
	const userData = await userResponse.json()
	return {
		props: {
			rides: ridesData,
			userData: userData,
		},
	}
}
