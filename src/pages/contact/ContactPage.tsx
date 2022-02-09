import classNames from 'classnames';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import DateInput from './components/inputs/Date';
import SelectInput from './components/inputs/Select';
import TextInput from './components/inputs/Text'
import Textarea from './components/inputs/Textarea';
import './ContactPage.scss'
import { init, send } from '@emailjs/browser';

interface FormValues {
    name: string;
    entreprise: string;
    mail: string;
    phone: string;
    service: string;
    urlLink: string;
    description: string;
    startDate: string;
    duration: string;
}

interface Props {
    sectionId: number;
}

const durations = [
    "Une semaine",
    "De 1 à 3 mois",
    "De 3 à 6 mois",
    "De 6 mois à 1 an",
    "Plus d'un an"
]

function formatUTCDate(dateString: string) {
    const date = new Date(dateString);

    return `${date.getUTCDate()}/${date.getUTCMonth()}/${date.getUTCFullYear()}`
}

export default function ContactPage(props: Props) {
    const [loading, setLoading] = useState<boolean>(false);
    const [sendSuccess, setSendSuccess] = useState<boolean>(false);
    const [sendError, setSendError] = useState<boolean>(false);

    const { control, handleSubmit, } = useForm<FormValues>({
        mode: 'onChange',
        reValidateMode: 'onChange',
        defaultValues: {
            name: ''
        }
    });

    async function handleSendForm(formValues: FormValues) {
        if (sendSuccess) return;

        setLoading(true);

        try {
            init("user_w2NuYSj9DItfp4VUwBUqY");
            await send("service_290yxnn", "template_v8hjjwm", {
                ...formValues,
                startDate: formatUTCDate(formValues.startDate)
            })
        } catch (error) {
            setSendError(true);
        }

        setLoading(false);
        setSendSuccess(true);
    }

    return (
        <div className='page' id="contact-page" data-sectionid={props.sectionId}>
            <div id="contact-form">
                <TextInput
                    name='name'
                    label='Nom'
                    control={control}
                    icon='fa fa-user'
                    rules={{
                        required: 'Champ obligatoire',
                        maxLength: { value: 164, message: 'Champ limité à 164 caractères.' },
                    }}
                    style={{ gridArea: 'name' }}
                />

                <TextInput
                    name='entreprise'
                    label='Entreprise'
                    control={control}
                    icon='fa fa-building'
                    rules={{
                        required: 'Champ obligatoire',
                        maxLength: { value: 164, message: 'Champ limité à 164 caractères.' },
                    }}
                    style={{ gridArea: 'entreprise' }}
                />

                <TextInput
                    name='mail'
                    label='Email'
                    control={control}
                    icon='fa fa-at'
                    rules={{
                        required: 'Champ obligatoire',
                        maxLength: { value: 164, message: 'Champ limité à 164 caractères.' },
                    }}
                    style={{ gridArea: 'mail' }}
                />

                <TextInput
                    name='phone'
                    label='Téléphone'
                    control={control}
                    icon='fa fa-phone'
                    rules={{
                        required: 'Champ obligatoire',
                    }}
                    style={{ gridArea: 'phone' }}
                />

                <DateInput
                    name='startDate'
                    label='Début de la mission'
                    control={control}
                    icon='fa fa-calendar'
                    type='date'
                    minDate={new Date().toISOString().split('T')[0]}
                    rules={{
                        required: 'Champ obligatoire'
                    }}
                    style={{ gridArea: 'startDate' }}
                />

                <SelectInput
                    name='duration'
                    label='Durée de la mission'
                    control={control}
                    icon='fa fa-clock'
                    values={durations}
                    rules={{
                        required: 'Champ obligatoire',
                    }}
                    style={{ gridArea: 'duration' }}
                />

                <TextInput
                    name='urlLink'
                    label='Lien'
                    control={control}
                    icon='fa fa-link'
                    style={{ gridArea: 'urlLink' }}
                />

                <Textarea
                    name='description'
                    label='Message'
                    type='textarea'
                    control={control}
                    icon='fa fa-comments'
                    rows={window.innerWidth <= 980 ? 8 : 15}
                    rules={{
                        required: 'Champ obligatoire',
                        maxLength: { value: 2000, message: 'Message limité à 2000 caractères.' }
                    }}
                    style={{ gridArea: 'description' }}
                />
            </div>
            <button id="wave-btn" className={classNames({ 'success': sendSuccess, 'error': sendError })} onClick={handleSubmit(handleSendForm)}>
                <i
                    id="icon"
                    className={classNames({
                        'fa': true,
                        'fa-send': !sendError && !sendSuccess && !loading,
                        'success': sendSuccess,
                        'fa-check': sendSuccess,
                        'error': sendError,
                        'fa-times': sendError,
                        'loader': loading,
                    })}
                />
                <h1 id="title">envoyer</h1>
            </button>
        </div>
    )
}
