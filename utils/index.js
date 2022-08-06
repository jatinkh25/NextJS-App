export const getMinimumDistanceFromSource = (
	stationPathArray,
	sourceStationCode
) => {
	let minimumDistance = Number.MAX_SAFE_INTEGER
	if (sourceStationCode == null) return minimumDistance

	// getting min-distance between user-station and every station in ride path
	for (let path of stationPathArray) {
		minimumDistance = Math.min(
			minimumDistance,
			Math.abs(path - sourceStationCode)
		)
	}

	return minimumDistance
}

export const getDistanceSortedRides = (rides, userStationCode) => {
	const newRides = [...rides]

	// sorting rides on the basis of min-distance from user-station
	newRides.sort(function (a, b) {
		return (
			getMinimumDistanceFromSource(a.station_path, userStationCode) -
			getMinimumDistanceFromSource(b.station_path, userStationCode)
		)
	})

	return newRides
}

export const getFilteredRides = (
	rides,
	categoryId,
	filterState,
	filterCity,
	userStationCode
) => {
	let filteredRides = []

	switch (categoryId) {
		case 0:
			filteredRides = getDistanceSortedRides(rides, userStationCode)
			break
		case 1:
			filteredRides = rides.filter(
				(ride) => Date.parse(ride.date) >= Date.now()
			)
			break
		case 2:
			filteredRides = rides.filter((ride) => Date.parse(ride.date) < Date.now())
			break
		default:
			filteredRides = rides
	}

	if (filterState.label === 'State' || filterState.label === 'All')
		return filteredRides

	filteredRides = filteredRides.filter(
		(ride) => ride.state === filterState.label
	)

	if (filterCity.label === 'City' || filterCity.label === 'All')
		return filteredRides

	filteredRides = filteredRides.filter((ride) => ride.city === filterCity.label)

	return filteredRides
}

export const getPrevRidesCount = (rides) => {
	let prevRides = []
	prevRides = rides.filter((ride) => Date.parse(ride.date) < Date.now())
	return prevRides.length
}
