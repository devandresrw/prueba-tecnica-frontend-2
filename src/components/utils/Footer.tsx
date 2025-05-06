import { memo } from 'react';

const Footer = () => {
    return (
        <footer className="w-full text-center">
            <span>Prueba tecnica dirigida a: </span>
        </footer>
    );
};

export const FooterMemo = memo(Footer);
FooterMemo.displayName = 'FooterMemo';