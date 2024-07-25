import {createAsyncThunk} from '@reduxjs/toolkit';
import {ApiDish, ApiDishes, Dish} from '../types';
import axiosApi from '../axiosApi';
import {RootState} from '../app/store';

export const createDish = createAsyncThunk<void, ApiDish, {state: RootState}>('dishes/createDish', async (apiDish) => {
  await axiosApi.post('/turtlePizza.json', apiDish);
});

export const fetchDishes = createAsyncThunk<Dish[], void, {state: RootState}>('dishes/fetchDishes', async () => {
  const {data: dishesResponse} = await axiosApi.get<ApiDishes | null>('/turtlePizza.json');

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

export const deleteDish = createAsyncThunk<void, string, {state: RootState}>('dishes/deleteDish', async (dishId) => {
  await axiosApi.delete(`/turtlePizza/${dishId}.json`);
});

export const fetchOneDish = createAsyncThunk<ApiDish, string, {state: RootState}>('dishes/fetchOneDish', async (id) => {
  const {data: dish} = await axiosApi.get<ApiDish | null>(`/turtlePizza/${id}.json`);

  if(dish === null) {
    throw new Error('Not found');
  }

  return dish;
});

export interface UpdateDishArg {
  id: string;
  apiDish: ApiDish
}

export const updateDish = createAsyncThunk<void, UpdateDishArg, {state: RootState}>('dishes/updateDish', async ({id, apiDish}) => {
  await axiosApi.put(`/turtlePizza/${id}.json`, apiDish);
});