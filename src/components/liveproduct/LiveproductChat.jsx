import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
const LiveproductChat = ({ userDp }) => {
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const chatContainerRef = useRef();
  const intervalRef = useRef(); // Use a ref to store the interval ID

  const handleInputChange = (event) => {
    setInputMessage(event.target.value);
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() !== '') {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: prevMessages.length + 1,
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

  useEffect(() => {
    const sendReceiverMessages = () => {
      intervalRef.current = setInterval(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            id: prevMessages.length + 1,
            sender: 'John',
            content: `Automated message ${prevMessages.length + 1}`,
            timestamp: new Date().toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            }),
          },
        ]);

        try {
          if (chatContainerRef.current && chatContainerRef.current.scrollHeight) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
          }
        } catch (error) {
          console.error('Error scrolling:', error);
        }
      }, 3000);
    };

    // Start sending receiver messages
    sendReceiverMessages();

    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <div className="flex flex-col w-full gap-2 py-2 border-2">
      <div className="flex items-center justify-between h-20 p-2">
        <div className="flex items-center w-1/2 ml-10 text-center">
          <p>Live Chat</p>
          <Image width={30} height={30} src="/images/keyboard_arrow_down.svg" alt="" />
        </div>
        <div className="items-center">
          <Image width={500} height={500} src="/images/mor.jpeg" alt="" className="w-5" />
        </div>
      </div>
      <div className="flex flex-col 2xl:h-[106vh] xl:h-[97vh]">
        <hr />
        <div className="flex-grow p-2 overflow-y-auto" ref={chatContainerRef}>
          <div className="p-1 py-2 mx-2 max-h-[60vh]">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-4 flex ${
                  message.sender === 'You' ? 'justify-end' : 'items-start'
                }`}
              >
                {message.sender !== 'You' && (
                  <Image width={500} height={500}
                    src={'/images/bed.png'}
                    alt="Sender DP"
                    className="flex flex-col w-12 h-12 mr-2 rounded-full"
                  />
                )}
                <div
                  className={`${
                    message.sender === 'You'
                      ? 'bg-[#EB8105] text-white'
                      : 'bg-white  border-gray-300  border-[px] py-2 px-4'
                  } p-2 items-start sm:max-w-fit w-[75%] flex-row px-4`}
                >
                  {message.content}
                  <p className="flex justify-end text-xs text-gray-600">
                    {message.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="p-2 px-2 my-2 mb-auto ">
          <div className="flex">
            <input
              type="text"
              value={inputMessage}
              onChange={handleInputChange}
              placeholder="Type here..."
              className="flex-grow border-white border-[.5px] px-4 py-1"
            />
            {/* <div className="flex items-center">
              <Image width={500} height={500} src="./images/attach.svg" className="w-6 h-6 mx-2" alt="Attach" />
            </div> */}
            <button onClick={handleSendMessage} className="text-orange-500">
              <Image width={500} height={500} src="/images/send3.svg" className="w-8 h-8" alt="Send" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveproductChat;
