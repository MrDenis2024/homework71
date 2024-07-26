import React from 'react';
import {DishOrder} from '../../types';

interface Props {
  dish: DishOrder;
}

const OrderItem: React.FC<Props> = ({dish}) => {

  return (
    <div className='d-flex gap-3'>
      <p className='mb-2 col-5'>
        {dish.amount} x {dish.title}
      </p>
      <span className='col-4'>
        <strong>{dish.amount * dish.price} KGS</strong>
      </span>
    </div>

  );
};

export default OrderItem;