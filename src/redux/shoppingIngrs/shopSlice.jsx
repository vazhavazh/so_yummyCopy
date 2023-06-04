import { createSlice } from '@reduxjs/toolkit';
import { fetchAllShoppingIngredients } from './shopThunks';
import { fetchAddShoppingIngredients } from './shopThunks';
import { fetchDeleteShoppingIngredients } from './shopThunks';
import { fetchAllCategories } from './shopThunks';
import { fetchUpdateShoppingIngredients } from './shopThunks';

const initialState = {
  shoppingIngredients: [],
  isLoading: true,
  error: null,
};

export const shoppingIngredientsSlice = createSlice({
  name: 'shoppingIngredients',
  initialState,
  reducers: {
    clearShoppingIngredientsState() {
      return initialState;
    },
  },
  extraReducers: builder => {
    builder

      .addCase(fetchAllShoppingIngredients.fulfilled, (state, action) => {
        state.shoppingIngredients = action.payload;
      })

      .addCase(fetchAddShoppingIngredients.fulfilled, (state, action) => {
        state.shoppingIngredients.push(action.payload);
      })

      .addCase(fetchDeleteShoppingIngredients.fulfilled, (state, action) => {
        const index = state.shoppingIngredients.findIndex(
          transaction => transaction.id === action.payload
        );
        state.shoppingIngredients.splice(index, 1);
      })

      .addCase(fetchAllCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })

      .addCase(fetchUpdateShoppingIngredients.fulfilled, (state, action) => {
        const index = state.shoppingIngredients.findIndex(
          transaction => transaction.id === action.payload.id
        );
        if (index >= 0) {
          state.shoppingIngredients[index] = action.payload;
        }
      })

      .addMatcher(
        action => action.type.endsWith('/pending'),
        (state, action) => {
          state.isLoading = true;
          state.error = null;
        }
      )

      .addMatcher(
        action => action.type.endsWith('/rejected'),
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload ? action.payload : null;
        }
      )
      .addMatcher(
        action => action.type.endsWith('/fulfilled'),
        (state, action) => {
          state.error = null;
          state.isLoading = false;
        }
      );
  },
});

export const { clearShoppingIngredientsState, updateMonth, updateYear } =
  shoppingIngredientsSlice.actions;
export const ShoppingIngredientsReducer = shoppingIngredientsSlice.reducer;
