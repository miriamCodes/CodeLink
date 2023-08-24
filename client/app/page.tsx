'use client';

import '@/app/styles/home.css';
import Feed from '@/app/components/feed';
import RootLayout from './layout';
import DashboardLayout from './dashboard-layout';

export default function Home() {

  return (
    <RootLayout>
      <DashboardLayout>
        <div className="home_div">
          <div className="homepage_div">
            <div className="welcome_div">
              <h2 className="welcome">Welcome to CodeLink!</h2>
              <h3 className="welcome">
                A new platform for developers to meet and share their skills.
              </h3>
            </div>
            <div id="news_div" className="news_div">
              <Feed />
            </div>
          </div>
        </div>
      </DashboardLayout>
    </RootLayout>
  );
}
