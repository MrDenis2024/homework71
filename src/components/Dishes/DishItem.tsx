import React from 'react';
import {Dish} from '../../types';
import {Link} from 'react-router-dom';

interface Props {
  dish: Dish;
}

const DishItem: React.FC<Props> = ({dish}) => {
  return (
    <div className="card mb-2" >
      <div className="card-body d-flex align-items-center justify-content-between">
        <div className='col-5 d-flex align-items-center justify-content-between'>
          <img className="img rounded-4" src={dish.image} alt={dish.title}/>
          <h5 className="card-title fs-1 col-6 m-0">{dish.title}</h5>
        </div>
        <span><strong>{dish.price} KGS</strong></span>
        <div className='col-2 d-flex align-items-center justify-content-around'>
          <Link className="btn btn-primary" to={`/admin/edit-dish/${dish.id}`}>Edit</Link>
          <button type="button" className="btn btn-danger">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default DishItem;