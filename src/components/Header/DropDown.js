import { useState } from 'react';
import Page from './Page1';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';

const Dropdown = () => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div className="relative">
			<button
				type="button"
				className="px-4 py-2 text-white bg-[#27272A] rounded-md font-poppins"
				onClick={toggleDropdown}
				//onClick
			>
				<span className="flex flex-row text-xs lg:flex font-poppins">
					EXPLORE BY CATEGORY
					<MdOutlineKeyboardArrowDown size={15} className="" />
				</span>
			</button>
			{isOpen && (
				<div className="absolute z-10 mt-2 bg-white rounded-md shadow-lg">
					<ul>
						<li className="px-4 py-2 ">
							<Page />
						</li>
					</ul>
				</div>
			)}
			,
		</div>
	);
};

export default Dropdown;
