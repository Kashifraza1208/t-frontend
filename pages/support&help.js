import SupportHelp from '../src/components/helpCenter/Support&Help';
import Details from '../src/components/profile/Details';

export default function supporthelp() {
	return (
		<>
			<div className="md:mx-20 flex flex-row w-full overflow-x-hidden">
				<div className="hidden w-1/5 -mt-3 md:flex">
					<Details />
				</div>
				<SupportHelp />
			</div>
		</>
	);
}
