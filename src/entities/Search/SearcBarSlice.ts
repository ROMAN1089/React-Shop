import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import axios from 'axios';

interface SearchState {
  searchTerm: string;
  selectedCategory: string;
  categories: string[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: SearchState = {
  searchTerm: '',
  selectedCategory: 'all',
  categories: [],
  status: 'idle',
};

export const fetchCategories = createAsyncThunk(
  'search/fetchCategories',
  async () => {
    const response = await axios.get('https://fakestoreapi.com/products/categories');
    return response.data;
  }
);

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload;
    },
    setSelectedCategory(state, action: PayloadAction<string>) {
      state.selectedCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'idle';
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { setSearchTerm, setSelectedCategory } = searchSlice.actions;

export const selectSearchTerm = (state: RootState) => state.search.searchTerm;
export const selectSelectedCategory = (state: RootState) => state.search.selectedCategory;
export const selectCategories = (state: RootState) => state.search.categories;
export const selectStatus = (state: RootState) => state.search.status;

export default searchSlice.reducer;
