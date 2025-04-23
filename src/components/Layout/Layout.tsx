import { Outlet } from 'react-router';
import AddOrUpdateCar from '../AddOrUpdateCar/AddOrUpdateCar';
import Navbar from '../Navbar/Navbar.tsx';
import style from './Layout.module.css';

function Layout() {
	return (
		<>	
			<header className={style.header}>
				<Navbar />
				<AddOrUpdateCar />
			</header>
			<main className={style.main}>
				<Outlet />
			</main>
			<footer>

			</footer>
		</>	
	)
}

export default Layout;