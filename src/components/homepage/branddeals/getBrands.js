const img_fashion = '/images/img_fashion.jpeg';
const img_electronic = '/images/img_electronic.png';
const img_furniture = '/images/img_furniture.png';

export function getBrands(
	activeTab,
	popular_fashion,
	popular_electronics,
	popular_jewellery
) {
	switch (activeTab) {
		case 'fashion':
			return popular_fashion;
		case 'jewellery':
			return popular_jewellery;
		case 'electronics':
			return popular_electronics;
		default:
			return [];
	}
}
