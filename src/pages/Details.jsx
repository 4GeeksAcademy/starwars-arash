import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import Loading from "../components/Loading.jsx";
import ErrorAlert from "../components/ErrorAlert.jsx";
import DetailsHeader from "../components/DetailsHeader.jsx";
import DetailsTable from "../components/DetailsTable.jsx";
import CardImage from "../components/CardImage.jsx";

export default function Details() {
  const { type, uid } = useParams(); // type: people|planets|vehicles
  const { store, actions } = useGlobalReducer();

  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  const nameFromStore = useMemo(() => {
    const list = store[type] || [];
    const found = list.find((x) => String(x.uid) === String(uid));
    return found?.name || `${type} ${uid}`;
  }, [store, type, uid]);

  const isFav = store.favorites.some((f) => f.type === type && String(f.uid) === String(uid));

  useEffect(() => {
    let alive = true;
    setLoading(true);
    setErr(null);

    actions
      .getDetails(type, uid)
      .then((props) => {
        if (!alive) return;
        setDetails(props);
      })
      .catch((e) => {
        if (!alive) return;
        setErr(e.message);
      })
      .finally(() => {
        if (!alive) return;
        setLoading(false);
      });

    return () => {
      alive = false;
    };
  }, [actions, type, uid]);

  if (loading) return <div className="container py-4"><Loading /></div>;
  if (err) return <div className="container py-4"><ErrorAlert message={err} /></div>;
  if (!details) return <div className="container py-4"><ErrorAlert message="No details found." /></div>;

  return (
    <div className="container py-4">
      <div className="card">
        <div className="row g-0">
          <div className="col-md-5">
            <div className="p-3">
              <CardImage type={type} uid={uid} name={nameFromStore} className="img-fluid rounded" />
            </div>
          </div>

          <div className="col-md-7">
            <div className="p-4">
              <DetailsHeader
                title={nameFromStore}
                subtitle={type === "people" ? "A person within the Star Wars universe" : `A ${type.slice(0, -1)} within the Star Wars universe`}
                isFav={isFav}
                onToggleFav={() => actions.toggleFavorite({ type, uid, name: nameFromStore })}
              />

              <hr />

              <DetailsTable data={details} />

              <div className="mt-4">
                <Link to="/" className="btn btn-outline-secondary">
                  Back
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}