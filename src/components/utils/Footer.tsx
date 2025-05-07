import { memo } from 'react';
import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="w-full text-center  mt-5">
            <Link
                href={'/registros'}
                target='_blank'
                className='mb-1 bg-slate-500 hover:bg-slate-400 py-2 px-4
                rounded-md text-white font-semibold'>
                Ver registros
            </Link>
            <span className='text-xs block mt-6 text-mybgdark dark:text-mybg'>Prueba tecnica dirigida a: innerconsulting.com</span>
            <span className='text-xs block text-mybgdark dark:text-mybg'>Desarrollada por: Andrés Roldán</span>
        </footer>
    );
};

export const FooterMemo = memo(Footer);
FooterMemo.displayName = 'FooterMemo';