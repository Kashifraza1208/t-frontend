import TermsConditions from '../src/components/helpCenter/Terms&Conditions';
import Details from '../src/components/profile/Details';

export default function termsconditions() {
	return (
		<>
			<div className="lg:px-20 flex flex-row w-full overflow-x-hidden">
				<div className="hidden w-1/5 -mt-3 md:flex">
					<Details />
				</div>
				<TermsConditions />
			</div>
		</>
	);
}
