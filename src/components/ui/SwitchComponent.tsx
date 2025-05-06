'use client'
import { memo, useEffect } from 'react';
import { useThemeStore } from '@/stores/theme.store'
import { PiSunLight, PiMoonLight } from "react-icons/pi";

const SwitchComponent = () => {

    const darkMode = useThemeStore(e => e.theme)
    const toggleTheme = useThemeStore(e => e.toggleTheme)

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }, [darkMode])

    return (
        <button className='' onClick={toggleTheme}>
            {
                darkMode
                    ? (<PiSunLight size={25} className='fill-mybg' />)
                    : (<PiMoonLight size={25} className='fill-mybgdark ' />)
            }
        </button>
    );
};

export const SwitchComponentMemo = memo(SwitchComponent);
SwitchComponentMemo.displayName = 'SwitchComponentMemo';