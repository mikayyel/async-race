import { useEffect } from 'react';
import { FaCarSide } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { getCars, selectCars } from '../../features/Cars/CarsSlice';
import { deleteWinner, getWinners, selectWinners } from '../../features/Winners/WinnersSlice';
import style from './Winners.module.css';

function Winners() {
	const winners = useSelector(selectWinners)
	const cars = useSelector(selectCars)
	const dispatch = useDispatch();

	const getWinnerDetails = (winner) => {
    const car = cars.find((car) => car.id === winner.id);
    return car ? { ...winner, name: car.name, color: car.color } : winner;
  };

	useEffect(() => {
		dispatch(getWinners())
		dispatch(getCars())
	}, [dispatch, winners.length, cars.length])
	return (
		<div className={style.div}>
			<table className={style.table}>
				<thead>
					<tr>
						<th className={style.th}>Car</th>
						<th className={style.th}>Name</th>
						<th className={style.th}>Wins</th>
						<th className={style.th}>Time</th>
					</tr>
				</thead>

				<tbody>
					{
						winners.map((winner) => {
							const details = getWinnerDetails(winner)

							return (
								<tr key={winner.id}>
									<th className={style.th}>
										<FaCarSide color={details.color}/>
									</th>
									<th className={style.th}>
										{
											details.name
										}
									</th>
									<th className={style.th}>
										{
											details.wins
										}
									</th>
									<th className={style.th}>
										{
											details.time
										}
									</th>
								</tr>
							)
						})
					}
				</tbody>
			</table>

			<button 
				onClick={(e) => {
					e.preventDefault()
					winners.forEach((winner) => {
						dispatch(deleteWinner(winner.id))
					})
					dispatch(getWinners())
				}}
			>
				delete winners
			</button>
		</div>
	)
}

export default Winners;