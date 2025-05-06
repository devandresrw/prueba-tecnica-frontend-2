import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { FormSchema, FormType } from '@/schemas/form.schema';

export const useHandleForm = () => {
    const [companion, setCompanion] = useState(false);
    const INITIAL_STATE: FormType = {
        fullName: '',
        email: '',
        semester: 1,
        companion: false,
        companionName: '',
        terms: false,
    };

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting, isValidating },
        reset,
    } = useForm<FormType>({
        resolver: zodResolver(FormSchema),
        mode: 'onChange', // Valida en cada cambio
        reValidateMode: 'onChange',
        defaultValues: INITIAL_STATE,
    });

    const onSubmit = (data: FormType) => {
        console.log(data);
    };

    return {
        companion,
        setCompanion,
        onSubmit,
        handleSubmit,
        register,
        errors,
        isSubmitting,
        isValidating,
        reset,
    };
};