import React from 'react'
import withInput, { InnerInputProps } from '../Input';

interface OwnProps {
    minDate?: string;
}

type Props = InnerInputProps & OwnProps;

function DateInput(props: Props) {
    return (
        <input
            name={props.name}
            onChange={props.onChange}
            defaultValue={new Date().toLocaleDateString('en-CA')}
            type='date'
            ref={props.inputRef}
            min={props.minDate}
            onFocus={props.handleFocus}
            onBlur={props.handleBlur}
        />
    )
}

export default withInput(DateInput);