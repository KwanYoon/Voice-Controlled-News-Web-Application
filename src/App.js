import React, { useState, useEffect } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import wordsToNumbers from 'words-to-numbers';

import NewsCards from './components/NewsCards/newsCards';
import useStyles from './appStyles.js';

const alanKey = '85237a5ee2b56daea3c94759cb754e7f2e956eca572e1d8b807a3e2338fdd0dc/stage';

const App = () => {
    const classes = useStyles();

    // hooks in square brackets
    // news articles
    const [newsArticles, setNewsArticles] = useState([]);
    // current article, start at 0
    const [activeArticle, setActiveArticle] = useState(-1); 

    // Arrow function with dependencies, if left empty, runs once
    useEffect(() => {
        alanBtn({
            key: alanKey,
            onCommand: ({ command, articles, number }) => {
                if (command === 'newHeadlines') {
                    setNewsArticles(articles);
                    setActiveArticle(-1);
                } else if (command === 'highlight') {
                    setActiveArticle((prevActiveArticle) => prevActiveArticle + 1)
                } else if (command === 'open') {
                    const parsedNumber = number.length > 2 ? wordsToNumbers(number, { fuzzy: true }) : number;
                    const article = articles[parsedNumber - 1];

                    if (parsedNumber > 20) {
                        alanBtn().playText('Could not understand number. Please try again.');
                    } else if (article) {
                        window.open(article.url, '_blank');
                        alanBtn().playText('Opening...');
                    }
                }
            }
        })
    }, []);

    const home = () => {
        setNewsArticles([]);
        setActiveArticle(-1);
    };

    return (
        <div className={classes.background}>
            <div className={classes.logoContainer}>
                <input type='image' onClick={home} src='https://scontent-ort2-1.xx.fbcdn.net/v/t1.0-9/67659112_438501920211949_8507331483155824640_o.jpg?_nc_cat=105&ccb=3&_nc_sid=e3f864&_nc_ohc=0XbsedaNbEgAX-8MQr4&_nc_ht=scontent-ort2-1.xx&oh=6026373d402be2ab989917b98abe90aa&oe=60613C29' className={classes.alanLogo} alt="alan logo" />
            </div>
            <NewsCards articles={newsArticles} activeArticle={activeArticle} />
        </div>
    );
}

export default App;