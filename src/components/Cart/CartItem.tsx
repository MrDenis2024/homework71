import React from 'react';
import {CartDish} from '../../types';

interface Props {
  cartDish: CartDish;
  deleteDish: VoidFunction;
}

const CartItem: React.FC<Props> = ({cartDish, deleteDish}) => {
  const price = cartDish.dish.price * cartDish.amount;

  return (
    <div className='card mb-2 p-2'>
      <div className='d-flex align-items-center justify-content-between'>
        <div className='col'>{cartDish.dish.title}</div>
        <div className='col-2'>x{cartDish.amount}</div>
        <div className='col-3 text-end'><strong>{price} KGS</strong></div>
        <div className='col-3 text-end'>
          <button className='btn btn-danger' onClick={deleteDish}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;