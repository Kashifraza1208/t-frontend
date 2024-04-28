import React, { useEffect } from 'react';
import SidebarLayout from '../../src/layouts/SidebarLayout';
import Account from '../../src/components/account/Account';
// import { useUser } from './../../src/UserContext';
import { useAuth } from '../../src/context/AuthContext';
import { useRouter } from 'next/router';
export default function Index() {
	// const { authenticated } = useUser();
	const {authenticated} = useAuth();
	const router = useRouter();

	
	return (
		<>
		
			{authenticated ? (
				<SidebarLayout>
					<Account />
				</SidebarLayout>
			) : null}
			
		</>
	);
}
