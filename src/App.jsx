import { Navigate, Route, Routes } from 'react-router';
import Garage from './components/Garage/Garage';
import Layout from './components/Layout/Layout';
import Winners from './components/Winners/Winners';

function App() {
	return (
		<Routes>
			<Route path='/' element={<Layout />}>
				<Route index element={<Navigate to="/garage" />} /> 
				<Route path="garage" element={<Garage />} />
				<Route path="winners" element={<Winners />} />
			</Route>
		</Routes>
	)
}

export default App;