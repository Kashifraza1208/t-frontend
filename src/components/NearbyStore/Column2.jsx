// import Image from 'next/image';
import Image from "../../../utils/Image";
export default function Column2({ imageName, text, textt }) {
	return (
		<>
			<div className="flex px-2 md:mb-16 mb-4 w-[60vw] md:w-fit m-0 text-gray-900">
				<div className="">
					<Image
						width={20}
						height={20}
						src={`/images/store/${imageName}.svg`}
						alt=" random imgee"
						className=" md:mx-0 block sm:h-[30vh] h-[210px] w-[60vw] lg:p-2 md:p-1 md md:h-full md:w-[36vw]  "
					/>
					<div className="relative px-4 -mt-10">
						<div className="bg-white p-2 shadow-md">
							<div className="flex items-baseline"></div>

							<div className="mt-1 text-[14px] font-semibold uppercase justify-center flex  ">
								{text}
							</div>

							<div className="mt-4">
								<span className="text-sm text-gray-600 justify-center flex">
									{textt}{' '}
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
