function niceKey(k) {
  return String(k).replaceAll("_", " ");
}

export default function DetailsTable({ data }) {
  // data -> SWAPI "properties" object
  return (
    <div className="row g-3">
      {Object.entries(data).map(([k, v]) => (
        <div className="col-md-6" key={k}>
          <div className="small text-muted">{niceKey(k)}</div>
          <div className="fw-semibold" style={{ wordBreak: "break-word" }}>
            {Array.isArray(v) ? v.join(", ") : String(v)}
          </div>
        </div>
      ))}
    </div>
  );
}