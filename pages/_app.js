import '../styles/globals.css'
import { UserContextProvider } from '../context/user'
import { FilterContextProvider } from '../context/filter'

function MyApp({ Component, pageProps }) {
	return (
		<UserContextProvider>
			<FilterContextProvider>
				{' '}
				<Component {...pageProps} />
			</FilterContextProvider>
		</UserContextProvider>
	)
}

export default MyApp
