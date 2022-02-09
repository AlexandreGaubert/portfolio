import React, { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';
import { Service } from '../../ServicesPage';
import './Service.scss';

interface ServiceProps extends Service {
    id: string;
    gotToContact: () => void;
}

export default function ServiceComponent(props: ServiceProps) {
    const [isVisible, setIsVisible] = useState<boolean>(false);

    function handleIntersection(entries: IntersectionObserverEntry[], observer: IntersectionObserver) {
        setIsVisible(entries[0]?.isIntersecting);
    }

    const initObserver = useCallback(() => {
        const element = document.getElementById(props.id);
        const observer = new IntersectionObserver(handleIntersection, { threshold: 0.2 });

        if (element)
            observer.observe(element);
    }, [props.id])

    useEffect(() => {
        initObserver();
    }, [initObserver])

    return (
        <div
            className={classNames({
                service: true,
                visible: isVisible
            })}
            id={props.id}
        >
            <span className='service-icon'>{props.icon}</span>
            <span className='service-title'>{props.title}</span>
            <span className='service-separator' />
            <p className='service-description'>{props.description}</p>
            <div className="service-action-btn" onClick={props.gotToContact}>
                <i className="fa fa-send" />
                me contacter
            </div>
        </div>
    );
}