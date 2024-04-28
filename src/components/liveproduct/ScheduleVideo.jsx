import React, { useState, useEffect } from 'react';
import { MdOutlineArrowForwardIos } from 'react-icons/md';
import { SlGlobe } from 'react-icons/sl';
import { IoArrowBack } from 'react-icons/io5';
import { RxCross2 } from 'react-icons/rx';

const ScheduleVideoCall = ({ handleConfirmation, handleBack, handleScheduleVideo }) => {
  const [selectedDuration, setSelectedDuration] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [confirmationMessage, setConfirmationMessage] = useState('');

  const durations = [
    { value: '15', label: '15 min' },
    { value: '30', label: '30 min' },
    { value: '60', label: '60 min' },
  ];

  const generateTimeSlots = (duration) => {
    const slots = [];
    const currentTime = new Date();

    const interval = duration === '15' ? 15 : duration === '30' ? 30 : 60;

    for (let i = 0; i < 4; i++) {
      const time = new Date(currentTime.getTime() + i * interval * 60000);
      const formattedTime = time.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' });
      slots.push({ value: formattedTime, label: `${formattedTime} (Today)` });
    }

    return slots;
  };

  const handleDurationChange = (e) => {
    setSelectedDuration(e.target.value);
    setSelectedTimeSlot('');
  };

  const handleTimeSlotChange = (timeSlot) => {
    setSelectedTimeSlot(timeSlot);
  };

  const handleConfirm = () => {
    if (!selectedTimeSlot) {
      setConfirmationMessage('Please choose a time slot first.');
      return;
    }

    handleConfirmation(selectedTimeSlot);
    setConfirmationMessage(`Confirmed for ${selectedTimeSlot}, Today`);

    // Automatically hide the confirmation message after 2 seconds
    setTimeout(() => {
      setConfirmationMessage('');
      handleScheduleVideo();
    }, 2000);
  };

  return (
    <div className="container mx-auto p-4 relative">
      <div className="flex items-center justify-between mb-4 absolute top-0 left-0 right-0">
        <IoArrowBack className="text-2xl cursor-pointer" onClick={handleBack} />
        <RxCross2
          className="text-2xl cursor-pointer"
          onClick={() => handleConfirmation()} // Modified the function name here
        />
      </div>
      <h1 className="text-3xl font-bold mb-4">Schedule a video call</h1>
      <p className="text-gray-700 mb-4">Get connected by scheduling a call with one of our agents.</p>
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Meeting duration</h2>
        <p className="text-gray-700 mb-2">Please select the preferred meeting duration.</p>
        <div className="flex flex-wrap gap-4">
          {durations.map((duration) => (
            <button
              key={duration.value}
              className={`rounded-lg px-4 py-2 text-gray-700 border border-gray-300 ${
                selectedDuration === duration.value
                  ? 'hover:bg-gradient-to-t from-[#EB8105] to-[#FAAC06] text-black'
                  : 'hover:bg-gray-100'
              }`}
              value={duration.value}
              onClick={handleDurationChange}
            >
              {duration.label}
            </button>
          ))}
        </div>
      </div>
      {selectedDuration && (
        <div className="mb-4">
          <h2 className="font-poppins text-xl font-bold mb-2">Available time slot</h2>
          <p className="font-poppins text-gray-700 mb-2">What time would you prefer?</p>
          <div className="flex flex-wrap gap-4">
            {generateTimeSlots(selectedDuration).map((slot) => (
              <button
                key={slot.value}
                className={`rounded-lg px-4 py-2 text-gray-700 border border-gray-300 ${
                  selectedTimeSlot === slot.value
                    ? 'hover:bg-gradient-to-t from-[#EB8105] to-[#FAAC06] text-black'
                    : 'hover:bg-gray-100'
                }`}
                onClick={() => handleTimeSlotChange(slot.value)}
              >
                {slot.label}
              </button>
            ))}
          </div>
        </div>
      )}
      <div className="flex items-center justify-center">
        <button
          className="font-poppins bg-gradient-to-t from-[#EB8105] to-[#FAAC06] rounded-lg bg-blue-500 text-black px-4 py-2 disabled:opacity-50 "
          disabled={!selectedDuration || !selectedTimeSlot}
          onClick={handleConfirm}
        >
          Confirm for {selectedTimeSlot}, Today
        </button>
      </div>
      {confirmationMessage && (
        <p className="text-red-500 mt-4">{confirmationMessage}</p>
      )}
      <p className="text-sm text-gray-500 flex items-center justify-center bg-gray-100 rounded-full py-1 px-2 mt-4">
        <SlGlobe className="h-5 w-5 mr-2 text-gray-500" />
        (GMT+05:30) Asia/Kolkata
      </p>
    </div>
  );
};

const ScheduleVideo = () => {
  const [title, setTitle] = useState('');
  const [currentPage, setCurrentPage] = useState('main');
  const [error, setError] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulating the start time validation
    if (!title) {
      setError('Please set the start time before scheduling.'); // Modified the error message
      setSuccessMessage('');
    } else {
      setError(false);
      const startTime = new Date(); // replace this with your actual start time validation
      console.log('Title:', title);
      console.log('Start Time:', startTime);
      setCurrentPage('success');
      setSuccessMessage(`Scheduled successfully for ${startTime}`);
    }
  };

  const handleArrowClick = () => {
    setCurrentPage('new-page');
  };

  const handleConfirmationAndRemove = (timeSlot) => {
    console.log('Appointment confirmed');
    setSuccessMessage(`Confirmed for ${timeSlot}, Today`);
    setCurrentPage('success');

    // Automatically remove the ScheduleVideo component after 2 seconds
    setTimeout(() => {
      //setSuccessMessage('');
      setCurrentPage('hidden');
    },1000);
  };

  const handleBack = () => {
    setCurrentPage('main');
  };

  const handleScheduleVideo = () => {
    // Check if a start time is selected before proceeding
    if (!title) {
      setError('Please set the start time before scheduling.'); // Modified the error message
      setSuccessMessage('');
    } else {
      setError(false);
      setCurrentPage('hidden');
    }
  };

  return (
    <div className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ${currentPage === 'hidden' ? 'hidden' : ''}`}>
      <div className="bg-white p-8 rounded-md shadow-md max-w-screen-xl max-h-screen-md flex flex-col">
        {currentPage === 'main' && (
          <>
            <div className="flex items-center mb-4">
              <div className="flex flex-col w-full">
                <h1 className="font-poppins text-2xl font-semibold leading-8 mb-2 py-3">Schedule Video</h1>
                <div className="flex items-center mb-4">
                  <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Add Title..."
                    className="font-poppins shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline placeholder-my-2 placeholder-py-10 placeholder-px-5"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4 py-3">
              <label htmlFor="start-time" className="font-poppins text-lg font-medium leading-8 tracking-normal text-left font-bold">
                Start Time
              </label>
              <button onClick={handleArrowClick} className="ml-auto focus:outline-none">
                <MdOutlineArrowForwardIos className="text-xl" />
              </button>
            </div>
            {error && (
              <p className="font-poppins text-red-500 text-sm mb-2">
                {error}
              </p>
            )}
            <p className="font-poppins text-gray-600 text-lg mb-4 py-4 text-sm font-bold">
              Your scheduled live video will appear on your profile.
            </p>
            <form onSubmit={handleSubmit}>
              <button type="submit" className="font-poppins bg-gradient-to-t from-[#EB8105] to-[#FAAC06] py-3 px-4 mx-auto mt-auto block cursor-pointer">
                Schedule live video
              </button>
            </form>
          </>
        )}

        {currentPage === 'new-page' && (
          <ScheduleVideoCall
            handleConfirmation={handleConfirmationAndRemove}
            handleBack={handleBack}
            handleScheduleVideo={handleScheduleVideo}
          />
        )}

        {currentPage === 'success' && (
          <div>
            {successMessage && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-white p-8 rounded-md shadow-md max-w-screen-md">
                  <h2>{successMessage}</h2>
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default ScheduleVideo;
