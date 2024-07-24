import {createSlice} from '@reduxjs/toolkit';
import {createDish, deleteDish, fetchDishes} from './dishesThunks';
import {Dish} from '../types';

interface DishesState {
  createLoading: boolean;
  fetchLoading: boolean;
  deleteLoading: boolean;
  dishes: Dish[];
}

const initialState: DishesState = {
  createLoading: false,
  fetchLoading: false,
  deleteLoading: false,
  dishes: [],
};

const dishesSlice = createSlice({
  name: "dishes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createDish.pending, (state) => {
      state.createLoading = true;
    }).addCase(createDish.fulfilled, (state) => {
      state.createLoading = false;
    }).addCase(createDish.rejected, (state) => {
      state.createLoading = false;
    });

    builder.addCase(fetchDishes.pending, (state) => {
      state.fetchLoading = true;
    }).addCase(fetchDishes.fulfilled, (state, {payload: apiDish}) => {
      state.fetchLoading = false;
      state.dishes = apiDish;
    }).addCase(fetchDishes.rejected, (state) => {
      state.fetchLoading = false;
    });

    builder.addCase(deleteDish.pending, (state) => {
      state.deleteLoading = true;
    }).addCase(deleteDish.fulfilled, (state) => {
      state.deleteLoading = false;
    }).addCase(deleteDish.rejected, (state) => {
      state.deleteLoading = false;
    });
  },
  selectors: {
    selectCreateDishLoading: (state) => state.createLoading,
    selectFetchDishesLoading: (state) => state.fetchLoading,
    selectDishes: (state) => state.dishes,
    selectDeleteDishLoading: (state) => state.deleteLoading,
  }
});

export const dishesReducer = dishesSlice.reducer;
export const {
  selectCreateDishLoading,
  selectFetchDishesLoading,
  selectDishes,
  selectDeleteDishLoading,
} = dishesSlice.selectors;