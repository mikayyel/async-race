import { useEffect, useRef, useState } from 'react';
import { FaCarSide } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { driveCar, startCarEngine, stopCarEngine } from '../../features/Cars/CarsAPI.tsx';
import {
  createRandomCars,
  deleteCarFromList,
  getCars,
  selectCars,
  selectError,
  selectLoading,
  setSelectedCar,
} from '../../features/Cars/CarsSlice.tsx';
import {
  addWinnerToList,
  getWinners,
  selectWinners,
  updateWinnerInList,
} from '../../features/Winners/WinnersSlice.tsx';
import style from './Garage.module.css';

function Garage() {
  const winnerRef = useRef(false);
  const raceTimeoutsRef = useRef([]);
  const [winner, setWinner] = useState(null);
  const [carsData, setCarsData] = useState({});

  const dispatch = useDispatch();
  const cars = useSelector(selectCars);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const winners = useSelector(selectWinners);

  const handleStartAll = async () => {
    try {
      winnerRef.current = false;
      raceTimeoutsRef.current = [];

      const engineResponses = await Promise.all(cars.map((car) => startCarEngine(car)));

      setCarsData((prevData) => {
        const newData = { ...prevData };
        engineResponses.forEach((engineData, index) => {
          if (engineData) {
            const carId = cars[index].id;
            newData[carId] = {
              ...newData[carId],
              distance: engineData.distance,
              velocity: engineData.velocity,
              drive: false,
            };
          }
        });
        return newData;
      });

      const driveResponses = await Promise.all(cars.map((car) => driveCar(car)));

      setCarsData((prevData) => {
        const newData = { ...prevData };
        driveResponses.forEach((driveData, index) => {
          if (driveData?.success) {
            const carId = cars[index].id;
            const timeToFinish = prevData[carId]?.distance / prevData[carId]?.velocity;

            newData[carId] = {
              ...newData[carId],
              drive: true,
            };

            const timeoutId = setTimeout(() => {
              setCarsData((prevData) => ({
                ...prevData,
                [carId]: { ...prevData[carId], drive: false },
              }));

              if (!winnerRef.current) {
                winnerRef.current = true;
                setWinner(cars[index].name);
                console.log(
                  `Winner: ${cars[index].name}`,
                  `data: ${winnerRef.current}`,
                  `Time: ${timeToFinish}`
                );
                console.log(winners);
                const existingWinner = winners.find((winner) => cars[index].id === winner.id);

                if (existingWinner) {
                  const updatedWinner = {
                    ...existingWinner,
                    wins: existingWinner.wins + 1,
                    time: Number((timeToFinish / 1000).toFixed(1)),
                  };
                  dispatch(updateWinnerInList(updatedWinner));
                  dispatch(getWinners());
                } else {
                  const newWinner = {
                    id: cars[index].id,
                    wins: 1,
                    time: Number((timeToFinish / 1000).toFixed(1)),
                  };
                  dispatch(addWinnerToList(newWinner));
                  dispatch(getWinners());
                }
                setTimeout(() => setWinner(null), 5000);
              }
            }, timeToFinish);

            raceTimeoutsRef.current.push(timeoutId);
          }
        });
        return newData;
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleStopAll = async () => {
    setCarsData((prevData) => {
      const newData = { ...prevData };
      cars.forEach((car) => {
        newData[car.id] = { ...newData[car.id], drive: false };
      });
      return newData;
    });

    raceTimeoutsRef.current.forEach(clearTimeout);
    raceTimeoutsRef.current = [];

    try {
      await Promise.all(cars.map((car) => stopCarEngine(car)));
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleStart = async (car) => {
    try {
      const engineData = await startCarEngine(car);
      if (engineData) {
        setCarsData((prevData) => ({
          ...prevData,
          [car.id]: {
            ...prevData[car.id],
            distance: engineData.distance,
            velocity: engineData.velocity,
            drive: false,
          },
        }));

        const driveData = await driveCar(car);
        if (driveData?.success) {
          setCarsData((prevData) => ({
            ...prevData,
            [car.id]: { ...prevData[car.id], drive: true },
          }));

          setTimeout(() => {
            setCarsData((prevData) => ({
              ...prevData,
              [car.id]: { ...prevData[car.id], drive: false },
            }));
          }, engineData.distance / engineData.velocity);
        }
      }
    } catch (error) {
      console.error('Error starting car:', error);
    }
  };

  const handleStop = async (car) => {
    setCarsData((prevData) => ({
      ...prevData,
      [car.id]: { ...prevData[car.id], drive: false },
    }));

    try {
      await stopCarEngine(car);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleRandomCarClick = () => {
    dispatch(createRandomCars());
  };

  useEffect(() => {
    dispatch(getCars());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div className={style.btnsContainer}>
        <button onClick={handleStartAll}>Start All</button>
        <button onClick={handleStopAll}>Stop All</button>
        <button onClick={handleRandomCarClick}>Create</button>
      </div>

      {winner && <div className={style.winnerBanner}>🎉 Winner: {winner} 🎉</div>}

      <ul className={style.ul}>
        {cars.map((car) => (
          <div key={car.id} className={style.div}>
            <p>{car.name}</p>

            <li>
              <FaCarSide
                color={car.color}
                className={carsData[car.id]?.drive ? style.carMove : style.carStop && style.car}
                style={{
                  '--race-duration': `${carsData[car.id]?.distance / carsData[car.id]?.velocity || 0}ms`,
                }}
              />
            </li>

            <div className={style.carBtns}>
              <button onClick={() => dispatch(setSelectedCar(car))}>Select</button>
              <button
                onClick={() => {
                  dispatch(deleteCarFromList(car.id));
                }}
              >
                Remove
              </button>
              <button onClick={() => handleStart(car)} disabled={carsData[car.id]?.drive}>
                Start
              </button>
              <button onClick={() => handleStop(car)} disabled={!carsData[car.id]?.drive}>
                Stop
              </button>
            </div>
          </div>
        ))}
      </ul>
    </>
  );
}

export default Garage;
