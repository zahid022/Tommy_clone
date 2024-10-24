import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterState } from '../types/Type';


const initialState: FilterState = {
    priceRange: [0, 1000],
    size:'',
    color: ''
};

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setPriceRange: (state, action: PayloadAction<number[]>) => {
            state.priceRange = action.payload;
        },
        setSize: (state, action: PayloadAction<string>) => {
            state.size = action.payload
        },
        setColor: (state, action: PayloadAction<string>) => {
            state.color = action.payload
        }
    },
});

export const {setPriceRange, setSize, setColor } = filterSlice.actions;

export default filterSlice.reducer;
