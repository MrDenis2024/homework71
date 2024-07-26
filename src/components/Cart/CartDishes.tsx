import React from 'react';
import {CartDish} from '../../types';
import {deliveryPrice} from '../../constants';
import CartItem from './CartItem';
import {useAppDispatch} from '../../app/hooks';
import {deleteCartDish} from '../../store/cartSlice';

interface Props {
  cartDishes: CartDish[];
  total: number;
  onClose: VoidFunction;
}

const CartDishes: React.FC<Props> = ({cartDishes, total, onClose}) => {
  const dispatch = useAppDispatch();

  const deleteDish = (dish: CartDish) => {
    dispatch(deleteCartDish(dish));
    if (cartDishes.length === 1 && dish.amount === 1) {
      onClose();
    }
  };

  return (
    <>
      <h1 className='modal-title fs-5 mb-2'>Your order :</h1>
      <div className='mb-4'>
        {cartDishes.map((cartDish) => (
          <CartItem key={cartDish.dish.id} cartDish={cartDish} deleteDish={() => deleteDish(cartDish)}/>
        ))}
      </div>
      <div className='card border-0 p2'>
        <div className='mb-4'>
          <div className='d-flex'>
            <p className='mb-2 col-2'>Delivery:</p>
            <span><strong>{deliveryPrice} KGS</strong></span>
          </div>
          <div className='d-flex'>
            <p className='m-0 col-2'><strong>Total:</strong></p>
            <span><strong>{total + deliveryPrice} KGS</strong></span>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartDishes;