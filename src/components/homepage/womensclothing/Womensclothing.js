import Image from 'next/image';
import Link from 'next/link';

const Womensclothing = ({ cards }) => {
	const serverURL = process.env.BASE_API_URL;
	return (
		<div className="flex flex-row items-center justify-between w-full gap-4 overflow-auto lg:gap-6 grid-container">
			{cards.map((card, index) => (
				<Link key={index} href={`/subcategory/${card._id}`} className="">
					<div className="flex flex-col items-center gap-3 shrink-0 hover:font-semibold">
						<div className="w-36 md:w-48 lg:w-[220px] h-36 md:h-48 lg:h-[220px] overflow-auto hover:shadow-lg rounded-[6px] border-[1px] p-2 border-[#EEEEEE]">
							<Image
								width={300}
								height={300}
								src={card?.image?.url ? (serverURL+'/api/v1' +card?.image?.url) : ('/images/chair.png')}
								alt={card.name}
								className="object-cover w-full h-full"
							/>
						</div>

						<div className="w-full">
							<p className="w-full h-30 font-poppins text-sm lg:text-base leading-[150%] font-[600]">
								{card.name}
							</p>
							<p className="w-full h-30 font-poppins text-sm lg:text-base leading-[150%] text-[#888888]">
								10% discount 
							</p>
						</div>
					</div>
				</Link>
			))}
		</div>
	);
};

export default Womensclothing;
