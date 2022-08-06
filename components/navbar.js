import { useContext, useState } from 'react'
import Image from 'next/image'
import FilterIcon from '../assets/images/filter.svg'
import FilterContext from '../context/filter'
import Filter from './filter'

const Navbar = () => {
	const {
		ridesCategoryId,
		setRidesCategoryId,
		prevRidesCount,
		upcomingRidesCount,
	} = useContext(FilterContext)

	const [filterToggle, setFilterToggle] = useState(false)

	const rideCategories = [
		{
			id: 0,
			value: 'Nearest rides',
		},
		{
			id: 1,
			value: 'Upcoming rides',
			count: upcomingRidesCount,
		},
		{
			id: 2,
			value: 'Past rides',
			count: prevRidesCount,
		},
	]

	return (
		<nav className='navbar'>
			<div className='ride_categories_container'>
				{rideCategories.map((category) => {
					return (
						<span
							key={category.id}
							onClick={() => setRidesCategoryId(category.id)}
							className={
								ridesCategoryId === category.id ? 'selected_category' : null
							}
						>
							{category.id === 0
								? category.value
								: `${category.value} (${category.count})`}
						</span>
					)
				})}
			</div>

			<div className='filter_wrapper'>
				<div
					className='filter_button'
					onClick={() => setFilterToggle(!filterToggle)}
				>
					<Image src={FilterIcon} />
					<span>Filters</span>
				</div>
				<div className={filterToggle ? 'show_filter' : 'hide_filter'}>
					<Filter />
				</div>
			</div>
		</nav>
	)
}

export default Navbar
