// Should we use this next syntax or rather an a tag?
import Link from 'next/link';
import styles from '../styles/nav-bar.module.css';
import Image from 'next/image';
import NavList from './nav-list';
interface Properties {
  loggedIn: boolean;
  setLoggedIn: (loggedIn: boolean) => void;
}

export default function NavBar({
  loggedIn,
  setLoggedIn,
}: Properties) /*: React.JSX.Element*/ {
  // Should handleClick function be here, passed through properties or instead declared in a separate file?
  return (
    <div className={styles.nav_div}>
      <nav className={styles.nav_bar}>
        <Link href="/" className={styles.nav_link}>
          <div className={styles.brand_div}>
            <Image
              alt="CodeLink logo"
              width="100"
              height="100"
              src="/logo-exemplar.png"
            />
            <h1 className={styles.brand_name}>CodeLink</h1>
          </div>
        </Link>
        {/* Do we want to format class names like the following or import the stylesheet into the file and work from that? */}
        <NavList loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      </nav>
    </div>
  );
}
