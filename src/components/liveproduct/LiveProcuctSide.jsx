import React, {useState} from 'react'
import Image from 'next/image';
import ScheduleVideo from './ScheduleVideo';
import { joinMeeting } from '../../socket/socketConnection';


function LiveProcuctSide() {
	const [showScheduleVideo, setShowScheduleVideo] = useState(false);

  const handleScheduleLiveClick = () => {
    setShowScheduleVideo(true);

	joinMeeting({});
  };
  return (
<>
{showScheduleVideo ? (
        <ScheduleVideo setShowScheduleVideo={setShowScheduleVideo} />
      ) :(
			
			<div className="flex flex-col gap-5">
				<div className="flex items-center gap-2 text-sm font-bold lg:text-2xl">
					<Image width={60} height={60} src="/images/prof.svg" alt="..." />
					<p>Seajal Readymade clothes </p>
				</div>

				<div className="border-4 bg-[#EAEAEA] p-2 text-left  w-full">
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
						eiusmod tempor incididunt ut labore Lorem ipsum dolor sit amet,
						consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
						labore
					</p>
				</div>

				<div className="grid w-full grid-cols-3 gap-6 2xl:grid-cols-2 xl:grid-cols-2 lg:grid-cols-2 md:flex-row">
					<div className="relative image-container">
						<Image width={500} height={500} src="/images/girl.jpeg" alt="" className="" />
						<div className="absolute inset-0 flex items-center justify-center image-text">
							<p className="text-lg font-semibold leading-7 text-center text-white font-poppins">
								Available
							</p>
						</div>
					</div>

					<div className="relative image-container">
						<Image width={500} height={500} src="/images/live1.png" alt="" className="" />
						<div className="absolute inset-0 flex items-center justify-center image-text">
							<p className="text-lg font-semibold leading-7 text-center text-white font-poppins">
								Not Available
							</p>
						</div>
					</div>

					<div className="relative image-container">
						<Image width={500} height={500} src="/images/live2.png" alt="" className="" />
						<div className="absolute inset-0 flex items-center justify-center image-text">
							<p className="text-lg font-semibold leading-7 text-center text-white font-poppins">
								Available
							</p>
						</div>
					</div>

					<div className="relative image-container">
						<Image width={500} height={500} src="/images/live3.png" alt="" className="" />
						<div className="absolute inset-0 flex items-center justify-center image-text">
							<p className="text-lg font-semibold leading-7 text-center text-white font-poppins">
								Available
							</p>
						</div>
					</div>

					<div className="relative image-container">
						<Image width={500} height={500} src="/images/live3.png" alt="" className="" />
						<div className="absolute inset-0 flex items-center justify-center image-text">
							<p className="text-lg font-semibold leading-7 text-center text-white font-poppins">
								Available
							</p>
						</div>
					</div>

					<div className="relative image-container">
						<Image width={500} height={500} src="/images/live2.png" alt="" className="" />
						<div className="absolute inset-0 flex items-center justify-center image-text">
							<p className="text-lg font-semibold leading-7 text-center text-white font-poppins">
								Not Available
							</p>
						</div>
					</div>
				</div>

				<div className="grid w-full grid-cols-2 gap-2 mt-2 ">
					<button onClick={handleScheduleLiveClick}className="  h-12 bg-gradient-to-t from-[#FAAC06] to-[#EB8105] border">
						Schedule Live
					</button>
					<button className=" h-12 bg-gradient-to-t from-[#FAAC06] to-[#EB8105] border">
						See All
					</button>
				</div>
			</div>
			)}
			</>
		  );
		}
		
export default LiveProcuctSide