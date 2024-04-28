import Image from 'next/image';
import { useState } from 'react';
import { IoPersonCircle } from 'react-icons/io5';
import { MdLink, MdSend } from 'react-icons/md';

const ChatPage = ({ userDp }) => {
	const [inputMessage, setInputMessage] = useState('');
	const [messages, setMessages] = useState([
		{
			id: 1,
			sender: 'John',
			content:
				'Hi Daya, this is Lavanya from Myntra s customer service team. I am here to this is Lavanya from Myntra s customerthis is Lavanya from Myntra s customer assist you today',
			timestamp: '10:00 AM',
		},
		{
			id: 2,
			sender: 'Jane',
			content: 'Hi John! How are you?',
			timestamp: '10:00 AM',
		},
		// Add more messages here
	]);

	const handleInputChange = (event) => {
		setInputMessage(event.target.value);
	};

	const handleSendMessage = () => {
		if (inputMessage.trim() !== '') {
			setMessages((prevMessages) => [
				...prevMessages,
				{
					id: messages.length + 1,
					sender: 'You',
					content: inputMessage,
					timestamp: new Date().toLocaleTimeString([], {
						hour: '2-digit',
						minute: '2-digit',
					}),
				},
			]);
			setInputMessage('');
		}
	};

	return (
		<>
			<div className="flex flex-col h-screen">
				<div className="flex flex-col">
					<Image
						src={'/images/logo/trialshoppy_mobile.svg'}
						width={100}
						height={50}
						alt="logo"
						className="lg:block h-full lg:w-[150px] w-[100px]"
					/>
					<div className="text-gray-500 pl-2">Support</div>
				</div>
				<div className="flex-grow p-2">
					<div className="p-1 py-2 mx-2 ">
						{messages.map((message) => (
							<div
								key={message.id}
								className={`mb-4 flex  ${
									message.sender === 'You' ? 'justify-end' : 'items-start'
								}`}>
								{message.sender !== 'You' && <IoPersonCircle size={30} />}
								<div
									className={`${
										message.sender === 'You'
											? 'bg-[#EB8105] text-white'
											: 'bg-white  border-gray-300  border-[1px] py-2 px-4'
									} p-2 items-start    sm:max-w-fit w-[75%]  flex-row px-4  `}>
									{message.content}
									<p className="flex justify-end text-xs text-gray-600 ">
										{message.timestamp}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>
				<div className="py-2 px-3 my-2 rounded-full border">
					<div className="flex">
						<input
							type="text"
							value={inputMessage}
							onChange={handleInputChange}
							placeholder="Type here..."
							className="flex-grow px-4 py-1 focus:outline-none"
						/>
						<div className="flex items-center text-gray-400 mx-2">
							<MdLink size={30} />
						</div>

						<div className="rounded flex cursor-pointer">
							{inputMessage.trim() === '' ? (
								<button
									disabled={true}
									onClick={handleSendMessage}
									className="bg-orange-300 text-white p-3 rounded-full mr-1 ">
									<MdSend size={20} />
								</button>
							) : (
								<button
									onClick={handleSendMessage}
									className="bg-orange-500 text-white p-3 rounded-full mr-1 ">
									<MdSend size={20} />
								</button>
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ChatPage;
