'use client'
import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Svg } from '@react-three/drei';
import { Group } from 'three';
import { ColorRepresentation } from 'three';
import { useThemeStore } from '@/stores/theme.store';


const SVG_PATH = '/lineainner.svg';

export const Model = () => {

    const groupRef = useRef<Group>(null);
    const theme = useThemeStore((state) => state.theme);
    const [backgroundColor, setBackgroundColor] = useState<[ColorRepresentation]>(['#F5EAF7']);

    useEffect(() => {
        if (theme) {
            setBackgroundColor(['#f9f9f9']);
        } else {
            setBackgroundColor(['#292929']);
        }
    }, [theme]);

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.8) * 0.3;
            groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;
        }
    });

    return (
        <group ref={groupRef} position={[-1.5, 2, -3]}>
            <Svg
                src={SVG_PATH}
                scale={0.01}
                fillMaterial={{ color: `${backgroundColor}` }}
            />
        </group>
    );
};