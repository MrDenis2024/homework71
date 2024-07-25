import React, {useState} from 'react';
import {ApiDish, DishMutation} from '../../types';
import ButtonSpinner from '../Spinner/ButtonSpinner';

interface Props {
  onSubmit: (dish: ApiDish) => void;
  isLoading: boolean;
  existingDish? : ApiDish;
}

const emptyState: DishMutation = {
  title: '',
  price: '',
  image: '',
};

const DishForm: React.FC<Props> = ({onSubmit, isLoading, existingDish}) => {
  const initialState: DishMutation = existingDish ? ({...existingDish, price: existingDish.price.toString()}) : emptyState;
  const [dishMutation, setDishMutation] = useState<DishMutation>(initialState);

  const changeDish = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;

    setDishMutation((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit({
      ...dishMutation,
      price: parseFloat(dishMutation.price),
    });
  };

  return (
    <form className='border rounded border-black my-4 p-3' onSubmit={onFormSubmit} >
      <h4>New dish</h4>
      <div className='form-group mb-3'>
        <label htmlFor='title'>Title</label>
        <input type="text" name="title" id="title" className='form-control' onChange={changeDish}
               value={dishMutation.title} required/>
      </div>
      <div className='form-group mb-3'>
        <label htmlFor='price'>Price</label>
        <input type="number" name="price" id="price" className='form-control' onChange={changeDish}
               value={dishMutation.price} required min='1'/>
      </div>
      <div className='form-group mb-3'>
        <label htmlFor='image'>Image</label>
        <input type="url" name="image" id="image" className='form-control' onChange={changeDish}
               value={dishMutation.image} required/>
      </div>
      <button type='submit' className='btn btn-primary mt-2' disabled={isLoading}>{isLoading && <ButtonSpinner />}Save</button>
    </form>
  );
};

export default DishForm;