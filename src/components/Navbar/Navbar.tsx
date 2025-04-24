import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import {
  getCars,
  selectCars,
  selectPage,
  selectTotalCars,
  setPage,
} from '../../features/Cars/CarsSlice.tsx';
import { selectWinners } from '../../features/Winners/WinnersSlice.tsx';
import style from './Navbar.module.css';

function Navbar() {
  const dispatch = useDispatch();
  const location = useLocation();

  const cars = useSelector(selectCars);
  const winners = useSelector(selectWinners);

  const page = useSelector(selectPage);
  const totalCars = useSelector(selectTotalCars);
  const limit = 7;
  const totalPages = Math.ceil(totalCars / limit);

  useEffect(() => {
    dispatch(getCars(page, limit));
  }, [page, dispatch]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      dispatch(setPage(newPage));
      dispatch(getCars(newPage, limit));
    }
  };

  return (
    <div className={style.container}>
      <h1 className={style.p}>
        {location.pathname === '/garage' ? `Garage (${totalCars})` : `Winners (${winners.length})`}
      </h1>
      <div className={style.btnsContainer}>
        <Link to="/garage">
          <button disabled={location.pathname === '/garage'}>Garage</button>
        </Link>
        <Link to="/winners">
          <button disabled={location.pathname === '/winners'}>Winners</button>
        </Link>
      </div>

      {location.pathname === '/garage' && (
        <div>
          <div className={style.btnsContainer}>
            <button disabled={page === 1} onClick={() => handlePageChange(page - 1)}>
              Previous
            </button>
            <button disabled={page === totalPages} onClick={() => handlePageChange(page + 1)}>
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
