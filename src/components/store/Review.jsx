import React, { useRef, useState } from 'react';
import { useUser } from '../../UserContext';
import StarRatingInput from '../star_rating/StarRatingInput';
import axios from 'axios';
import Image from 'next/image';

const Review = ({ setReviewBoxOpen, productId }) => {
    const { user, token } = useUser();
    const [message, setMessage] = useState('');
    const [rating, setRating] = useState(0);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const serverURL = process.env.BASE_API_URL;
    const fileInputRef = useRef(null);

   
    const handleFileUpload = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);

        if (files.length + selectedFiles.length > 5) {
            alert('Exceeds maximum allowed images');
            return;
        }

        setSelectedFiles([...selectedFiles, ...files]);
    };

    const handleRemoveImage = (index) => {
        const updatedFiles = [...selectedFiles];
        updatedFiles.splice(index, 1);
        setSelectedFiles(updatedFiles);
    };

    const AddReview = async (e) => {
        e.preventDefault();

        try {
            const userId = user._id;
            if (!userId) {
                console.error('UserId is not available.');
                return;
            }

            const reviewData = {
                rating: rating,
                reviewText: message,
                pictures: selectedFiles.map((file) => ({
                    filename: file.name,
                    url: URL.createObjectURL(file),
                })),
            };

            const response = await axios.post(
                `${serverURL}/api/v1/reviews/${userId}/products/${productId}`,
                reviewData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            
            
            console.log(response.data);
        } catch (error) {
            console.error('Error adding review:', error);
        }

        setMessage('');
        setSelectedFiles([]);
        setReviewBoxOpen(false);
    };

    return (
        <>
            <div className="absolute lg:mx-[260px] 2xl:mx-[300px] flex flex-col w-full h-full z-[100] p-5 bg-white">
                <div className="flex w-full md:justify-center md:items-center">
                    <div className="w-full">
                        <div className="flex flex-col p-5 bg-white border-2 rounded-md border-gray">
                            <div className="text-[32px] font-semibold mt-5">
                                Write a Review
                            </div>
                            <div className="text-[16px] font-medium mt-4">
                                Rate the product
                            </div>
                            <div className="py-2 mt-2">
                                <StarRatingInput rating={rating} setRating={setRating} />
                            </div>
                            <div className="py-1">Message</div>
                            <textarea
                                type="text"
                                id="horizontalInput"
                                className="w-full h-[125px] px-4 py-2 mb-4 leading-tight text-gray-700 bg-transparent border-[1px] appearance-none border-[#BBC1CC] focus:outline-none"
                                placeholder="Write message"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                            <div className="py-1 mb-1">Add Photo</div>
                            <div className="flex items-center mb-2">
                                <button
                                    className="p-2 text-sm rounded-md bg-[#EB8105] text-white mr-2"
                                    onClick={handleFileUpload}>
                                    Upload Image
                                </button>

                                {selectedFiles.map((file, index) => (
                                    <div key={index} className="relative mr-2">
                                        <span
                                            className="absolute top-0 right-0 cursor-pointer"
                                            onClick={() => handleRemoveImage(index)}>
                                            &#10005;
                                        </span>
                                        <Image
                                            src={URL.createObjectURL(file)}
                                            width={50}
                                            height={50}
                                            alt={`Uploaded Image ${index + 1}`}
                                            className="object-cover rounded-full"
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className="flex py-2 my-2">
                                <button
                                    className="p-3 text-[16px] rounded-[8px] w-1/2 mr-1 bg-[#EB8105] text-black"
                                    onClick={AddReview}>
                                    Save
                                </button>
                                <button
                                    className="p-3 text-[16px] rounded-[8px] w-1/2 ml-1 bg-black text-white"
                                    onClick={() => setReviewBoxOpen(false)}>
                                    Cancel
                                </button>
                            </div>
                            <input
                                type="file"
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                                onChange={handleFileChange}
                                multiple
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Review;
