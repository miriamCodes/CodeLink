import Layout from '../layouts/layout';
import styles from '../styles/home.module.css'

export default async function Home: React.FC () {
  return (
    <div className='styles.home'>
    <Layout> 
      <div><h1>Welcome to CodeLink</h1></div>
      <div>About us</div>
      <div><Link href='/feature'>Check out this feature</Link></div>
      {/* content */}
    </Layout>
    </div>
  );
};

