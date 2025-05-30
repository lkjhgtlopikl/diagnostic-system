export default function CheckList({ col, type, clas }) {
  return (
    <div>
      <div className="fs-4">Выберите необходимые пункты</div>
      <div className={clas}>
        {col.map((s,i) => (
          <div className=" text-start">
            <input className="form-check-input" name="options" id={s} type={type} />{" "}
            <label className="form-check-label" htmlFor={s}>
            {i}. {s}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
