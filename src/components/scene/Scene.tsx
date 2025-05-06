import { memo } from 'react';

const Scene = () => {
    return (
        <div className="">
            <h1>Scena</h1>
        </div>
    );
};

export const SceneMemo = memo(Scene);
SceneMemo.displayName = 'SceneMemo';