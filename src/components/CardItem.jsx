import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

const FALLBACK_IMG =
  "https://res.cloudinary.com/dra2cr3uw/image/upload/v1765366742/IMAGEN_MUY_MUY_LEJANA_NO_DISPONIBLE_TEMPORALMENTE_pj0r6g.png";

function imgUrl(type, uid) {
  const folderMap = {
    people: "characters",
    characters: "characters",
    planets: "planets",
    vehicles: "vehicles",
  };
  const folder = folderMap[type] || type;

  return `https://raw.githubusercontent.com/tbone849/star-wars-guide/master/build/assets/img/${folder}/${uid}.jpg`;
}

export default function CardItem({ item, type }) {
  const { store, actions } = useGlobalReducer();
  const isFav = store.favorites.some((f) => f.uid === item.uid && f.type === type);

  return (
    <div className="card me-3" style={{ minWidth: 320 }}>
      <img
        src={imgUrl(type, item.uid)}
        className="card-img-top"
        alt={item.name}
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = FALLBACK_IMG;
        }}
      />

      <div className="card-body">
        <h5 className="card-title">{item.name}</h5>

        <div className="d-flex justify-content-between align-items-center">
          <Link className="btn btn-outline-primary" to={`/${type}/${item.uid}`}>
            Learn more!
          </Link>

          <button
            className={`btn ${isFav ? "btn-warning" : "btn-outline-warning"}`}
            onClick={() =>
              actions.toggleFavorite({ uid: item.uid, type, name: item.name })
            }
          >
            {isFav ? "♥" : "♡"}
          </button>
        </div>
      </div>
    </div>
  );
}