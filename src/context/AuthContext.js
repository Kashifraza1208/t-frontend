import { useContext } from 'react';
import { useState, useEffect } from 'react';
import { createContext } from 'react';
import axios from 'axios';

// create a context and export it.
export const AuthContext = createContext();

// create aprovider and export it; consumer will use it.
export const AuthProvider = ({ children }) => {
	const [authenticated, setAuthenticated] = useState(false);
	const serverURL = process.env.BASE_API_URL;

	useEffect(() => {
		const checkAuthentication = async () => {
			try {
				// Check if the user is authenticated
				const response = await axios.get(`${serverURL}/api/v1/checklogin`);
				if (response.data.success) {
					setAuthenticated(true);
				} else {
					console.log('not found');
					setAuthenticated(false);
				}
			} catch (error) {
				console.error('Error checking authentication:', error);
				setAuthenticated(false);
			}
		};
		checkAuthentication();
	}, []);

	return (
		<AuthContext.Provider value={{ authenticated, setAuthenticated }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	return useContext(AuthContext);
};