/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: [
			'localhost',
			'trialshopy-backend.onrender.com',
			'trialshopy-backend-rk8d.onrender.com',
			'trialshopy-backend-q24e.onrender.com',
			'trialshopy-backend-lzqm.onrender.com',
			'picsum.photos',
			'i.imgur.com',
			'imgur.com',
			'res.cloudinary.com',
			'cdn.fcglcdn.com',
			'4.imimg.com',
			'encrypted-tbn0.gstatic.com',
			'img.tatacliq.com',
			'5.imimg.com',
			'rukminim2.flixcart.com',
			'images.bestsellerclothing.in',
			'www.foreverkidz.in',
			'img3484.weyesimg.com',
			'images-cdn.ubuy.co.in',
			'example.com',
			'im.hunt.in',
		], // Add other domains if needed, separate with commas
	},
	env: {
		BASE_API_URL: process.env.BASE_API_URL || 'http://localhost:7000',
	},
};

module.exports = nextConfig;
