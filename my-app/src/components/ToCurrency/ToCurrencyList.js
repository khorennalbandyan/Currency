import React from 'react';
import ToCurrency from './ToCurrency'
import SelectCurrency from '../SelectCurrency/SelectCurrency'

const toCurrencyList = (props) => {
    const { currency } = props
    const ToCurrencyList = currency.map((item, index) => {
        return <ToCurrency currency={item} key={index} />
    })
    return (
        <SelectCurrency onChange={(value) => props.onChange(value)}>
            {ToCurrencyList}
        </SelectCurrency>
    )
}

export default toCurrencyList