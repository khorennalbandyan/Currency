import React from 'react';
import FromCurrency from './FromCurrency'
import SelectCurrency from '../SelectCurrency/SelectCurrency'

const fromCurrencyList = (props) => {
    const { currency } = props
    const FromCurrencyList = currency.map((item, index) => {
        return <FromCurrency currency={item} key={index} />
    })
    return (
        <SelectCurrency onChange={(value) => props.onChange(value)}>
            {FromCurrencyList}
        </SelectCurrency>
    )
}

export default fromCurrencyList