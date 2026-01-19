import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import CardImage from "./CardImage.jsx";
import FavoriteButton from "./FavoriteButton.jsx";

export default function CardItem({ item, type }) {
  const { store, actions } = useGlobalReducer();
  const isFav = store.favorites.some((f) => f.type === type && String(f.uid) === String(item.uid));

  return (
    <div className="card" style={{ minWidth: 320 }}>
      <CardImage type={type} uid={item.uid} name={item.name} />

      <div className="card-body">
        <h5 className="card-title">{item.name}</h5>

        <div className="d-flex justify-content-between align-items-center">
          <Link className="btn btn-outline-primary" to={`/${type}/${item.uid}`}>
            Learn more!
          </Link>

          <FavoriteButton
            isFav={isFav}
            onClick={() => actions.toggleFavorite({ type, uid: item.uid, name: item.name })}
          />
        </div>
      </div>
    </div>
  );
}