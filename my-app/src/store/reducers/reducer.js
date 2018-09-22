import * as actionTypes from '../actions/actions'

if(!window.localStorage.getItem('favorites') ) {
    window.localStorage.setItem('favorites',[])
}
const initialState = {
    data: [],
    favorite: window.localStorage.getItem('favorites').split(',')
}


const getDataReducer = (state=initialState, action) => {
    switch(action.type) {
        case actionTypes.GETDATA: 
        return {
            ...state,
            data: action.data
        }
        case actionTypes.GETANSWEAR: 
        return {
            ...state,
            answer: action.answer
        }
        case actionTypes.GETFULLLIST:
        return{
            ...state,
            fullList: action.fullList
        }
        case actionTypes.MAKEFAVORITE:
        let favorites = [...state.favorite];
        if(!favorites.includes(action.payload)) {
            favorites.push(action.payload)
        }else{
            favorites=favorites.filter((item,index)=> {
                return item !== action.payload;
            })
        }
        console.log('vvvvvvv',favorites )
        window.localStorage.setItem('favorites',favorites)
        return {
            ...state,
            favorite: favorites
        }
    }
    return state
}

export default getDataReducer