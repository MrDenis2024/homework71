import React from 'react';
import {DishOrders} from '../../types';
import OrderItem from './OrderItem';
import {deliveryPrice} from '../../constants';
import ButtonSpinner from '../Spinner/ButtonSpinner';

interface Props {
  order: DishOrders;
  completeOrder: VoidFunction;
  isLoading: boolean;
}

const Order: React.FC<Props> = ({order, completeOrder, isLoading}) => {
  const total = order.dishes.reduce((sum, dish) => {
    return sum + dish.amount * dish.price;
  }, 0);

  return (
    <div className='border rounded-4 p-3 mb-3'>
      <div className='d-flex justify-content-between'>
        <div className='col-9'>
          {order.dishes.map((dish) => (
            <OrderItem key={dish.id} dish={dish}/>
          ))}
          <div className='d-flex gap-3'>
            <p className="mb-0 col-5">Delivery:</p>
            <span className='col-4'><strong>{deliveryPrice} KGS</strong></span>
          </div>
        </div>
        <div className='d-flex flex-column col-3'>
          <div className='mb-2'>
            <p className="mb-1">Order total:</p>
            <span><strong>{total + deliveryPrice} KGS</strong></span>
          </div>
          <button className="btn btn-success col-9" onClick={completeOrder} disabled={isLoading}>{isLoading && <ButtonSpinner />}Complete order</button>
        </div>
      </div>
    </div>
  );
};

export default Order;