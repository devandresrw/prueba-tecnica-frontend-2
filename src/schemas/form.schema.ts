import { z } from 'zod';

export const FormSchema = z.object({
    fullName: z.string()
        .min(10, { message: 'El nombre completo es obligatorio' })
        .max(50, { message: 'Solo nombres y apellidos' }),
    email: z.string()
        .email({ message: 'El correo electrónico no es válido' })
        .regex(/\.edu\.co$/, { message: 'Debe ser tu correo institucional .edu.co' })
        .min(8, { message: 'Debe tener al menos 8 caracteres' })
        .max(50, { message: 'No puede tener más de 50 caracteres' }),
    semester: z.coerce
        .number()
        .int()
        .min(1, { message: 'Debe ser al menos 1' })
        .max(10, { message: 'No puede ser mayor que 10' }),
    companion: z.boolean().optional().default(false),
    companionName: z.string().optional(),
    terms: z.boolean()
        .refine((val) => val === true, {
            message: 'Debes aceptar los términos y condiciones',
        }),
}).superRefine((data, ctx) => {
    // Validación condicional: si companion está marcado, companionName es obligatorio
    if (data.companion === true && (!data.companionName || data.companionName.trim() === "")) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Debes proporcionar el nombre del acompañante",
            path: ["companionName"]
        });
    }
});

export type FormType = z.infer<typeof FormSchema>;