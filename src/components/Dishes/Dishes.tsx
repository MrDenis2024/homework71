import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectDishes, selectFetchDishesLoading} from '../../store/dishesSlice';
import {useEffect} from 'react';
import {fetchDishes} from '../../store/dishesThunks';
import Spinner from '../Spinner/Spinner';
import DishItem from './DishItem';

const Dishes = () => {
  const dispatch = useAppDispatch();
  const dishes = useAppSelector(selectDishes);
  const dishesLoading = useAppSelector(selectFetchDishesLoading);

  useEffect(() => {
    dispatch(fetchDishes());
  }, [dispatch]);

  return (
    <>
      {dishesLoading ? (
        <div className='text-center'>
          <Spinner />
        </div>
      ) : (
        dishes.map((dish) => (
          <DishItem key={dish.id} dish={dish} />
        ))
      )}
    </>
  );
};

export default Dishes;