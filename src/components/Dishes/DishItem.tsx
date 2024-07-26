import React from 'react';
import {Dish} from '../../types';
import {Link, useLocation} from 'react-router-dom';
import ButtonSpinner from '../Spinner/ButtonSpinner';
import {addDish} from '../../store/cartSlice';
import {useAppDispatch} from '../../app/hooks';

interface Props {
  dish: Dish;
  onDelete: VoidFunction;
  deleteLoading: boolean;
}

const DishItem: React.FC<Props> = ({dish, onDelete, deleteLoading,}) => {
  const dispatch = useAppDispatch();
  const {pathname: location} = useLocation();
  const isAdmin = location.startsWith('/admin');

  const addDishToCart = (dish: Dish) => {
    if(!isAdmin) {
      dispatch(addDish(dish));
    }
  };

  return (
    <div className={'card mb-2' + (!isAdmin ? ' card-dish' : '')} onClick={() => addDishToCart(dish)}>
      <div className="card-body d-flex align-items-center justify-content-between">
        <div className={'d-flex align-items-center justify-content-between' + (isAdmin ? ' col-5' : ' col-9 text-center')}>
          <img className="img rounded-4" src={dish.image} alt={dish.title}/>
          <p className="card-title fs-1 col-8 m-0">{dish.title}</p>
        </div>
        <span className='col-2'><strong>{dish.price} KGS</strong></span>
        {isAdmin && (
          <div className='col-2 d-flex align-items-center justify-content-around'>
            <Link className={'btn btn-primary' + (deleteLoading ? ' disabled' : '')}
                  to={`/admin/dishes/edit-dish/${dish.id}`}>{deleteLoading && <ButtonSpinner/>}Edit</Link>
            <button type="button" className="btn btn-danger" onClick={onDelete}>{deleteLoading &&
              <ButtonSpinner/>}Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DishItem;