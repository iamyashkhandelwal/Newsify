const apiKey = '3008c96d427e4e58b1311f50c6b60d72'

export const TopHeadlines = (country, category, page) => {
    
        return `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&page=${page}&apiKey=${apiKey}`;
    // else
    //     return `https://newsapi.org/v2/top-headlines?country=${country}&page=${page}&apiKey=${apiKey}`;
}

export const SearchByInput = (input, page) => {
    return `https://newsapi.org/v2/everything?q=${input}&page=${page}sortBy=publishedAt&apiKey=3008c96d427e4e58b1311f50c6b60d72`;
}