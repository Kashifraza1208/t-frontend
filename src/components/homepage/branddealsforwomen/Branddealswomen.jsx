import React from 'react';
import DealsCard from '../../ProductCards/DealsCard';

const Branddealswomen = ({ data }) => {
	return (
		<div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-5 w-full">
			{data.map((item, index) => {
				return (
					<DealsCard
						key={index}
						title={item?.title}
						image={item.image}
						offer={item.title}
					/>
				);
			})}
		</div>
	);
};

export default Branddealswomen;
