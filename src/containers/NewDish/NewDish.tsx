import DishForm from '../../components/DishForm/DishForm';
import {useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectCreateDishLoading} from '../../store/dishesSlice';
import {ApiDish} from '../../types';
import {createDish} from '../../store/dishesThunks';
import {toast} from 'react-toastify';

const NewDish = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isCreating = useAppSelector(selectCreateDishLoading);

  const onSubmit = async (dish: ApiDish) => {
    try {
      await dispatch(createDish(dish)).unwrap();
      navigate('/admin');
      toast.success('Блюдо успешно созданно!');
    } catch (e) {
      toast.error('Произошла ошибка при создании блюда');
    }
  };

  return (
    <>
      <DishForm onSubmit={onSubmit} isLoading={isCreating} />
    </>
  );
};

export default NewDish;