import React from 'react';
import Link from 'next/link';

interface PageHeaderProps {
    title: string;
    backUrl?: string;
    backLabel?: string;

}

export const PageHeader = ({
    title = '',
    backUrl = '/',
    backLabel = 'Volver al formulario'
}) => {
    return (
        <div className="flex flex-col gap-5 justify-between items-center mb-6
        md:flex-row">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">{title}</h1>
            <Link
                href={backUrl}
                className="px-3 py-1 bg-slate-600 text-white rounded-md hover:bg-gray-700 focus:outline-none"
            >
                {backLabel}
            </Link>
        </div>
    );
};

export default PageHeader;