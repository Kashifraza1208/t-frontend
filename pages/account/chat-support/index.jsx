import React from 'react';
import ChatPage from '../../../src/components/chat/Chat';
import SidebarLayout from '../../../src/layouts/SidebarLayout';

export default function Chat() {
	return (
		<>
			<SidebarLayout>
				<ChatPage />
			</SidebarLayout>
		</>
	);
}
