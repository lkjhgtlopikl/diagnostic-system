import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./bootstrap";
import List from "./components/List";
import Form from "./components/Form";
import CheckList from "./components/CheckList";
import Tabs from "./components/Tabs";

import {
  chooseDis,
  fetchData,
  addSym,
  addDis,
  delSym,
  delDis,
  getSymptom,
  getDiseases,
  writeData,
} from "./fun";

function App() {
  const [diseases, setDiseases] = useState([]);
  const [symptoms, setSymptoms] = useState([]);
  const [val, setVal] = useState("");

  useEffect(() => {
    fetchData()
      .then(() => {
        setDiseases(getDiseases());
        setSymptoms(getSymptom());
      })
      .catch((error) => {
        console.error("Ошибка при получении данных:", error);
      });
  }, []);

  return (
    <Router>
      <div className="App">
        <div className="nav sticky-top nav-tabs bg-primary">
          <Link to="/add-symptom" className="nav-link">
            Добавить симптом
          </Link>
          <Link to="/add-diseases" className="nav-link">
            Добавить болезнь
          </Link>
          <Link to="/del-symptom" className="nav-link">
            Удалить симптом
          </Link>
          <Link to="/del-diseases" className="nav-link">
            Удалить болезнь
          </Link>
          <Link to="/test" className="nav-link">
            Установление диагноза
          </Link>
        </div>
        <div className="container col-8 p-3" id="con">
          <Routes>
            <Route
              path="/add-symptom"
              element={
                <div className="d-flex">
                  <div className="card card-body d-flex align-items-center m-2">
                    <div className="fs-1">Добавить симптом</div>
                    <Form val={val} setVal={setVal} />
                    <CheckList
                      clas={"form-check"}
                      col={diseases}
                      type={"checkbox"}
                    />
                    <button
                      type="submit"
                      className="btn btn-primary m-2"
                      onClick={() => {
                        addSym(val);
                        setVal("");
                        writeData("add-symptom");
                        fetchData();
                      }}
                    >
                      Добавить
                    </button>
                  </div>
                  <List col={symptoms} />
                </div>
              }
            ></Route>
            <Route
              path="/add-diseases"
              element={
                <div className="d-flex">
                  <div className="card card-body d-flex align-items-center m-2">
                    <div className="fs-1">Добавить болезнь</div>
                    <Form val={val} setVal={setVal} />
                    <CheckList
                      clas={"form-check"}
                      col={symptoms}
                      type={"checkbox"}
                    />
                    <button
                      className="btn btn-primary m-2"
                      type="submit"
                      onClick={() => {
                        addDis(val);
                        setVal("");
                        writeData("add-diseases");
                        fetchData();
                      }}
                    >
                      Добавить
                    </button>
                  </div>
                  <List col={diseases} />
                </div>
              }
            ></Route>
            <Route
              path="/del-symptom"
              element={
                <div className="card card-body d-flex align-items-center">
                  <h1
                    id="delS"
                    className="p-3 mb-2 bg-danger-subtle text-danger-emphasis"
                  ></h1>
                  <CheckList clas={"check"} col={symptoms} type={"radio"} />
                  <button
                    className="btn btn-primary m-2"
                    onClick={() => {
                      delSym();
                      writeData("del-symptom");
                      fetchData();
                    }}
                  >
                    Удалить
                  </button>
                </div>
              }
            ></Route>
            <Route
              path="/del-diseases"
              element={
                <div className="card card-body d-flex align-items-center">
                  <h1
                    id="delD"
                    className="p-3 mb-2 bg-danger-subtle text-danger-emphasis"
                  ></h1>
                  <CheckList clas={"check"} col={diseases} type={"radio"} />
                  <button
                    className="btn btn-primary m-2"
                    type="submit"
                    onClick={() => {
                      delDis();
                      writeData("del-symptom");
                      fetchData();
                    }}
                  >
                    Удалить
                  </button>
                </div>
              }
            ></Route>
            <Route
              path="/test"
              element={
                <form
                  className="card card-body col-10"
                  onSubmit={(e) => {
                    e.preventDefault();
                    chooseDis();
                  }}
                >
                  <h1
                    id="dis"
                    className="p-3 mb-2 bg-primary-subtle text-primary-emphasis"
                  ></h1>
                  <CheckList clas={"check"} col={symptoms} type={"checkbox"} />
                  <button
                    type="submit"
                    className="btn btn-primary m-2"
                    onClick={chooseDis}
                  >
                    Определить
                  </button>
                </form>
              }
            ></Route>
            <Route
              path="/change-diseases"
              element={
                <div className="card card-body d-flex align-items-center">
                  <Tabs />
                </div>
              }
            ></Route>
            <Route
              path="/"
              element={<h1>Добро пожаловать! Выберите опцию в меню.</h1>}
            ></Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
