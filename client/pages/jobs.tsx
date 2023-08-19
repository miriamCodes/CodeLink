import JobBoard from '@/app/components/job-board';
import NavBar from '@/app/components/nav-bar';
import { useState } from 'react';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
});

export default function Jobs() {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <main>
      <div className={roboto.className}>
        <NavBar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
        <JobBoard />
      </div>
    </main>
  );
}
