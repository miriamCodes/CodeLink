import 'dotenv/config';
//const KEY = process.env.NEWS_API_KEY;
const KEY = '80de228c33c04e90adbad3f3cbd609a0';
import { Request, Response } from 'express';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${KEY}`
  }
};

async function fetchNews(req: Request, res: Response) {
  const news = await fetch(`https://newsapi.org/v2/top-headlines?category=technology&language=en&apiKey=${KEY}`, options)
    .then((article) => article.json())
    .catch(err => console.log(err));
  res.send(news.articles);
}


export { fetchNews };
