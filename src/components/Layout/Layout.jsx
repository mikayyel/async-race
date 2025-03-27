import { Outlet } from 'react-router';
import AddOrUpdateCar from '../AddOrUpdateCar/AddOrUpdateCar';
import Navbar from '../Navbar/Navbar';

function Layout() {
	return (
		<>	
			<header>
				<Navbar />
				<AddOrUpdateCar />
			</header>
			<main>
				<Outlet />
			</main>
			<footer>

			</footer>
		</>	
	)
}

export default Layout;