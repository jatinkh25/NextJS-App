import { useContext } from 'react'
import FilterContext from '../context/filter'
import Select from './select'
import { State, City } from 'country-state-city'

const Filter = () => {
	const { filterState, filterCity, setFilterState, setFilterCity } =
		useContext(FilterContext)

	// getting list of cities of selected
	const getStateList = () => {
		const stateList = State.getStatesOfCountry('IN')
		const states = stateList.map((state) => ({
			label: state.name,
			value: state.isoCode,
		}))
		return [{ label: 'All', value: 'all' }, ...states]
	}

	// getting list of all states of India
	const getUpdatedCities = (stateCode) => {
		const cityList = City.getCitiesOfState('IN', stateCode)
		const cities = cityList.map((city) => ({
			label: city.name,
			value: city.name,
			...city,
		}))
		return [{ label: 'All', value: 'all' }, ...cities]
	}

	return (
		<div className='filter_options_container'>
			<span>Filters</span>
			<div className='divider'></div>
			<div className='filter_options'>
				<Select
					name='State'
					options={getStateList()}
					value={filterState}
					onClick={(value) => {
						setFilterState(value)
						setFilterCity({ label: 'City', value: 'city' })
					}}
				/>
				<Select
					name='City'
					options={getUpdatedCities(filterState.value)}
					value={filterCity}
					onClick={(value) => setFilterCity(value)}
				/>
			</div>
		</div>
	)
}

export default Filter
