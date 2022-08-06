import Link from 'next/link'
import Image from 'next/image'
import { useContext } from 'react'
import UserContext from '../context/user'

const Header = () => {
	const { userData } = useContext(UserContext)
	const { name: username, url: userImageUrl } = userData

	return (
		<header className='header'>
			<Link href={'https://www.edvora.com/'}>
				<a className='header_text'>Edvora</a>
			</Link>
			<div className='profile_section'>
				<p>{username}</p>
				{userImageUrl ? (
					<Image src={userImageUrl} width={44} height={44} />
				) : null}
			</div>
		</header>
	)
}

export default Header
