'use client';

import '@/app/styles/home.css';
import Feed from '@/app/components/feed';
import '@/app/styles/news.css';
import RootLayout from '../layout';
import DashboardLayout from '../dashboard-layout';

export default function News() {
  return (
    <RootLayout>
      <DashboardLayout>
        <main className="home_div">
            <div className="news_div">
              <Feed />
            </div>
        </main>
      </DashboardLayout>
    </RootLayout>
  );
}
