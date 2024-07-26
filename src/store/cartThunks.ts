import {createAsyncThunk} from '@reduxjs/toolkit';
import {ApiOrder} from '../types';
import {RootState} from '../app/store';
import axiosApi from '../axiosApi';

export const createOrder = createAsyncThunk<void, ApiOrder, {state: RootState}>('dishes/createDish', async (apiOrder) => {
  await axiosApi.post('/turtleOrder.json', apiOrder);
});