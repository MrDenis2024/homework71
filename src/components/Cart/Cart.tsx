import {useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {clearCart, selectorCartDishes, selectorCreateOrder} from '../../store/cartSlice';
import Modal from '../Modal/Modal';
import CartDishes from './CartDishes';
import {ApiOrder} from '../../types';
import {createOrder} from '../../store/cartThunks';
import {toast} from 'react-toastify';
import ButtonSpinner from '../Spinner/ButtonSpinner';

const Cart = () => {
  const dispatch = useAppDispatch();
  const orderLoading = useAppSelector(selectorCreateOrder);
  const cartDishes = useAppSelector(selectorCartDishes);
  const [showModal, setShowModal] = useState(false);

  const total = cartDishes.reduce((sum, cartDish) => {
    return sum + cartDish.amount * cartDish.dish.price;
  }, 0);

  const onSubmitCart = async () => {
    const order = cartDishes.reduce<ApiOrder>((acc, cartDish) => {
      acc[cartDish.dish.id] = cartDish.amount;
      return acc;
    }, {});

    try {
      await dispatch(createOrder(order)).unwrap();
      setShowModal(false);
      dispatch(clearCart());
      toast.success('Заказ успешно отправлен');
    } catch (e) {
      toast.error('Произошла ошибка отправки заказа');
    }
  };

  let cart = (
    <div className='text-center'>
      Cart is empty! Add something!
    </div>
  );

  if(cartDishes.length > 0) {
    cart = (
      <div className='d-flex align-items-center justify-content-between'>
        <div className='d-flex'>
          <p className="m-0">Order total: </p>
          <span className='ms-2'><strong>{total}</strong> KGS</span>
        </div>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>Checkout</button>
      </div>
    );
  }

  return (
    <>
      {cart}
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <div className='modal-body'>
          <CartDishes cartDishes={cartDishes} total={total} onClose={() => setShowModal(false)}/>
        </div>
        <div className='modal-footer d-flex justify-content-between'>
          <button className='btn btn-success col-5' disabled={orderLoading} onClick={onSubmitCart}>{orderLoading && <ButtonSpinner />}Order</button>
          <button className='btn btn-danger col-5' disabled={orderLoading} onClick={() => setShowModal(false)}>{orderLoading && <ButtonSpinner />}Cancel</button>
        </div>
      </Modal>
    </>
  );
};

export default Cart;