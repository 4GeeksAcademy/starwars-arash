export default function DetailsHeader({ title, subtitle, isFav, onToggleFav }) {
  return (
    <div className="d-flex align-items-start justify-content-between">
      <div>
        <h1 className="h3 mb-1">{title}</h1>
        <div className="text-muted">{subtitle}</div>
      </div>

      <button className={`btn ${isFav ? "btn-warning" : "btn-outline-warning"}`} onClick={onToggleFav}>
        {isFav ? "🖤" : "♡"}
      </button>
    </div>
  );
}