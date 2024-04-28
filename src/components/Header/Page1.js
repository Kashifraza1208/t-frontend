import React from 'react';
// import Accordion from './Accordion';
import Accordion from './Accordian';

const Page = () => {
	const accordionItems = [
		{
			title: 'Near By',
			content: [
				'Near By Fashion ',
				'Near By Jewellery',
				'Near By Furniture',
				'Near By Electronics',
			],
		},
		{
			title: 'Men',
			content: [
				"Men's Clothing ",
				'Footwear',
				'Watches and Accessories',
				'Sportswear',
				'Beauty & Cosmetics',
			],
		},
		{
			title: 'Women',
			content: [
				"Women's Clothing",
				'Footwear',
				'Watches and Accessories',
				'Sportswear',
				'Beauty & Cosmetics',
			],
		},
		{
			title: 'Jewellery',
			content: [
				'Gold & Diamond',
				'Silver Jewellery',
				'Gold & Silver Coins',
				'Fashion Jewellery',
				"Men's Jewellery",
			],
		},
		{
			title: 'Children',
			content: ['Kids Wear', 'Toys and Stationary', 'Baby care', 'Health care'],
		},
	];

	return (
		<div className="md:w-[90vw] w-[80vw]">
			{accordionItems.map((item, index) => (
				<Accordion key={index} title={item.title} content={item.content} />
			))}
		</div>
	);
};
export default Page;
