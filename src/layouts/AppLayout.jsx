import Header from '../components/Header/Header';
import Footer from '../components/footer/Footer';

const AppLayout = ({ children }) => {
	return (
		<div className="h-screen flex flex-col">
			<Header />
			<div className="flex flex-row flex-1">
				<main className="w-full">{children}</main>
			</div>
			<Footer />
		</div>
	);
};

export default AppLayout;
