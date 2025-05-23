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
    const [backgroundColor, setBackgroundColor] = useState<[ColorRepresentation]>(['#F5EAF7']);

    useEffect(() => {
        if (theme) {
            setBackgroundColor(['#3e3a34']);
        } else {
            setBackgroundColor(['#fafaf2']);
        }
    }, [theme]);

    return (

        <Canvas camera={{ position: [0, 0, 1] }}
            className='w-full h-full'
            style={{ width: '100%', height: '200px' }}
        >
            <color attach="background" args={backgroundColor} />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <SvgModel />
        </Canvas>

    );
};

export const SceneMemo = memo(Scene);
SceneMemo.displayName = 'SceneMemo';