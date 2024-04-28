import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import Link from 'next/link';

const PopupMessage = ({ message, onClose }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      onClose();
    }, 6000);

    return () => clearTimeout(timeout);
  }, [onClose]);

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 border-2 border-[#EB8105] rounded-md shadow-md">
        {message}
      </div>
    </div>
  );
};

const Changepwd = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
    setPasswordError('');
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setPasswordError('');
  };

  const handleClosePopup = () => {
    setSuccessMessage('');
  };

  
  const handleSubmit = () => {
    // Basic password validation
    if (newPassword.length < 8) {
      setPasswordError('Password must be at least 8 characters long');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }

    // Simulate a successful password change
    setSuccessMessage('Password changed successfully!');

    // Redirect to /account/login after 2 seconds
    const redirectTimeout = setTimeout(() => {
      router.push('/account/login');
    }, 2000);

    return () => clearTimeout(redirectTimeout);
  };

  return (
    <>
      <div className="flex items-center justify-center sm:h-screen h-[50vh] sm:justify-start sm:items-center ">
        <div className="flex items-center justify-center gap-5 p-0 m-0 text-black ">
          <div className="sm:pl-4 flex sm:w-[480px] h-fit sm:ml-20 w-[340px] bg-white flex-col mx-29 p-3 justify-center rounded-md">
            <div className="flex justify-center items-center sm:w-[440px]  mt-4 mb-3">
              <Image
                width={20}
                height={20}
                src={'/images/NameLogo.svg'}
                className="ml-[-100px] sm:w-[260px] w-[210px] h-[47px] sm:ml-0 sm:h-[60px] sm:justify-center sm:items-center"
                alt="Logo"
              />
            </div>
            <div className="flex w-full flex-col sm:max-w-[450px]  justify-between">
              <div className="flex flex-col w-full mb-2">
                <p className="flex-wrap items-center my-2 mb-4 text-xl font-semibold text-center">
                  Change Password
                </p>
                <p className="flex-wrap mb-2 text-[14px] text-center text-gray-500">
                  Enter new password
                </p>
              </div>

              <div className="flex flex-col w-full my-2 relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter new password"
                  className={`w-full h-[47px] py-1 px-2 border border-gray-400 rounded-md ${
                    passwordError ? 'border-red-500' : ''
                  }`}
                  value={newPassword}
                  onChange={handlePasswordChange}
                />
                <div
                  onClick={togglePasswordVisibility}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 hover:cursor-pointer"
                >
                  {showPassword ? <HiEyeOff /> : <HiEye />}
                </div>
              </div>

              <div className="flex flex-col w-full my-2 relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Re-Enter new password"
                  className={`w-full h-[47px] py-1 px-2 border border-gray-400 rounded-md ${
                    passwordError ? 'border-red-500' : ''
                  }`}
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                />
                <div
                  onClick={togglePasswordVisibility}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 hover:cursor-pointer"
                >
                  {showPassword ? <HiEyeOff /> : <HiEye />}
                </div>
              </div>

              {passwordError && (
                <p className="text-red-500 text-xs">{passwordError}</p>
              )}

              <button
                className="flex flex-col w-full my-1"
                type="submit"
                onClick={handleSubmit}
              >
                <div className="w-full text-white my-2 text-[16px] bg-orange-400  rounded-md h-[48px] p-1 text-center flex items-center justify-center">
                  Change Password
                </div>
              </button>

              <div className="flex flex-row justify-center mt-20 mb-1">
                <button className="text-[14px] mb-1 text-gray-600 mx-2 hover:font-semibold">
                  {' '}
                  Help
                </button>
                <button className="text-[14px] mb-1 text-gray-600 mx-2 hover:font-semibold">
                  Privacy
                </button>
                <button className="text-[14px] mb-1 text-gray-600 mx-2 hover:font-semibold">
                  Terms
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {successMessage && (
        <PopupMessage message={successMessage} onClose={handleClosePopup} />
      )}
    </>
  );
};

export default Changepwd;
