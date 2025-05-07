import { useRouter } from 'next/navigation';

export function useNavigateToRegistro() {
    const router = useRouter();

    const navigateToRegistro = (id: string) => {
        router.push(`/registros/${id}`);
    };

    return { navigateToRegistro };
}