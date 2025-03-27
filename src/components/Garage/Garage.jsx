import { useEffect } from 'react';
import { FaCarSide } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCarFromList, getCars, selectCars, selectError, selectLoading, setSelectedCar } from '../../features/Cars/CarsSlice';

function Garage() {
  const dispatch = useDispatch();
  const cars = useSelector(selectCars);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(getCars());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;


  return (
    <ul>
			{cars.map((car) => (
				<div key={car.id}>

					<p>{car.name}</p>

					<li>{<FaCarSide color={car.color} />}</li>

					<div>
						<button
							onClick={() => dispatch(setSelectedCar(car))}
						>
							Select
						</button>
						<button 
							onClick={() => dispatch(deleteCarFromList(car.id))}
						> 
							Remove
						</button>
						<button>Start</button>
						<button>Stop</button>
					</div>

				</div>
			))}
    </ul>
  );
}

export default Garage;