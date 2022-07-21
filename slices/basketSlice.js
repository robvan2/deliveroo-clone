import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    items: [],
}

export const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        addToBasket: (state, action) => {
            state.items = [...state.items, action.payload]
        },
        removeFromBasket: (state, action) => {
            /* Don't manipulate the state directly */
            const index = state.items.findIndex(item => item.id == action.payload.id);
            let tempItems = [...state.items]
            if(index > -1) {
                tempItems.splice(index, 1);
                state.items = [...tempItems];
            }
        },
        clearBasket: (state) => {
            state.items = []
        }
    }
})

export const { addToBasket, removeFromBasket, clearBasket } = basketSlice.actions

export const selectBasketItems = (state) => state.basket.items;

export const selectBasketItemsWithId = (state, id) => state.basket.items.filter( item => item.id === id);

export default basketSlice.reducer