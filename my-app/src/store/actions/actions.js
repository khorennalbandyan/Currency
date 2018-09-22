import axios from 'axios';

export const GETDATA = 'GETDATA'
export const GETANSWEAR = 'GETANSWEAR'
export const GETFULLLIST = 'GETFULLLIST'
export const MAKEFAVORITE = 'MAKEFAVORITE'
export const FILTER = 'FILTER'

const PATH = 'http://192.168.0.110:3000/'

export const loadData = () => {
    return (dispatch) => {
        axios.get(`${PATH}getcurrencylist`)
            .then(response => {
                dispatch(getData(response))
            })
    }
}

export const loadAnswear = (from="BTC",to="USD") => {
    return (dispatch) => {
        axios.get(`${PATH}getcurrencyexchange/${from}/${to}`)
            .then(response => {
                dispatch(getAnswear(response))
            })
    }
}

export const loadAllData = () => {
    return (dispatch) => {
        axios.get(`${PATH}getallexchanges`)
            .then(response => {
                let transformedCurrency = []
                    for (let fromCurrency in response.data) {
                        let rates = []
                        for (let toCurrency in response.data[fromCurrency]) {
                            rates.push({
                                data: response.data[fromCurrency][toCurrency],
                                title: toCurrency
                            })
                        }
                        transformedCurrency.push({
                            data: rates,
                            title: fromCurrency,
                            favorite: false
                        })
                    }
                dispatch(getFullList(transformedCurrency))
            })
    }
}



export const getData = (response) => {
    return {
        type: GETDATA, 
        data: response
    }
}

export const getAnswear = (response) => {
    return {
        type: GETANSWEAR,
        answer: response.data.result
    }
}

export const getFullList = (response) => {
    return {
        type: GETFULLLIST,
        fullList: response
    }
}

export const makeFavorite = (index) => {
        return {
            type: MAKEFAVORITE,
            payload: index
        }
}




