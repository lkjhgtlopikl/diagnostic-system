export default function List({col}) {
  return (
    <div className="list col-6 m-2">
      <ol className="list-group list-group-numbered">
        {col.map((s) => (
          <li className="list-group-item">{s}</li>
        ))}
      </ol>
    </div>
  );
}
