import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCarToList, getCars, selectSelectedCar, setSelectedCar, updateCarInList } from '../../features/Cars/CarsSlice';

function AddOrUpdateCar() {
	const dispatch = useDispatch();
	const selectedCar = useSelector(selectSelectedCar);

	const [newCarName, setNewCarName] = useState('')
	const [newCarColor, setNewCarColor] = useState('#000000')
	const [updateCarName, setUpdateCarName] = useState('')
	const [updateCarColor, setUpdateCarColor] = useState('#000000')
	const [isDisabled, setIsDisabled] = useState(true)
	
	return (
		<div>
			<h1>ASYNC-RACE</h1>
			
			<form>
				<input 
					type="text" 
					value={newCarName}
					onChange={(e) => {
						e.preventDefault()
						setNewCarName(e.target.value)
					}}
				/>
				<input 
					type="color"
					value={newCarColor}
					onChange={(e) =>{
						e.preventDefault()
						setNewCarColor(e.target.value)
					}}
				/>
				<button
					onClick={(e) => {
						e.preventDefault()
						console.log(newCarName, newCarColor)
						dispatch(addCarToList({name: newCarName, color:newCarColor}))
						dispatch(getCars())
						setNewCarName('')
						setNewCarColor('#000000')
					}}
				>Create</button>
			</form>

			<form>
				<input 
					type="text"
					value={updateCarName}
					disabled={!selectedCar}
					onChange={(e) => {
						e.preventDefault()
						setUpdateCarName(e.target.value)
					}}
				/>
				<input 
					type="color"
					value={updateCarColor}
					disabled={!selectedCar}
					onChange={(e) => {
						e.preventDefault()
						setUpdateCarColor(e.target.value)
					}}
				/>
				<button
					disabled={!selectedCar}
					onClick={(e) => {
						e.preventDefault()
						dispatch(updateCarInList({
							id:selectedCar.id, 
							name: updateCarName ? updateCarName : selectedCar.name, 
							color: updateCarColor ? updateCarColor : selectedCar.color,
						}))
						dispatch(setSelectedCar(null))
						console.log(updateCarName, updateCarColor)
						setUpdateCarName('')
						setUpdateCarColor('#000000')
					}}
				>Update</button>
			</form>
		</div>
	)
}

export default AddOrUpdateCar;