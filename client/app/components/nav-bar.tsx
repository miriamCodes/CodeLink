import React from 'react';
import Button from './button';
// Should we use this next syntax or rather an a tag?
import Link from 'next/link';

interface Properties {
  loggedIn: boolean;
  setLoggedIn: (loggedIn: boolean) => void;
}

export default function NavBar({
  loggedIn,
  setLoggedIn,
}: Properties) /*: React.JSX.Element*/ {
  // Should handleClick function be here, passed through properties or instead declared in a separate file?
  function handleClick(useCase: string) {
    if (useCase === 'Log out') {
      setLoggedIn(false);
    }
  }
  return (
    <nav>
      {/* Do we want to format class names like the following or import the stylesheet into the file and work from that? */}
      <ul className="nav-list">
        {/* Should we mention each link separately or have an external object with the links and maps them? */}
        {/* On click redirect to appropriate page */}
        {/* Consider changing to map through buttons? */}
        {/* Home could be the brand logo. */}
        {/* Consider mapping */}
        <li className="nav-item">
          <a href="/home">Home</a>
        </li>
        {loggedIn && (
          <li className="nav-item">
            <a href="/profile">Profile</a>
          </li>
        )}
        {/* If logged out */}
        {/* May be a better way to do this by passing useCase to handleClick or some other way. */}
        {!loggedIn && (
          <li className="nav-item">
            <Button
              useCase={'Register'}
              onClick={() => handleClick('Register')}
            />
          </li>
        )}
        {/* If logged out */}
        {!loggedIn && (
          <li className="nav-item">
            <Button
              useCase={'Log in'}
              onClick={() => handleClick('Logged in')}
            />
          </li>
        )}
        {/* If logged in */}
        {loggedIn && (
          <li className="nav-item">
            <Button
              useCase={'Log out'}
              onClick={() => handleClick('Log out')}
            />
          </li>
        )}
        {/* Consider mapping */}
        <li className="nav-item">
          <Link href="news">
            News
          </Link>
        </li>
        <li className="nav-item">
          <a href="/discussion">Discussion</a>
        </li>
        <li className="nav-item">
          <a href="/jobs">Job board</a>
        </li>
      </ul>
    </nav>
  );
}
