import { Link, useLocation } from 'react-router';

function Navbar() {
	const location = useLocation();

	return (
		<div>
			<h1>{location.pathname === '/garage' ? 'Garage' : 'Winners'}</h1>
			<div>
				<Link to='/garage'>
					<button disabled={location.pathname === '/garage'}>Garage</button>
				</Link>
				<Link to='/winners'>
					<button disabled={location.pathname === '/winners'}>Winners</button>
				</Link>
			</div>
		</div>
	)
}

export default Navbar;