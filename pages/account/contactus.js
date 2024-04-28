import ContactUs from '../../src/components/Header/ContactUs';
import SidebarLayout from '../../src/layouts/SidebarLayout';

export default function contactus() {
	return (
		<>
			{/* <SidebarLayout> */}
				<div className="flex flex-row w-full overflow-x-hidden justify-evenly">
					<ContactUs />
				</div>
			{/* </SidebarLayout> */}
		</>
	);
}
