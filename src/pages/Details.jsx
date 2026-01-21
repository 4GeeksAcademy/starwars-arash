import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
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

export default function Details() {
  const { type, uid } = useParams();
  const { actions } = useGlobalReducer();

  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    actions
      .getDetails(type, uid)
      .then((data) => setDetails(data))
      .catch((e) => setError(String(e)))
      .finally(() => setLoading(false));
  }, [type, uid]);

  if (loading) return <div className="container mt-4">Loading...</div>;
  if (error) return <div className="container mt-4 alert alert-danger">{error}</div>;

  const name = details?.properties?.name || details?.result?.properties?.name;

  const props = details?.properties || details?.result?.properties || {};

  return (
    <div className="container mt-4">
      <div className="card p-3">
        <div className="row g-3">
          <div className="col-md-4">
            <img
              src={imgUrl(type, uid)}
              className="img-fluid rounded"
              alt={name || `${type} ${uid}`}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = FALLBACK_IMG;
              }}
            />
          </div>

          <div className="col-md-8">
            <h1 className="mb-3">{name}</h1>
            <hr />

            <div className="row">
              {Object.entries(props).map(([k, v]) => (
                <div className="col-md-6 mb-2" key={k}>
                  <div className="small text-muted">{k.replaceAll("_", " ")}</div>
                  <div className="fw-semibold">{String(v)}</div>
                </div>
              ))}
            </div>

            <Link className="btn btn-outline-secondary mt-3" to="/">
              Back
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}