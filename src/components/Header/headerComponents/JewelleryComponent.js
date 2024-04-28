import Image from 'next/image';
import { IoMdArrowDropright } from 'react-icons/io';
import { useState, useEffect } from 'react';
import fetchData from './fetchData';
import SubCatCol from './SubCatCol';
import Loading from '../../Loading';

const FurnitureComponent = ({ categoryId }) => {
    const [selectedSubCat, setSelectedSubCat] = useState('5f52b44a16c0f1e00c79b828');
    const [subCat1, setSubCat1] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    useEffect(() => {
        const fetch1 = async () => {
            const data = await fetchData(selectedSubCat);
            setSubCat1(data);
        };
        const fetch2 = async () => {
            const data = await fetchData(categoryId);
            setSubcategories(data);
        };
        fetch1();
        fetch2();
    }, [selectedSubCat, categoryId]);

    const handleSubCatClick = (id) => {
        setSelectedSubCat(id);
    };

    return (
        <div className="w-full bg-white z-100 absolute top-0 grid lg:grid-cols-5 grid-cols-2 grid-rows-3 lg:grid-rows-1 gap-4 lg:px-[5rem] md:px-10 px-3 py-5 border rounded shadow-lg overflow-hidden">
            <div className="flex flex-col border-r overflow-y-auto">
                {subcategories.map((subCat) => (
                    <div
                        key={subCat._id}
                        className={`${
                            selectedSubCat === subCat._id
                                ? 'font-medium flex flex-row items-center'
                                : 'text-gray-600'
                        } my-1 cursor-pointer`}
                        onClick={() => handleSubCatClick(subCat._id)}>
                        {subCat.name}
                        {selectedSubCat === subCat._id && (
                            <IoMdArrowDropright className="mx-1" size={16} />
                        )}
                    </div>
                ))}
            </div>

            <div className="lg:col-span-3 md:col-span-1 w-full flex flex-col items-center justify-center rounded">
                {subCat1.length > 0 ? (
                    subCat1.map((sub1) => (
                        <SubCatCol
                            category={sub1}
                            key={sub1._id}
                            subcategories={fetchData(sub1._id)}
                        />
                    ))
                ) : (
                    <Loading />
                )}

                <div className="flex flex-col items-start mt-4">
                    <div className="font-light text-sm flex gap-1">
                        Sponsored Results
                        <Image
                            src={'/icons/ic_outline-info.svg'}
                            width={16}
                            height={16}
                            alt=""
                            className="opacity-50"
                        />
                    </div>
                    <div className="w-full max-w-xs h-full shadow-md hover:shadow-lg p-2 flex flex-col items-center gap-2 shrink-0">
                        <div className="w-full h-48 rounded overflow-hidden">
                            <Image
                                width={100}
                                height={100}
                                src={'/images/mentshirt.jpeg'}
                                alt="card"
                                className="w-full h-full object-cover rounded"
                            />
                        </div>

                        <div className="flex flex-col self-start">
                            <div className="font-medium">Suhana Lehanga...</div>
                            <div className="text-gray-500">Light weight lehenga choli</div>
                            <div className="flex flex-row">
                                <div className="mr-2 font-medium">₹123</div>
                                <div className="mr-2 text-gray-500 line-through">1299</div>
                                <div className="mr-2 text-green-600">58% off</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FurnitureComponent;
