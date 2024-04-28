import Liveprodict from './LiveProduct';
import Searchbox2 from './Searchbox2';
import { useEffect, useState } from 'react';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
// import Share from '../Share';
import LiveProductComment from './LiveProductComment';
import storage from './firebase.config';
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import Loading from '../Loading';
// import { v4 } from 'uuid';
// import { Spinner } from '@material-tailwind/react';

function LiveproductPage() {
	//loding added
	// let sellerId = '65610769a581ad3bdd04f2bc';
	// let [sellerIdOfLogedin, setSellerIdOfLogedin] = useState(null);
	// if (typeof window !== 'undefined') {
	// const setSellerId = async () => {
	// 	setSellerIdOfLogedin(localStorage.getItem('sellerId'));
	// };

	// }
	// const [uploadloding, setUploadloding] = useState(false);
	const [loading, setLoading] = useState(true);
	const [share, setShare] = useState(false);
	const [comment, setComment] = useState(false);
	const [page, setPage] = useState(1);
	// const [videoUpload, setVideoUpload] = useState(null);
	const [videoList, setVideoList] = useState([]);
	const videoListRef = ref(storage, `videos/`);
	// const[isPlay, setisPlay] = useState(false);

	// const uploadVideo = () => {
	// 	if (!videoUpload) return;
	// 	const videoRef = ref(storage, `videos/${videoUpload.name + v4()}`);
	// 	uploadBytes(videoRef, videoUpload).then(() => {
	// 		alert('Video Uploaded!');
	// 		setUploadloding(false);
	// 		window.location.reload();
	// 	});
	// };
	useEffect(() => {
		const loadVideoList = () => {
			listAll(videoListRef)
				.then((response) => {
					Promise.all(response.items.map((item) => getDownloadURL(item)))
						.then((urls) => {
							setVideoList(urls);
						})
						.catch((error) => {
							console.error('Error loading image URLs:', error);
						});
				})
				.catch((error) => {
					console.error('Error listing images:', error);
				});
		};
		// setSellerId();
		loadVideoList();
	}, []);

	useEffect(() => {
		setTimeout(() => {
			setLoading(false);
		}, 5000);
	}, []);

	return (
		<>
			{/* {share && <Share share={share} setShare={setShare} />} */}
			{comment && (
				<LiveProductComment comment={comment} setComment={setComment} />
			)}

			<div className="mx-2 md:mx-24 my-5 relative">
				<Searchbox2 />
			</div>
			<div className={loading ? 'block' : 'hidden'}>
				<Loading />
			</div>

			<div className={!loading ? 'block' : 'hidden'}>
				<div className="grid   grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
					{videoList.slice(page, page + 6).map((url, index) => (
						<>
							{/* {console.log(url)} */}
							<div className="">
								<Liveprodict
									share={share}
									setShare={setShare}
									setComment={setComment}
									key={index}
									src={url}
								/>
							</div>
						</>
					))}
				</div>
			</div>

			{/* {sellerIdOfLogedin === sellerId && (
				<div className=" w-full flex items-center justify-center p-1">
					<input
						type="file"
						onChange={(e) => {
							setVideoUpload(e.target.files[0]);
						}}
						className="text-sm 
              file:mr-5 file:py-2 file:px-3 file:border-[1px]
              file:rounded-md file:font-medium
              hover:file:cursor-pointer 
              hover:file:bg-[#FAAC06]"
					/>
					{uploadloding ? (
						<Spinner className="text-3xl text-yellow-400 " />
					) : (
						<div className={videoUpload ? 'block' : 'hidden'}>
							<button
								onClick={() => {
									uploadVideo();
									setUploadloding(true);
								}}
								className=" hover:bg-[#FAAC06] text-xs py-2 px-3 border-2 border-black rounded-md flex gap-1">
								Upload <span className=" hidden md:flex"> Video</span>{' '}
							</button>
						</div>
					)}
					<button
						onClick={() => {
							localStorage.removeItem('sellerId');
							window.location.reload();
						}}
						className=" ml-5 hover:bg-[#FAAC06] text-xs py-2 px-3 border-2 border-black rounded-md flex gap-1">
						Logout
					</button>
				</div>
			)} */}

			<div className="flex gap-3 justify-center">
				<button
					className="bg-black text-white  my-5 p-2 rounded-md"
					onClick={() => {
						if (page === 1) {
							setPage(1);
						} else {
							setPage(page - 5);
						}
					}}>
					<AiOutlineLeft />
				</button>
				<div className="bg-gray-300  my-5 p-2 rounded-md">
					{1 + page / 5 - 0.2}
				</div>
				<button
					className="bg-black text-white  my-5 p-2 rounded-md"
					onClick={() => {
						setPage(page + 5);
					}}>
					<AiOutlineRight />
				</button>
			</div>
		</>
	);
}

export default LiveproductPage;
