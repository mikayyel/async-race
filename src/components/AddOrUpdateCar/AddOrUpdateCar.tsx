import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addCarToList,
  getCars,
  selectSelectedCar,
  setSelectedCar,
  updateCarInList,
} from '../../features/Cars/CarsSlice.tsx';
import style from './AddOrUpdateCar.module.css';

function AddOrUpdateCar() {
  const dispatch = useDispatch();

  const selectedCar = useSelector(selectSelectedCar);

  const [newCarName, setNewCarName] = useState('');
  const [newCarColor, setNewCarColor] = useState('#000000');
  const [updateCarName, setUpdateCarName] = useState('');
  const [updateCarColor, setUpdateCarColor] = useState('#000000');

  useEffect(() => {
    if (selectedCar) {
      setUpdateCarName(selectedCar.name);
      setUpdateCarColor(selectedCar.color);
    }
  }, [selectedCar]);

  return (
    <div className={style.container}>
      <h1 className={style.h1}>ASYNC-RACE</h1>

      <form className={style.form}>
        <input
          type="text"
          value={newCarName}
          className={style.input}
          onChange={(e) => {
            setNewCarName(e.target.value);
          }}
        />
        <input
          type="color"
          value={newCarColor}
          className={style.colorInput}
          onChange={(e) => {
            setNewCarColor(e.target.value);
          }}
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            if (newCarName) {
              dispatch(addCarToList({ name: newCarName, color: newCarColor }));
              dispatch(getCars());
              setNewCarName('');
              setNewCarColor('#000000');
            }
            return;
          }}
        >
          Create
        </button>
      </form>

      <form className={style.form}>
        <input
          type="text"
          value={updateCarName}
          disabled={!selectedCar}
          className={style.input}
          onChange={(e) => {
            setUpdateCarName(e.target.value);
          }}
        />
        <input
          type="color"
          value={updateCarColor}
          disabled={!selectedCar}
          className={style.colorInput}
          onChange={(e) => {
            setUpdateCarColor(e.target.value);
          }}
        />
        <button
          disabled={!selectedCar}
          onClick={(e) => {
            e.preventDefault();
            dispatch(
              updateCarInList({
                id: selectedCar.id,
                name: updateCarName ? updateCarName : selectedCar.name,
                color: updateCarColor ? updateCarColor : selectedCar.color,
              })
            );
            dispatch(setSelectedCar(null));
            setUpdateCarName('');
            setUpdateCarColor('#000000');
          }}
        >
          Update
        </button>
      </form>
    </div>
  );
}

export default AddOrUpdateCar;
