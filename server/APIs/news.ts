import 'dotenv/config.js';
const KEY = process.env.NEWS_API_KEY;

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${KEY}`
  }
};

async function fetchNews() {
  const news = await fetch(`https://newsapi.org/v2/top-headlines?category=technology&language=en&apiKey=${KEY}`, options)
    .then((article) => article.json())
    .catch(err => console.log(err));
    console.log(news);
    return news;
}

export {fetchNews};
