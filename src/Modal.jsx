import React from 'react'
import UploadPhoto from './components/liveproduct/UploadPhoto'
function Modal() {
    return (
        <>

<div className='fixed top-0  left-0 right-0 z-50  p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full' >
    {/* <!-- component --> */}
{/* <!-- CONTAINER MODAL--> */}
    <div className=" relative w-full max-w-2xl max-h-full">
      {/* <!--MODAL ITEM--> */}
      <div className="relative bg-white rounded-lg shadow p-4 ">
                        <UploadPhoto />
                    </div>
                </div>
            </div>

        </>
    )
}

export default Modal