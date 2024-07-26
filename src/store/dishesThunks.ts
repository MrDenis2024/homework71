import {createAsyncThunk} from '@reduxjs/toolkit';
import {ApiDish, ApiDishes, Dish} from '../types';
import axiosApi from '../axiosApi';
import {AppDispatch, RootState} from '../app/store';
import {updateDishes} from './cartSlice';

export const createDish = createAsyncThunk<void, ApiDish, {state: RootState}>('dishes/createDish', async (apiDish) => {
  await axiosApi.post('/turtlePizza.json', apiDish);
});

export const fetchDishes = createAsyncThunk<Dish[], void, {dispatch: AppDispatch}>('dishes/fetchDishes', async (_args, thunkAPI) => {
  const {data: dishesResponse} = await axiosApi.get<ApiDishes | null>('/turtlePizza.json');

  let newDishes: Dish[] = [];

  if(dishesResponse) {
    newDishes = Object.keys(dishesResponse).map((id: string) => {
      return {
        ...dishesResponse[id],
        id,
      };
    });
  }

  thunkAPI.dispatch(updateDishes(newDishes));
  return newDishes;
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