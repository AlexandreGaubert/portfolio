import React from 'react'
import withInput, { InnerInputProps } from '../Input';

function Text(props: InnerInputProps) {
    return (
        <input
            name={props.name}
            onChange={props.onChange}
            type='text'
            ref={props.inputRef}
            onFocus={props.handleFocus}
            onBlur={props.handleBlur}
        />
    )
}

export default withInput(Text);