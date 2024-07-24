import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectDeleteDishLoading, selectDishes, selectFetchDishesLoading} from '../../store/dishesSlice';
import {useEffect} from 'react';
import {deleteDish, fetchDishes} from '../../store/dishesThunks';
import Spinner from '../Spinner/Spinner';
import DishItem from './DishItem';
import {toast} from 'react-toastify';

const Dishes = () => {
  const dispatch = useAppDispatch();
  const dishes = useAppSelector(selectDishes);
  const dishesLoading = useAppSelector(selectFetchDishesLoading);
  const deleteLoading = useAppSelector(selectDeleteDishLoading);

  useEffect(() => {
    dispatch(fetchDishes());
  }, [dispatch]);

  const removeDish = async (dishId: string) => {
    try {
      if(window.confirm('Вы точно хотите удалить данное блюдо?')) {
        await dispatch(deleteDish(dishId));
        await dispatch(fetchDishes());
        toast.success('Блюдо успешно удалено');
      }
    } catch (e) {
      toast.success('Не удалось удалить данное блюдо');
    }
  };

  return (
    <>
      {dishesLoading ? (
        <div className='text-center'>
          <Spinner />
        </div>
      ) : (
        dishes.map((dish) => (
          <DishItem key={dish.id} dish={dish} onDelete={() => removeDish(dish.id)} deleteLoading={deleteLoading} />
        ))
      )}
    </>
  );
};

export default Dishes;