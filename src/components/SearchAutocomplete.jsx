import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export default function SearchAutocomplete() {
  const { store } = useGlobalReducer();
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const results = useMemo(() => {
    if (query.length < 2) return [];
    const q = query.toLowerCase();

    const search = (type, list) =>
      list
        .filter((x) => x.name.toLowerCase().includes(q))
        .map((x) => ({ ...x, type }));

    return [
      ...search("people", store.people),
      ...search("planets", store.planets),
      ...search("vehicles", store.vehicles)
    ].slice(0, 8);
  }, [query, store]);

  return (
    <div className="position-relative" style={{ width: "250px" }}>
      <input
        className="form-control"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {results.length > 0 && (
        <div className="list-group position-absolute w-100">
          {results.map((r) => (
            <button
              key={`${r.type}-${r.uid}`}
              className="list-group-item list-group-item-action"
              onClick={() => navigate(`/${r.type}/${r.uid}`)}
            >
              {r.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}