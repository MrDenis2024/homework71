import {createAsyncThunk} from '@reduxjs/toolkit';
import {ApiDish, Dish} from '../types';
import axiosApi from '../axiosApi';
import {RootState} from '../app/store';

export const createDish = createAsyncThunk<void, ApiDish, {state: RootState}>('dishes/createDish', async (apiDish) => {
  await axiosApi.post('/turtlePizza.json', apiDish);
});

export const fetchDishes = createAsyncThunk<Dish[], void, {state: RootState}>('dishes/fetchDishes', async () => {
  const {data: dishesResponse} = await axiosApi.get('/turtlePizza.json');

  if(dishesResponse === null) {
    return [];
  }

  return Object.keys(dishesResponse).map((id: string) => {
    return {
      ...dishesResponse[id],
      id,
    };
  });
});