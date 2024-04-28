import {
	AiOutlineLike,
	AiOutlineDislike,
	AiFillLike,
	AiFillDislike,
} from 'react-icons/ai';
import Image from 'next/image';
import { BiCommentDetail } from 'react-icons/bi';
import { FaShare } from 'react-icons/fa';
import { SlOptions } from 'react-icons/sl';
import { useState, useEffect, useRef } from 'react';
import { BsFillVolumeMuteFill } from 'react-icons/bs';
import { VscUnmute } from 'react-icons/vsc';
import { BsPlay } from 'react-icons/bs';
import { AiOutlinePause } from 'react-icons/ai';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Spinner } from '@material-tailwind/react';
import Share from '../Share';
// import Upload from './UploadPhoto';

function LiveProduct({ liveProductData, share, setShare, src, setComment }) {
	const [like, setLike] = useState(false);
	const [likeCount, setLikeCount] = useState(100);
	const [dislike, setDislike] = useState(false);

	const [dislikeCount, setDislikeCount] = useState(10);
	const [play, setPlay] = useState(false);
	const [mute, setMute] = useState(false);
	const videoRef = useRef(null);
	const [follow, setFollow] = useState(false);
	const [follow2, setFollow2] = useState(false);
	const [showOptions, setShowOptions] = useState(false);
	const [description, setDescription] = useState(false);
	
	// const handlePlay = () => {
	// 	if (videoRef.current) {
	// 	  const videos = document.getElementsByTagName('video');
	// 	  for (let i = 0; i < videos.length; i++) {
	// 		if (videos[i] !== videoRef.current) {
	// 		  videos[i].pause();
	// 		}
	// 	  }
	// 	  setPlay(true);
	// 	  videoRef.current.play();
	// 	}
	//   };

	useEffect(() => {
		const handlePause = () => {
		  setPlay(false);
		};
	
		if (videoRef.current) {
		  videoRef.current.addEventListener('pause', handlePause);
		}
	
		return () => {
		  if (videoRef.current) {
			videoRef.current.removeEventListener('pause', handlePause);
		  }
		};
	  }, []);
	
	  const handlePlay = () => {
		if (videoRef.current) {
		  const videos = document.getElementsByTagName('video');
		  for (let i = 0; i < videos.length; i++) {
			if (videos[i] !== videoRef.current) {
			  videos[i].pause();
			}
		  }
		  setPlay(true);
		  videoRef.current.play();
		}
	  };
	  
	const followHandler = () => {
		setFollow(!follow);
	};
	const followHandler2 = () => {
		setFollow2(!follow2);
	};
	const toggleOptions = () => {
		setShowOptions(!showOptions);
	};
	const handleDescription = () => {
		setDescription(!description);
	};
	return (
		<>
			<div className="flex flex-row justify-center w-full ">
				<div className="w-72 relative h-[520px] items-center bg-gray-200 flex my-12  ">
					<div className=" w-72">
						<video width={'320'} src={src} ref={videoRef} className="w-72" />
						<div className="absolute right-0 flex flex-col  items-center justify-end gap-1 pb-2 mr-5   bottom-20 md:bottom-0 sm:left-80 sm:gap-3">
							<div className="flex flex-col gap-1 ">
								{like ? (
									<div className=" flex items-center w-10 h-10 bg-white rounded-full sm:bg-gray-400">
										<AiFillLike
											className=" w-12 text-2xl text-blue-500"
											onClick={() => {
												setLike(false);
											}}
										/>
									</div>
								) : (
									<div className=" flex items-center w-10 h-10 bg-white rounded-full sm:bg-gray-400">
										<AiOutlineLike
											className="w-12 text-2xl "
											onClick={() => {
												setLike(true);
												setLikeCount(likeCount + 1);
												if (dislike) {
													setDislike(false);
													setDislikeCount(dislikeCount - 1);
												}
											}}
										/>
									</div>
								)}
								<p className="text-center text-xs font-bold text-white sm:font-normal sm:inline sm:text-black ">
									{likeCount}
								</p>
							</div>
							<div className="flex flex-col gap-1 ">
								{dislike ? (
									<div className="flex items-center w-10 h-10 bg-white rounded-full sm:bg-gray-400">
										{' '}
										<AiFillDislike
											className="w-12 text-2xl text-blue-500"
											onClick={() => {
												setDislike(false);
											}}
										/>
									</div>
								) : (
									<div className="flex items-center w-10 h-10 bg-white rounded-full sm:bg-gray-400">
										{' '}
										<AiOutlineDislike
											className="w-12 text-2xl"
											onClick={() => {
												setDislike(true);
												setDislikeCount(dislikeCount + 1);
												if (like) {
													setLike(false);
													setLikeCount(likeCount - 1);
												}
											}}
										/>
									</div>
								)}
								<p className="text-center text-xs font-bold text-white sm:font-normal sm:inline sm:text-black ">
									{dislikeCount}
								</p>
							</div>
							<div
								className="flex flex-col items-center gap-1"
								onClick={() => {
									setComment(true);
								}}>
								<div className="flex items-center w-10 h-10 bg-white rounded-full sm:bg-gray-400">
									<BiCommentDetail className="w-12 text-2xl" />
								</div>
								<p className="text-xs font-bold text-white sm:font-normal sm:inline sm:text-black ">
									{33}
								</p>
							</div>
							<div
								className="flex flex-col gap-1 "
								onClick={() => {
									setShare(true);
								}}>
								<div className="flex items-center w-10 h-10 bg-white rounded-full sm:bg-gray-400">
									<FaShare className="w-12 text-2xl" />
								</div>
								<p className="text-xs font-bold text-white sm:font-normal sm:inline sm:text-black ">
									Share
								</p>
							</div>
							{share && <Share share={share} setShare={setShare} />}
							<div
								className="flex flex-col gap-1 cursor-pointer"
								onClick={toggleOptions}>
								<div className="flex items-center w-10 h-10 bg-white rounded-full sm:bg-gray-400 ">
									<SlOptions className="w-12 text-2xl " />
								</div>
							</div>
							{showOptions && (
								<div
									className={`w-60 rounded-md z-50 absolute bottom-14 left-[-182px] md:left-[-272px] bg-opacity-50 backdrop-blur-md p-4 border-2 border-orange-500  shadow `}>
									<div
										className=" p-2 rounded-md cursor-pointer hover:white
										"
										onClick={handleDescription}>
										{!description && (
											<h1 className="text-white font-bold">Description</h1>
										)}
										{description && (
											<h1 className=" text-white font-bold">
												Discover trendy fashion shorts from our store. Explore
												unique styles, find the perfect fit, and elevate your
												wardrobe effortlessly. Shop the latest looks and express
												your individuality with our curated collection.
											</h1>
										)}
									</div>
								</div>
							)}
						</div>
					</div>

					<div className="flex mt-2 ">
					{/* Replace your BsPlay component with this */}
{play ? (
  <AiOutlinePause
    className="absolute text-3xl text-white  top-60 left-32"
    onClick={() => {
      setPlay(false);
      videoRef.current.pause();
    }}
  />
) : (
  <BsPlay
    className="absolute  text-3xl text-white  top-60 left-32"
    onClick={handlePlay}
  />
)}

						{mute ? (
							<BsFillVolumeMuteFill
								className="absolute top-2 right-1 text-4xl text-white"
								onClick={() => {
									setMute(false);
									videoRef.current.muted = false;
								}}
							/>
						) : (
							<VscUnmute
								className="absolute text-2xl text-white h-9 top-2 right-1 "
								onClick={() => {
									setMute(true);
									videoRef.current.muted = true;
								}}
							/>
						)}
					</div>
					<a href="nearByStore/store?storeId=653ce437b3b44b12a4776cdc">
						<button className="absolute  w-[110px]  bottom-14 text-xs left-40 lg:left-24 xl:left-44 bg-[#EB8105] px-2 py-1 ">
							Shop now
						</button>
					</a>
					<div>
						<div
							className=" text-xs text-white p-1 w-[110px] flex items-center gap-1  absolute  bottom-5 left-40 lg:left-24 xl:left-44 bg-[#333333] px-2"
							onClick={() => {
								followHandler2();
								setTimeout(() => {
									followHandler();
								}, 1000);
							}}>
							<div className={follow2 ? 'hidden' : 'block '}>
								<Image
									width={20}
									height={20}
									src="/images/plus.svg"
									alt=""
									className="inline h-3"
								/>
							</div>
							<div className={!follow && follow2 ? 'block' : 'hidden '}>
								<Spinner className="inline h-3 " />
							</div>
							<div className={follow2 ? 'hidden' : 'block '}>
								<button className="inline ">Follow store </button>
							</div>
							<div className={!follow && follow2 ? 'block' : 'hidden '}>
								<button className="inline">Following</button>
							</div>
							<div className={follow && follow2 ? 'block' : 'hidden '}>
								<button className="inline px-6">Unfollow</button>
							</div>
						</div>
					</div>
					<div className="flex border">
						<Image
							width={30}
							height={35}
							src="/images/prof.jpeg"
							alt=".."
							className="absolute  h-6 left-1 bottom-10 rounded-full"
						/>
						<p className="absolute w-32 ml-2  overflow-hidden text-xs text-white  bottom-9 left-8">
							Seajal Readymade clothes
						</p>
					</div>
				</div>
			</div>
		</>
	);
}

export default LiveProduct;
