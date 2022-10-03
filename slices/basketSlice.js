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
            const index = state.items.findIndex(item => item.id == action.payload.id && item.restaurant_id == action.payload.restaurant_id);
            let tempItems = [...state.items]
            if (index > -1) {
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

export const selectBasketItemsWithRestaurant = (state, restaurant_id) => state.basket.items.filter(item => item.restaurant_id === restaurant_id);

export const selectBasketItemsWithId = (state, id) => state.basket.items.filter(item => item.id === id);

export const selectBasketTotal = (state) => state.basket.items.reduce((prev, curr) => {
    return prev + curr.price
}, 0);

export const selectBasketTotalWithId = (state, restaurant_id) => selectBasketItemsWithRestaurant(state, restaurant_id)
                                                                .reduce((prev, curr) => {
                                                                    return prev + curr.price
                                                                }, 0);
export default basketSlice.reducer