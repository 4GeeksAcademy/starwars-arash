import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import FavoriteItem from "./FavoriteItem.jsx";

export default function FavoritesDropdown() {
  const { store, actions } = useGlobalReducer();

  return (
    <div className="dropdown">
      <button
        className="btn btn-primary dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Favorites <span className="badge bg-secondary">{store.favorites.length}</span>
      </button>

      <ul className="dropdown-menu dropdown-menu-end" style={{ minWidth: 260 }}>
        {store.favorites.length === 0 && (
          <li className="px-3 py-2 text-muted">No favorites yet</li>
        )}

        {store.favorites.map((f) => (
          <FavoriteItem
            key={`${f.type}-${f.uid}`}
            fav={f}
            onRemove={() => actions.removeFavorite(f.type, f.uid)}
          />
        ))}

        {store.favorites.length > 0 && <li><hr className="dropdown-divider" /></li>}
        {store.favorites.length > 0 && (
          <li className="px-3 pb-2">
            <small className="text-muted">
              Tip: click a favorite to open details.
            </small>
          </li>
        )}
      </ul>
    </div>
  );
}