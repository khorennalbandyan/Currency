import React from 'react'

const fromCurrency = (props) => {
    const {currency} = props
    return (
        <option>
            {currency}
        </option>
    )
}

export default fromCurrency