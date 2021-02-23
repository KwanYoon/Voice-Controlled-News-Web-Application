import React, { useEffect } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';

const alanKey = '85237a5ee2b56daea3c94759cb754e7f2e956eca572e1d8b807a3e2338fdd0dc/stage';

const App = () => {
    // Arrow function with dependencies, if left empty, runs once
    useEffect(() => {
        alanBtn({
            key: alanKey,
            onCommand: ({ command }) => {
                if (command === 'testCommand') {
                    alert('this code was executed');
                }
            }
        })
    }, []);

    return (
        <div>
            <h1>Alan AI News Application</h1>
        </div>
    );
}

export default App;