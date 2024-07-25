import {createSlice} from '@reduxjs/toolkit';
import {createDish, deleteDish, fetchDishes, fetchOneDish, updateDish} from './dishesThunks';
import {ApiDish, Dish} from '../types';

interface DishesState {
  createLoading: boolean;
  fetchLoading: boolean;
  deleteLoading: boolean;
  fetchOneLoading: boolean;
  updateLoading: boolean;
  dishes: Dish[];
  dish: null | ApiDish;
}

const initialState: DishesState = {
  createLoading: false,
  fetchLoading: false,
  deleteLoading: false,
  fetchOneLoading: false,
  updateLoading: false,
  dishes: [],
  dish: null,
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

    builder.addCase(fetchOneDish.pending, (state) => {
      state.dish = null;
      state.fetchOneLoading = true;
    }).addCase(fetchOneDish.fulfilled, (state, {payload: dish}) => {
      state.fetchOneLoading = false;
      state.dish = dish;
    }).addCase(fetchOneDish.rejected, (state) => {
      state.fetchOneLoading = false;
    });

    builder.addCase(updateDish.pending, (state) => {
      state.updateLoading = true;
    }).addCase(updateDish.fulfilled, (state) => {
      state.updateLoading = false;
    }).addCase(updateDish.rejected, (state) => {
      state.updateLoading = false;
    });
  },
  selectors: {
    selectCreateDishLoading: (state) => state.createLoading,
    selectFetchDishesLoading: (state) => state.fetchLoading,
    selectDishes: (state) => state.dishes,
    selectDeleteDishLoading: (state) => state.deleteLoading,
    selectFetchOneDishLoading: (state) => state.fetchOneLoading,
    selectUpdateDishLoading: (state) => state.updateLoading,
    selectOneDish: (state) => state.dish,
  }
});

export const dishesReducer = dishesSlice.reducer;
export const {
  selectCreateDishLoading,
  selectFetchDishesLoading,
  selectDishes,
  selectDeleteDishLoading,
  selectFetchOneDishLoading,
  selectUpdateDishLoading,
  selectOneDish,
} = dishesSlice.selectors;