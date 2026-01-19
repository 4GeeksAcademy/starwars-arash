const FALLBACK =
  "https://res.cloudinary.com/dra2cr3uw/image/upload/v1765366742/IMAGEN_MUY_MUY_LEJANA_NO_DISPONIBLE_TEMPORALMENTE_pj0r6g.png";

function imageUrl(type, uid) {
  // starwars-visualguide uses folders: characters, planets, vehicles
  const map = { people: "characters", planets: "planets", vehicles: "vehicles" };
  const folder = map[type] || type;
  return `https://starwars-visualguide.com/assets/img/${folder}/${uid}.jpg`;
}

export default function CardImage({ type, uid, name, className = "" }) {
  return (
    <img
      src={imageUrl(type, uid)}
      className={`card-img-top ${className}`}
      alt={name || "Star Wars"}
      onError={(e) => {
        e.currentTarget.onerror = null;
        e.currentTarget.src = FALLBACK;
      }}
    />
  );
}