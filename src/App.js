import React, { useState, useEffect } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';

import newsCards from './components/NewsCards/newsCards';

const alanKey = '85237a5ee2b56daea3c94759cb754e7f2e956eca572e1d8b807a3e2338fdd0dc/stage';

const App = () => {
    // hooks in square brackets
    const [newsArticles, setNewsArticles] = useState([]);

    // Arrow function with dependencies, if left empty, runs once
    useEffect(() => {
        alanBtn({
            key: alanKey,
            onCommand: ({ command, articles }) => {
                if (command === 'newHeadlines') {
                    setNewsArticles(articles);
                }
            }
        })
    }, []);

    return (
        <div>
            <h1>Alan AI News Application</h1>
            <newsCards articles={newsArticles} />
        </div>
    );
}

export default App;