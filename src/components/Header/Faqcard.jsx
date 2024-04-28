import React, { useState } from 'react';
import Image from 'next/image';
function FeedbackCard({ title, content, id, setOpened, opened }) {
	return (
		<div onClick={() => setOpened(id)} className="border-2 cursor-pointer ">
			<div className="flex justify-between p-4 mt-1">
				<h1 className="text-xl ">{title}</h1>
				{opened === id ? (
					<Image
						width={20}
						height={50}
						src="/icons/up.svg"
						alt="+"
						className="h-5 "
					/>
				) : (
					<Image
						width={20}
						height={50}
						src="/icons/down.svg"
						alt="+"
						className="h-5 "
					/>
				)}
			</div>
			{opened === id && <p className="max-w-3xl p-4">{content}</p>}
		</div>
	);
}

export default FeedbackCard;
