import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../../UserContext';
import { useRouter } from 'next/router'; 

export default function NearbyCard({
	_id,
	like,
	count,
	store,
	shop,
	logo,
	discount,
	text,
	location,
	distance,
	isFollowed,
	
}) {
	const [image, setImage] = useState('/images/vector3.svg');
	const [favourite, setFavourite] = useState(false);
	const { user, setUser, token } = useUser();
	const serverURL = process.env.BASE_API_URL;
	const router = useRouter();
	const [error, setError] = useState(null);
	const [follow, setFollow] = useState(isFollowed);




// const handleFollow = async () => {
// 	try {
// 	  const response = await axios.post(
// 		`${process.env.BASE_API_URL}/api/v1/${store._id}/${follow ? 'unfollow' : 'follow'}`,
// 		{},
// 		{
// 		  headers: {
// 			Authorization: `Bearer ${token}`,
// 		  },
// 		}
// 	  );
  
// 	  console.log(response.data);
  
// 	  // Update the follow state
// 	  setFollow(!follow);
// 	} catch (error) {
// 	  console.error('Error toggling follow status:', error);
// 	}
//   };

// const handleFollow = async () => {
//     try {
//       const response = await axios.post(
//         `${process.env.BASE_API_URL}/api/v1/${store._id}/${follow ? 'unfollow' : 'follow'}`,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
// 	  console.log(`${follow ? 'Unfollowed' : 'Followed'} store with ID ${store._id}:`, response.data);
//       setFollow(!follow);
//     } catch (error) {
//       console.error(`Error ${follow ? 'unfollowing' : 'following'} store:`, error);
//     }
//   };


useEffect(() => {
	// Check if the current user is following the store
	const isFollowing = store.followers && store.followers.followers.includes(user._id); // Assuming user._id is the user ID
	setFollow(isFollowing);
}, [store.followers, user._id]);


  const handleFollow = async () => {
    try {
      const response = await axios.post(
        `${process.env.BASE_API_URL}/api/v1/${store._id}/${follow ? 'unfollow' : 'follow'}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);
	  console.log(`${follow ? 'Unfollowed' : 'Followed'} store with ID ${store._id}:`, response.data);
      // Update the follow state
      setFollow(!follow);

    } catch (error) {
      console.error(`Error ${follow ? 'unfollowing' : 'following'} store:`, error);

      // Handle errors if needed
    }
  };

  
  
   return (
		<div className="flex p-1 -ml-2.5 sm:-ml-1 rounded sm:p-0 mx-7 w-44 lg:w-60 md:w-44 hover:shadow-md md:pb-2">
			<div>
				{store.images && store.images.length > 0 && (
					<div className="relative w-full">
						<Link href={`/nearByStore/store?storeId=${store._id}`} passHref>
							<Image
								key={0}
								width={200}
								height={200}
								src={store.images[0].url}
								alt={`Image 1`}
								className="block min-w-[80px] w-full h-[130px] lg:h-[256px] md:w-[36vw] object-cover"
							/>
						</Link>
						<div className="absolute text-black py-1 px-2 bg-white rounded-[16px] left-3 bottom-3">
							<h2 className="flex flex-row text-sm font-semibold">
								<div>{like}</div>
								<Image
									width={15}
									height={15}
									alt="heart"
									src="/images/vector2.svg"
								/>
								<span className="mx-1 text-gray-400">|</span>
								{count}
							</h2>
						</div>
						<div
							className="absolute text-black xxs:right-1 xxs:top-1 right-4 md:top-3 top-6"
							onClick={handleFollow}
							>
							<button className="p-2 bg-white rounded-sm ">
								<p className="text-xs">{follow ? 'Unfollow..' : '+ Follow'}</p>
							</button>
						</div>
					</div>
				)}

				<div className="px-1 mt-2 md:px-2">
					<h3 className="font-serif md:text-[20px] mb-1">{shop}</h3>
					<div className="flex flex-row items-center">
						<Image
							width={20}
							height={20}
							alt="ecommerce"
							className="w-3 h-3 md:w-5 md:h-5"
							src={`/images/${logo}`}
						/>
						<span className="px-1 text-sm">{discount}</span>
						<span
							className={`ml-1 text-[12px] md:text-base ${
								text === 'active' ? 'text-red-500' : 'text-green-500'
							}`}>
							∙ {text === 'active' ? 'Closed' : 'Open'}
						</span>
					</div>
					<div className="flex flex-row">
						<span>{location}</span>
						<span className="ml-1">{distance}</span>
					</div>
				</div>
			</div>
		</div>
	);
}


// import Image from 'next/image';
// import Link from 'next/link';
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useUser } from '../../UserContext';

// export default function NearbyCard({
// 	_id,
// 	like,
// 	count,
// 	store,
// 	shop,
// 	logo,
// 	discount,
// 	text,
// 	location,
// 	distance,
// }) {
// 	const [image, setImage] = useState('/images/vector3.svg');
// 	const [favourite, setFavourite] = useState(false);
// 	const { user, setUser } = useUser();
// 	const [follow, setFollow] = useState(false);
// 	useEffect(() => {
// 		// Check if the user and store properties are defined
// 		if (user && user.followedStores && store && store._id) {
// 		  // Check if the user is already following the store
// 		  if (user.followedStores.includes(store._id)) {
// 			setFollow(true);
// 		  }
// 		}
// 	  }, [user, store]);
	
// 	// Use only the corrected handleFollow function
// 	const handleFollow = async () => {
// 		try {
// 		  setFollow(!follow);
	  
// 		  const response = await axios.post(`http://localhost:7000/api/v1/${store.sellerId}/${store._id}/follow`);
	  
// 		  // Handle the response if needed
// 		  setFollow(true);
// 		  console.log(response.data);
// 		} catch (error) {
// 		  // Handle errors if any
// 		  console.error('Error following store:', error);
// 		}
// 	  };
	  

// 	return (
// 		<div className="flex -ml-1 rounded w-44 lg:w-60 md:w-44 hover:shadow-md md:pb-2 mx-7">
// 			<div>
// 				{store.images && store.images.length > 0 && (
// 					<div className="relative w-full">
// 						<Link href={`/nearByStore/store?storeId=${store._id}`} passHref>
// 							<Image
// 								key={0}
// 								width={200}
// 								height={200}
// 								src={store.images[0].url}
// 								alt={`Image 1`}
// 								className="block min-w-[80px] w-full h-[130px] lg:h-[256px] md:w-[36vw] object-cover"
// 							/>
// 						</Link>
// 						<div className="absolute text-black py-1 px-2 bg-white rounded-[16px] left-5 bottom-5">
// 							<h2 className="flex flex-row text-sm font-semibold">
// 								<div>{like}</div>
// 								<Image
// 									width={15}
// 									height={15}
// 									alt="heart"
// 									src="/images/vector2.svg"
// 								/>
// 								<span className="mx-1 text-gray-400">|</span>
// 								{count}
// 							</h2>
// 						</div>
// 						<div
// 							className="absolute text-black xxs:right-1 xxs:top-1 right-4 md:top-3 top-6"
// 							onClick={handleFollow}>
// 							<button className="p-2 bg-white rounded-sm ">
// 								<p className="text-xs">{follow ? 'Following..' : '+ Follow'}</p>
// 							</button>
// 						</div>
// 					</div>
// 				)}

// 				<div className="px-1 mt-2 md:px-2">
// 					<h3 className="font-serif md:text-[20px] mb-1">{shop}</h3>
// 					<div className="flex flex-row items-center">
// 						<Image
// 							width={20}
// 							height={20}
// 							alt="ecommerce"
// 							className="w-3 h-3 md:w-5 md:h-5"
// 							src={`/images/${logo}`}
// 						/>
// 						<span className="px-1 text-sm">{discount}</span>
// 						<span
// 							className={`ml-1 text-[12px] md:text-base ${
// 								text === 'active' ? 'text-red-500' : 'text-green-500'
// 							}`}>
// 							∙ {text === 'active' ? 'Closed' : 'Open'}
// 						</span>
// 					</div>
// 					<div className="flex flex-row">
// 						<span>{location}</span>
// 						<span className="ml-1">{distance}</span>
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	);
// }

