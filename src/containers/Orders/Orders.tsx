import  {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectDishes, selectFetchDishesLoading} from '../../store/dishesSlice';
import {fetchDishes} from '../../store/dishesThunks';
import {completeOrder, fetchOrders} from '../../store/cartThunks';
import {selectorDeleteOrderLoading, selectorFetchOrdersLoading, selectorOrders,} from '../../store/cartSlice';
import {DishOrder, DishOrders} from '../../types';
import Spinner from '../../components/Spinner/Spinner';
import Order from '../../components/Orders/Order';
import {toast} from 'react-toastify';

const Orders = () => {
  const dispatch = useAppDispatch();
  const dishes = useAppSelector(selectDishes);
  const dishesLoading = useAppSelector(selectFetchDishesLoading);
  const orders = useAppSelector(selectorOrders);
  const ordersLoading = useAppSelector(selectorFetchOrdersLoading);
  const deleteOrderLoading = useAppSelector(selectorDeleteOrderLoading);

  useEffect(() => {
    dispatch(fetchDishes());
    dispatch(fetchOrders());
  }, [dispatch]);

  const combine: DishOrders[] = orders.map(order => {
    const dishesInOrder: DishOrder[] = Object.keys(order.quantities).reduce((acc: DishOrder[], dishId) => {
      const dish = dishes.find(dish => dish.id === dishId);
      if (dish) {
        acc.push({
          ...dish,
          amount: order.quantities[dishId],
        });
      }
      return acc;
    }, []);

    return {
      id: order.id,
      dishes: dishesInOrder,
    };
  });

  const deleteOrder = async (orderId: string) => {
    try {
      if(window.confirm('Вы точто завершили этот заказ?')) {
        await dispatch(completeOrder(orderId)).unwrap();
        await dispatch(fetchOrders());
        toast.success('Вы успешно завершили заказ!');
      }
    } catch (e) {
      toast.error('Произошла ошибка завершеня заказа');
    }
  };

  return (
    <div className='my-4'>
      {dishesLoading && ordersLoading && <div className='text-center'><Spinner /></div>}
      {combine.length > 0 ? (
        <>
          <h1>Orders</h1>
          {combine.map((order) => (
            <Order key={order.id} order={order} completeOrder={() => deleteOrder(order.id)} isLoading={deleteOrderLoading} />
          ))}
        </>
      ) : (<h2 className='text-center'>Заказов нет</h2>)}
    </div>
  );
};

export default Orders;