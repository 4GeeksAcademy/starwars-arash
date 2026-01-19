import FavoritesDropdown from "./FavoritesDropdown.jsx";

export default function Navbar() {
  return (
    <nav className="navbar navbar-light bg-white border-bottom">
      <div className="container">
        <span className="navbar-brand fw-bold">STAR WARS</span>
        <FavoritesDropdown />
      </div>
    </nav>
  );
}