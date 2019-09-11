import { GET_ITEMS, ITEMS_LOADING } from './types';
import axios from 'axios';

export const getItems = () => dispatch => {
    dispatch(setItemsLoading());
    axios
        .get('/api/items') // using the proxy
        .then(res =>
            dispatch({
                type: GET_ITEMS,
                payload: res.data
            })
        )
};

// export const deleteItem = (id) => {
//     return {
//         type:  DELETE_ITEMS,
//         payload: id
//     };
// };

export const setItemsLoading = () => {
    return {
        type: ITEMS_LOADING
    };
};
