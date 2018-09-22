import React from 'react'

const toCurrency = (props) => {
    const {currency} = props
    return (
        <option>
            {currency}
        </option>
    )
}

export default toCurrency