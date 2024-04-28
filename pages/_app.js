import AppLayout from '../src/layouts/AppLayout';
import '../styles/globals.css';

import Script from 'next/script';
import { UserProvider } from '../src/UserContext';
import { CartProvider } from '../src/context/cartProvider';
import { AuthProvider } from '../src/context/AuthContext';
function MyApp({ Component, pageProps }) {
	return (
		<>
			<Script src="https://checkout.razorpay.com/v1/checkout.js" />
			
			
				<AuthProvider >
					<UserProvider>
						<CartProvider>
						<AppLayout>
							<Component {...pageProps} />
							</AppLayout>
						</CartProvider>
					</UserProvider>
				</AuthProvider>
			
		
		</>
	);
}

export default MyApp;
