const Navbar: React.FC = () => {
  return (
    <nav>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/profile">Profile</a></li>
        {/* more links as needed */}
      </ul>
    </nav>
  );
};

export default Navbar;