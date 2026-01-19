export default function FavoriteButton({ isFav, onClick }) {
  return (
    <button
      className={`btn ${isFav ? "btn-warning" : "btn-outline-warning"}`}
      onClick={onClick}
      title={isFav ? "Remove from favorites" : "Add to favorites"}
    >
      {isFav ? "🖤" : "♡"}
    </button>
  );
}