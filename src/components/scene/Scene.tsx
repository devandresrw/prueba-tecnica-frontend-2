'use client'
import dynamic from 'next/dynamic';
import { memo, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber'
import { useThemeStore } from '@/stores/theme.store'
import { ColorRepresentation } from 'three';

const SvgModel = dynamic(
    () => import('@/components/scene/SvgModel').then((mod) => mod.Model),
    { ssr: false }
);

const Scene = () => {
    const theme = useThemeStore((state) => state.theme);
    // Especificamos el tipo correcto como una tupla de un elemento
    const [backgroundColor, setBackgroundColor] = useState<[ColorRepresentation]>(['#F5EAF7']);

    useEffect(() => {
        if (theme) {
            setBackgroundColor(['#3e3a34']);
        } else {
            setBackgroundColor(['#fafaf2']);
        }
    }, [theme]);

    return (
        <div className="w-full h-52">
            <Canvas camera={{ position: [0, 0, 1] }}
                className='h-full'>
                <color attach="background" args={backgroundColor} />
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <SvgModel />
            </Canvas>
        </div>
    );
};

export const SceneMemo = memo(Scene);
SceneMemo.displayName = 'SceneMemo';