import React, { useState } from "react";
export default function Form({ val, setVal }) {
  //const [val, setVal] = useState("");

  // col - symptoms или diseases
  // addCol - метод добавления в эту коллекцию

  // const handleClick = () => {
  //   if (clickFun === "addDis") {
  //     addDis();
  //   } else if (clickFun === "inputValue") {
  //     inputValue();
  //   }
  // };
  return (
    <form
      className="card card-body col-10 m-3"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="fs-4">Введите наименование</div>
      <input
        className="form-control"
        value={val} // Используем состояние val
        onChange={(e) => setVal(e.target.value)} // Обновляем состояние при вводе
        type="text"
        placeholder="Ведите текст"
      />
    </form>
  );
}
