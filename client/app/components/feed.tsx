import styles from '@/app/styles/feed.module.css';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Feed() {
  const [news, setNews] = useState([
    {
      source: { id: '', name: '' },
      author: '',
      title: '',
      description: '',
      url: '',
      urlToImage: '',
      publishedAt: '',
      content: '',
    },
  ]);
  const fetchNews = async () => {
    await fetch('http://localhost:3001/news', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => setNews(data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchNews();
  }, []);

  console.log(news);
  return (
    <div className={styles.feed}>
      {news.map((article) => (
        <div key="article" className={styles.article}>
          <div className={styles.news_image} key="image">
            {article.urlToImage && (
              <Image
                alt="News article image"
                src={article.urlToImage}
                width={700}
                height={400}
              />)
            }
          </div>
          <div className={styles.news_text}>
            <div className={styles.news_title} key="title">
              <h3 className={styles.font}>
                <b>{article.title}</b>
              </h3>
            </div>
            <div className={styles.news_description} key="description">
              <h3 className={styles.font}>{article.description}</h3>
            </div>
            <div className={styles.news_url} key="url">
              <Link className={styles.news_link} href={article.url}>
                Check out the full story here.
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
