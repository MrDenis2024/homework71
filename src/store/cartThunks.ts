import {createAsyncThunk} from '@reduxjs/toolkit';
import {ApiOrder, ApiOrders, OrderMutation,} from '../types';
import {RootState} from '../app/store';
import axiosApi from '../axiosApi';

export const createOrder = createAsyncThunk<void, ApiOrder, {state: RootState}>('cart/createCart', async (apiOrder) => {
  await axiosApi.post('/turtleOrder.json', apiOrder);
});

export const fetchOrders = createAsyncThunk<OrderMutation[], void, {state: RootState}>('cart/fetchOrders', async () => {
  const {data: ordersResponse} = await axiosApi.get<ApiOrders | null>('/turtleOrder.json');

  if(!ordersResponse) {
    return [];
  }

  return Object.keys(ordersResponse).map((id) => {
    return {
      quantities: ordersResponse[id],
      id,
    };
  });
});

export const completeOrder = createAsyncThunk<void, string,  {state: RootState}>('cart/completeOrder', async (orderId) => {
  await axiosApi.delete(`/turtleOrder/${orderId}.json`);
});