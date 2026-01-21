import FavoritesDropdown from "./FavoritesDropdown.jsx";
import SearchAutocomplete from "./SearchAutocomplete.jsx";

export default function Navbar() {
  return (
    <nav className="navbar navbar-light bg-white border-bottom">
      <div className="container">
        <span className="navbar-brand fw-bold">STAR WARS</span>
        <SearchAutocomplete />
        <FavoritesDropdown />
      </div>
    </nav>
  );
}