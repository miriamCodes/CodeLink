import React from 'react';
import Link from 'next/link';
import styles from '../styles/navbar.module.css'


export default function Navbar (): React.JSX.Element {

  return (
    <div className={styles.navbar}>
    <nav className='nav-container'>
    <ul className="nav-list">
      <li className="nav-item">
      <Link href="/">Home</Link>
      </li>
      <li className="nav-item">
        <Link href="/profile">Profile</Link>
      </li>
      <li className="nav-item">
        <Link href="/news">News</Link>
      </li>
      <li className="nav-item">
        <Link href="/discussion-board">Discussion-Board</Link>
      </li>
      <li className="nav-item">
        <Link href="/career-board">Career-board</Link>
      </li>
    </ul>
  </nav>
  </div>
  );
};





{/* // might make sense to have an object with links and then map them in the return. easier to adjust

// const navItems = [
//   { link: '/home', label: 'Home' },
//   { link: '/profile', label: 'Profile' },
//  ...
// ];

// return (
//   <ul>
//     {navItems.map(item => ( */}
//       <li key={item.link}>
//         <Link href={item.link}><a>{item.label}</a></Link>
//       </li>
//     ))}
//   </ul>
// );




// ---
// interface Properties {
//   loggedIn: boolean;
//   setLoggedIn: (loggedIn: boolean) => void;
// }

// const Navbar: React.FC<Properties> = () => {

//   return (
//     <nav className='nav-container'>
//     {/* Do we want to format class names like the following or import the stylesheet into the file and work from that? */}
//     <ul className="nav-list">
//       {/* Should we mention each link separately or have an external object with the links and maps them? */}
//       {/* On click redirect to appropriate page */}
//       {/* Consider changing to map through buttons? */}
//       {/* Home could be the brand logo. */}
//       {/* Consider mapping */}
//       <li className="nav-item">
//       <Link href="/home">Home</Link>
//       </li>
//       {loggedIn && (
//         <li className="nav-item">
//           <Link href="/profile">Profile</Link>
//         </li>
//       )}
//       {/* If logged out */}
//       {/* May be a better way to do this by passing useCase to handleClick or some other way. */}
//       {!loggedIn && (
//         <li className="nav-item">
//           <Button useCase={'Register'} onClick={() => handleClick('Register')} />
//         </li>
//       )}
//       {/* If logged out */}
//       {!loggedIn && (
//         <li className="nav-item">
//           <Button useCase={'Log in'} onClick={() => handleClick('Logged in')} />
//         </li>
//       )}
//       {/* If logged in */}
//       {loggedIn && (
//         <li className="nav-item">
//           <Button useCase={'Log out'} onClick={() => handleClick('Log out')} />
//         </li>
//       )}
//       {/* Consider mapping */}
//       <li className="nav-item">
//         <Link href="/news">News</Link>
//       </li>
//       <li className="nav-item">
//         <Link href="/discussion">Discussion</Link>
//       </li>
//       <li className="nav-item">
//         <Link href="/jobs">Job board</Link>
//       </li>
//     </ul>
//   </nav>
//   );
// };
// export default Navbar
