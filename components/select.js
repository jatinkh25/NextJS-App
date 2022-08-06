import { useState } from 'react'
import Image from 'next/image'
import TriangleIcon from '../assets/images/triangle.svg'

const Select = ({ name, options, value, onClick }) => {
	const [toggle, setToggle] = useState(false)

	const onOptionClickHandler = (option) => {
		setToggle(!toggle)
		onClick(option)
	}

	return (
		<div className='options_container'>
			<div className='option_name' onClick={() => setToggle(!toggle)}>
				<span>{value.label ? value.label : name}</span>
				<div className={toggle ? 'triangle_icon rotate' : 'triangle_icon'}>
					<Image src={TriangleIcon} />
				</div>
			</div>

			<div
				className={['option_menu_wrapper', toggle && 'show_options'].join(' ')}
				onClick={() => setToggle(!toggle)}
			>
				<ul className='option_menu'>
					{options.map((option, idx) => {
						return (
							<li
								key={idx}
								className={[
									'option',
									option.value === value && 'selected_option',
								].join(' ')}
								onClick={() => onOptionClickHandler(option)}
							>
								<span>{option.label}</span>
							</li>
						)
					})}
				</ul>
			</div>
		</div>
	)
}

export default Select
