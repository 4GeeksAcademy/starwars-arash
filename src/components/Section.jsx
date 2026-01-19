import CardItem from "./CardItem.jsx";

export default function Section({ title, type, items }) {
  return (
    <div className="mb-5">
      <h2 className="text-danger mb-3">{title}</h2>

      <div className="d-flex gap-3 overflow-auto pb-2">
        {items.map((item) => (
          <CardItem key={item.uid} item={item} type={type} />
        ))}
      </div>
    </div>
  );
}