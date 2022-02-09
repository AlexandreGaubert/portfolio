import classNames from 'classnames';
import React, { useRef, useState } from 'react';
import { Controller, ControllerProps, ControllerRenderProps } from 'react-hook-form';
import './Input.scss';

interface InputBaseProps {
    name: string;
    label: string;
    control: ControllerProps<any, any>['control'];
    rules?: ControllerProps['rules']
    icon: string;
    style?: React.CSSProperties;
    type?: React.InputHTMLAttributes<any>['type']
}

export interface InnerInputProps extends ControllerRenderProps<any, string> {
    inputRef: React.MutableRefObject<any>;
    handleFocus: () => void;
    handleBlur: () => void;
}

export default function withInput<OwnProps>(Input: React.ComponentType<OwnProps & InnerInputProps>) {
    return (props: OwnProps & InputBaseProps) => {
        const [focus, setFocus] = useState<boolean>(false);

        const inputRef = useRef<any>(null);

        function handleDivFocus() {
            inputRef?.current?.focus()
        }

        function handleFocus() {
            setFocus(true);
        }

        function handleBlur(onBlur: () => void) {
            setFocus(false);
            onBlur();
        }

        return (
            <Controller
                name={props.name}
                control={props.control}
                rules={props.rules}
                render={({ field, fieldState }) => {
                    const valid = field.value && !fieldState.error && fieldState.isTouched;

                    return (
                        <div
                            style={props.style}
                            tabIndex={0}
                            onFocus={handleDivFocus}
                            onBlur={() => handleBlur(field.onBlur)}
                            className={classNames({
                                'input': true,
                                'focused': focus,
                                'error': !!fieldState.error,
                                'valid': valid,
                            })}
                        >
                            <i className={`${props.icon} input-icon`} />
                            <div>
                                <label>{props.label}</label>
                                <Input
                                    {...field}
                                    {...props}
                                    inputRef={inputRef}
                                    handleBlur={() => handleBlur(field.onBlur)}
                                    handleFocus={handleFocus}
                                />
                            </div>
                            <span className={classNames({
                                'status-icon': true,
                                'error': !!fieldState.error,
                                'valid': valid
                            })}>
                                {valid && <i className='fa fa-check' />}
                                {!!fieldState.error && <i className='fa fa-exclamation' />}
                                {!!fieldState.error && <span className="error-message">{fieldState.error.message}</span>}
                            </span>
                        </div>
                    )
                }}
            />
        );
    }
}
