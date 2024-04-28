import React, { useState } from 'react';
import Image from 'next/image';
import FeedbackCard from '../Header/Faqcard';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
function FAQSection() {
	const notify = () => {
		toast.success('Your message has been sent successfully!');
	};
	const [opened, setOpened] = useState(1);

	const datas = [
		{
			id: 1,
			title: 'Q: Which Company Product do you use for Facial Treatments?',
			content:
				'YLorem ipsum dolor sit amet consectetur. Posuere adipiscing scelerisque ipsum elit ante imperdiet sit. Viverra venenatis nec lectus faucibus feugiat egestas dolor. Eget aenean sollicitudin cras laoreet nam eget viverra lorem gravida. Neque volutpat maecenas adipiscing eget amet.Lorem ipsum dolor sit amet consectetur. Posuere adipiscing scelerisque ipsum elit ante imperdiet sit. Viverra venenatis nec lectus faucibus feugiat egestas dolor. Eget aenean sollicitudin cras laoreet nam eget viverra lorem gravida. Neque volutpat maecenas adipiscing eget amet.Lorem ipsum dolor sit amet consectetur. Posuere adipiscing scelerisque ipsum elit ante imperdiet sit. Viverra venenatis nec lectus faucibus feugiat egestas dolor. Eget aenean sollicitudin cras laoreet nam eget viverra lorem gravida. Neque volutpat maecenas adipiscing eget amet.',
		},
		{
			id: 2,
			title: 'Q: Which Company Product do you use for Facial Treatments?',
			content:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe atque debitis minima, dolor nostrum corrupti eaque, id fugiat distinctio ex officia maiores dignissimos? Fuga veniam animi, aliquid at perferendis reprehenderit!',
		},
		{
			id: 3,
			title: 'Q: Which Company Product do you use for Facial Treatments?',
			content:
				' Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perspiciatis hic rem error totam quaerat, nihil molestias iusto ex, porro ut neque iste? Deleniti magnam vel maxime eaque iste mollitia amet!',
		},
		{
			id: 4,
			title: 'Q: Which Company Product do you use for Facial Treatments?',
			content:
				'Lorem ipsum dolor, sit amet consectetur adipisicing elit. A iste voluptatum unde, sapiente, vel facere suscipit ea alias veniam veritatis neque quis fugiat nemo nihil at corrupti dignissimos corporis id!',
		},
		{
			id: 5,
			title: 'Q: Which Company Product do you use for Facial Treatments?',
			content:
				'Lorem ipsum dolor, sit amet consectetur adipisicing elit. A iste voluptatum unde, sapiente, vel facere suscipit ea alias veniam veritatis neque quis fugiat nemo nihil at corrupti dignissimos corporis id!',
		},
		{
			id: 6,
			title: 'Q: Which Company Product do you use for Facial Treatments?',
			content:
				'Lorem ipsum dolor, sit amet consectetur adipisicing elit. A iste voluptatum unde, sapiente, vel facere suscipit ea alias veniam veritatis neque quis fugiat nemo nihil at corrupti dignissimos corporis id!',
		},
	];

	return (
		<div>
			{datas.map((data, ind) => (
				<FeedbackCard
					opened={opened}
					setOpened={setOpened}
					title={data.title}
					key={ind}
					id={data.id}
					content={data.content}
				/>
			))}
			{/* <div className="border-2 ">
				<div className="p-4 ">
					<div className="p-2 pt-5 ">
						<label> Subject</label>
					</div>

					<div className="flex border-b-[1px] border-gray-500  pt-4 pb-[10px] w-full gap-[10px] ">
						<Image
							width={20}
							height={50}
							src="/icons/subject.jpeg"
							alt="submit"
							className=" h-5 "
						/>
						<input
							type="text"
							placeholder="Enter Subject"
							className="text-base inline font-normal font-poppins h-[24px] w-full focus-visible:outline-none"
						/>
					</div>

					<div className="pt-3 ">
						<label> Attachment</label>
					</div>

					<div className=" flex border-b-[1px] border-gray-500  pt-4 pb-[10px] w-full gap-[10px]">
						<Image
							width={20}
							height={50}
							src="/icons/attach.jpeg"
							alt="submit"
							className="h-5 "
						/>
						<input
							type="file"
							placeholder="Attach any file"
							className="text-base inline font-normal font-poppins h-[24px] pb-4 w-full focus-visible:outline-none"
						/>
					</div>

					<div className="pt-3 ">
						<label>Description</label>
					</div>
					<div className="   pt-4 pb-[10px] w-full gap-[10px]">
						<textarea
							type="text"
							placeholder="Enter about file"
							className="text-base inline font-normal font-poppins h-[111px] w-full pl-3 pt-3 focus-visible:outline-none border-gray-500  border-2 placeholder:ml-2 "
						/>
					</div>

					<div className=" bg-[#EB8105] w-20 text-center p-1 border-black border-1">
						<button
							onClick={() => {
								notify();
							}}>
							SUBMIT
						</button>
						<ToastContainer autoClose={1000} />
					</div>
				</div>
			</div> */}
		</div>
	);
}

export default FAQSection;
