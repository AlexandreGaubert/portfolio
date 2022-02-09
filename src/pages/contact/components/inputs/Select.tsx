import classNames from 'classnames';
import React, { useState } from 'react'
import useClickOutside from '../../../../utils/hooks/useClickOutside';
import withInput, { InnerInputProps } from '../Input';

interface OwnProps {
    values: any[];
}

type Props = InnerInputProps & OwnProps;

function SelectInput(props: Props) {
    const [open, setOpen] = useState(false);
    useClickOutside(props.inputRef, () => setOpen(false));

    function handleChange(event: React.MouseEvent<HTMLOptionElement>) {
        const value = event.currentTarget.value;

        props.onChange(value);
    }

    function toggleOpen() {
        setOpen(op => !op)
    }

    return (
        <div
            ref={props.inputRef}
            onFocus={props.handleFocus}
            onBlur={props.handleBlur}
            className='select'
            onClick={toggleOpen}
        >
            <span>{props.value}</span>
            <i
                className={classNames({
                    'fa fa-chevron-down': true,
                    'toggler': true,
                    'open': open
                })}
            />
            <div className={classNames({ open, 'menu-list': true })}>
                {props.values?.map(val =>
                    <option
                        onClick={handleChange}
                        value={val}
                        key={val}
                    >
                        {val}
                    </option>
                )}
            </div>
        </div>
    )
}

export default withInput<OwnProps>(SelectInput);