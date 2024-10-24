import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BasketState, CartUserType } from '../types/Type';

let user = localStorage.getItem("user");
let parsedSebet = user ? JSON.parse(user) : { cart: [] };

const initialState: BasketState = {
    basket: parsedSebet.cart,
    userId: parsedSebet.id,
    flag: false,
    cart: false
};

export const BasketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        setBasket: (state, action: PayloadAction<CartUserType>) => {
            const existingItem = state.basket.find((item) => item.productId === action.payload.productId)

            if (existingItem) {
                state.basket.forEach((item) => {
                    if (item.productId === action.payload.productId) {
                        item.count += action.payload.count
                    }
                })
            } else {
                state.basket.push(action.payload)
            }

            parsedSebet.cart = state.basket
            localStorage.setItem("user", JSON.stringify(parsedSebet))
            state.flag = true
        },
        setCart: (state, action: PayloadAction<boolean>) => {
            state.cart = action.payload
        },
        deleteItem: (state, action: PayloadAction<string>) => {
            state.basket = state.basket.filter((item) => item.productId !== action.payload)
            parsedSebet.cart = state.basket
            localStorage.setItem("user", JSON.stringify(parsedSebet))
            state.flag = true
        }
    },
});

export const { setBasket, setCart, deleteItem } = BasketSlice.actions;

export default BasketSlice.reducer;
