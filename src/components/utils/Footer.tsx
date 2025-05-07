import { memo } from 'react';

const Footer = () => {
    return (
        <footer className="w-full text-center flex flex-col">
            <span>Prueba tecnica dirigida a: innerconsulting.com</span>
            <span>Desarrollada por: Andrés Roldán</span>
        </footer>
    );
};

export const FooterMemo = memo(Footer);
FooterMemo.displayName = 'FooterMemo';