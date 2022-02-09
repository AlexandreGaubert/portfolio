import React from 'react'
import withInput, { InnerInputProps } from '../Input';

interface OwnProps {
    rows?: number;
}

type Props = InnerInputProps & OwnProps;

function Textarea(props: Props) {
    return (
        <textarea
            name={props.name}
            onChange={props.onChange}
            ref={props.inputRef}
            onFocus={props.handleFocus}
            onBlur={props.handleBlur}
            rows={props.rows}
            draggable={false}
        />
    )
}

export default withInput(Textarea);