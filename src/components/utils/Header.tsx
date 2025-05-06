'use client'
import dynamic from 'next/dynamic';
import { memo } from 'react';
import Image from 'next/image';
import { useThemeStore } from '@/stores/theme.store'

const SwitchComponent = dynamic(
    () => import('@/components/ui/SwitchComponent')
        .then((mod) => mod.SwitchComponentMemo),
    { ssr: false }
)

const Header = () => {
    const theme = useThemeStore(e => e.theme)

    return (
        <div className="flex items-center justify-between
        border-0 border-b-2 border-mybgdark dark:border-mybg
        pb-3 w-full">
            <div className="relative">
                <Image
                    src={theme ? '/color.png' : '/gris.png'}
                    alt="Logo"
                    width={100}
                    height={100}
                    className="h-auto w-auto object-cover "
                />
            </div>
            <div className='flex items-center justify-center
            gap-5'>
                <h2 className='font-Man dark:text-mybg text-mybgdark
                text-xl'>Prueba tecnica - Frontend II</h2>
                <SwitchComponent />
            </div>
        </div>
    );
};

export const HeaderMemo = memo(Header);
HeaderMemo.displayName = 'HeaderMemo';