import Image from 'next/image';
import React from 'react';

const FollowerPopup = ({ followers, onClose }) => {
	const { followers: followersData } = followers;
	console.log('followersData:', followersData);

	return (
		<div className="fixed inset-0 flex  justify-end z-50">
			<div className="bg-white p-6  shadow-md w-1/4">
				<div className="flex flex-row justify-between">
					<h2 className="text-2xl font-bold mb-4">Followers</h2>
					<button onClick={onClose} className="text-2xl font-bold mb-4">
						X
					</button>
				</div>

				<ul className="list-none p-0">
					{followersData.map((follower) => (
						<li key={follower._id} className="mb-2">
							<div className="gap-2.5 flex w-full mt-5">
								<Image
									src={follower.profilePic?.url || '/images/man.png'}
									alt={follower.name}
									width={34}
									height={34}
									className="w-[34px] h-[34px] items-start ml-5 rounded-full"
								/>
								<p className="w-full h-30 font-poppins text-sm lg:text-base leading-[150%] font-[600] ml-3 items-center mt-1">
									{follower.name}
								</p>
							</div>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default FollowerPopup;
