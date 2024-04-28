import React, { useState } from 'react';
import Link from 'next/link';

const Accordion = ({ title, content }) => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleAccordion = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div className="bg-white border-white rounded-md">
			<div
				className="flex items-center justify-between p-4 cursor-pointer select-none"
				onClick={toggleAccordion}>
				<h2 className="text-lg font-semibold ">{title}</h2>
				<span
					className={`w-4 h-4 transition-transform duration-300 transform ${
						isOpen ? 'rotate-0' : 'rotate-180'
					}`}>
					&#x25BE;
				</span>
			</div>
			{isOpen && (
				<div className="p-4 ">
					<ul className="grid gap-2">
						{content.map((item, index) => (
							<li key={index} className="flex items-center p-2 rounded-md">
								{/* <span className="w-4 h-4 mr-2 text-gray-500">&#x25B8;</span> */}
								<Link href="">
									<span>{item}</span>
								</Link>
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
};

export default Accordion;
