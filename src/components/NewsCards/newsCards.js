import React from 'react';

import newsCard from '../NewsCard/newsCard';

const newsCards = ({ newsArticles }) => {
    return (
        <div>
            {newsArticles.map((article, i) => (
                <newsCard />
            ))}
        </div>
    );
};

export default newsCards;