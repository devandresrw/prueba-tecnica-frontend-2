import z from 'zod';

export const FormSchema = z.object({
    fullName: z.string()
        .min(10, { message: 'El nombre completo es obligatorio y debe tener al menos 10 caracteres' })
        .max(100, { message: 'El nombre completo no puede tener más de 100 caracteres' }),
    email: z.string()
        .email({ message: 'El correo electrónico no es válido' })
        .regex(/\.edu\.co$/, { message: 'Debe ser tu correo institucional .edu.co' })
        .min(8, { message: 'El correo electrónico es obligatorio y debe tener al menos 8 caracteres' })
        .max(100, { message: 'El correo electrónico no puede tener más de 100 caracteres' }),
    semester: z.coerce
        .number()
        .int()
        .min(1, { message: 'Debe ser al menos 1' })
        .max(10, { message: 'No puede ser mayor que 10' }),
    companion: z.boolean().optional(),
    companionName: z.string()
        .optional()
        .refine((val) => !val || val.length >= 10, { message: 'El nombre del acompañante es obligatorio y debe tener al menos 10 caracteres' })
        .refine((val) => !val || val.length <= 100, { message: 'El nombre del acompañante no puede tener más de 100 caracteres' }),
    terms: z.boolean()
        .refine((val) => val === true, {
            message: 'Debes aceptar los términos y condiciones',
        }),
});

export type FormType = z.infer<typeof FormSchema>;