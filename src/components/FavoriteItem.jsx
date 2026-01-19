import { Link } from "react-router-dom";

export default function FavoriteItem({ fav, onRemove }) {
  return (
    <li className="px-2">
      <div className="d-flex align-items-center justify-content-between border rounded px-2 py-2 mb-2">
        <Link to={`/${fav.type}/${fav.uid}`} className="text-decoration-none">
          {fav.name}
        </Link>
        <button className="btn btn-outline-danger btn-sm" onClick={onRemove}>
          ×
        </button>
      </div>
    </li>
  );
}