import Image from 'next/image'
import { useContext } from 'react'
import UserContext from '../context/user'
import { getMinimumDistanceFromSource } from '../utils'
import Map from '../assets/images/map.svg'

const Ride = ({ rideDetails }) => {
	const { userData } = useContext(UserContext)
	const { station_code: userStationCode } = userData

	// getting minimum distance from user station to every station of ride path
	const minimumDistance = getMinimumDistanceFromSource(
		rideDetails.station_path,
		userStationCode
	)

	return (
		<div className='ride_container'>
			<div className='ride_details'>
				<div className='map_image'>
					<Image src={Map} />
				</div>

				<div className='details'>
					<div className='detail'>
						<span>Ride id : </span>
						<span>{rideDetails.id || ''}</span>
					</div>
					<div className='detail'>
						<span>Origin Station : </span>
						<span>{rideDetails.origin_station_code || ''}</span>
					</div>
					<div className='detail'>
						<span>Station Path : </span>
						<span>{`[${rideDetails.station_path || ''}]`}</span>
					</div>
					<div className='detail'>
						<span>Date : </span>
						<span>{`${
							new Date(rideDetails.date).toDateString() || ''
						} ${new Date(rideDetails.date || '')
							.toLocaleTimeString()
							.toLowerCase()}`}</span>
					</div>
					<div className='detail'>
						<span>Distance : </span>
						<span>{minimumDistance == null ? '' : minimumDistance}</span>
					</div>
				</div>
			</div>

			<div className='area_info'>
				<span>{rideDetails.city || ''}</span>
				<span>{rideDetails.state || ''}</span>
			</div>
		</div>
	)
}

export default Ride
