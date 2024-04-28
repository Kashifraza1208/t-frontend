import Image from 'next/image';

export default function CImage({ src, alt, width, height, className }) {
    const loaderProp = ({ src }) => {
		return src;
	};
    return <Image src={src} alt={alt} width={width} height={height} className={className} loader={loaderProp} />;
}