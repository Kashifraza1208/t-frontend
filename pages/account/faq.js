import FAQ from '../../src/components/Header/Faqsidebar';
import FAQBODY from '../../src/components/Header/Faqbody';

export default function contactus() {
	return (
		<>
			<div className=" block md:flex justify-center gap-3 p-5 mt-4">
				<FAQ />
				<FAQBODY />
			</div>
		</>
	);
}
