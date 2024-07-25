import {useNavigate, useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectFetchOneDishLoading, selectOneDish, selectUpdateDishLoading} from '../../store/dishesSlice';
import {useEffect} from 'react';
import {fetchOneDish, updateDish} from '../../store/dishesThunks';
import {ApiDish} from '../../types';
import {toast} from 'react-toastify';
import Spinner from '../../components/Spinner/Spinner';
import DishForm from '../../components/DishForm/DishForm';

const EditDish = () => {
  const {id} = useParams() as {id: string};
  const dispatch = useAppDispatch();
  const dish = useAppSelector(selectOneDish);
  const isFetching = useAppSelector(selectFetchOneDishLoading);
  const isUpdating = useAppSelector(selectUpdateDishLoading);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchOneDish(id));
  }, [dispatch, id]);

  const onSubmit = async (apiDish: ApiDish) => {
    try {
      await dispatch(updateDish({id, apiDish})).unwrap();
      navigate('/admin');
      toast.success('Блюдо успешно обновлено');
    } catch (e) {
      toast.error('Произошла ошибка обновления блюда');
    }
  };
  return (
    <>
      {isFetching && <div className='text-center'><Spinner /></div>}
      {dish && (
        <DishForm onSubmit={onSubmit} isLoading={isUpdating} existingDish={dish}/>
      )}
    </>
  );
};

export default EditDish;