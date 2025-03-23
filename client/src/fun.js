//import {symptoms} from '../public/data.json'
let dataArr = [];
// Загрузка данных из data.json
export function fetchData() {
  return fetch("data.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Сеть не ответила");
      }
      return response.json();
    })
    .then((data) => {
      dataArr = data;
      //console.log(dataArr); // Здесь вы можете использовать загруженные данные
    })
    .catch((error) => {
      console.error("Ошибка при загрузке данных:", error);
    });
}


export function getSymptom() {
  return dataArr.symptoms;
}
export function getDiseases() {
  return dataArr.diseases;
}
export function getC() {
  return dataArr.c;
}
export function getData() {
  return dataArr;
}

export function writeData(path) {
  return  fetch("http://localhost:3000/"+path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataArr),
  })
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Ошибка сети ${response.status} ${response.statusText}`);
    }
    return response.text();
  })
  .then((result) => {
    console.log("fun.js ", result); // Выводим результат
  })
  .catch((error) => {
    console.error("Ошибка:", error);
  });
}

export function addSymptom(el) {
  dataArr.symptoms.push(el);
}
export function addDiseases(el) {
  dataArr.diseases.push(el);
}

export function delSymptom() {
  dataArr.symptoms.pop();
}
export function delDiseases() {
  dataArr.diseases.pop();
}

export function getChecked(col) {
  // получение массива элементов, отмеченных в списке галочкой
  let arr = [];
  for (let index = 0; index < col.length; index++) {
    if (document.getElementById(col[index]).checked) {
      arr.push(index);
    }
  }
  return arr;
}

export function check(arr1, arr2) {
  // проверка полученного массива симптомов на полное совпадение с симптомами одной из введеных болезней
  let res = 0;
  if (arr1.length !== arr2.length) {
    //console.log("Разная длина массивов")
    return false;
  } else {
    for (let index = 0; index < arr1.length; index++) {
      if (arr1[index] === arr2[index]) {
        res++;
      }
    }
    if (res === arr1.length) {
      //console.log("Болезнь найденa")
      return true;
    } else {
      //console.log("Не все симптомы совпадают")
      return false;
    }
  }
}

export function chooseDis() {
  //установление диагноза
  let f = false;
  let arr = getChecked(dataArr.symptoms);
  let dis = "";
  for (let [i, j] of Object.entries(dataArr.c)) {
    if (check(j, arr)) {
      dis = dataArr.diseases[i];
      // console.log(dis);
      f = true;
      break;
    }
  }
  if (!f) {
    dis = "Нет такой болезни";
    console.log(dis);
  }
  document.getElementById("dis").innerText = dis;
}

export function inputValue(col, addCol, val) {
  //Добавление нового значения в коллекцию col (симптомы или болезни)
  let f = true;
  if (val.trim() === "") {
    alert("Введите значение в поле");
    f = false;
  } else if (col.includes(val)) {
    alert("Повторение значений недопустимо");
    f = false;
    val = "";
  } else {
    addCol(val);
    console.log(col);
    val = "";
  }
  return f;
}

export function addSym(val) {
  //добавление симптома
  if (inputValue(dataArr.symptoms, addSymptom, val)) {
    //добавили значение в симптомы
    let arr = getChecked(dataArr.diseases); //получили отмеченные симптомы
    let key = dataArr.symptoms.length - 1; //получили последнее добавленное значение
    for (let [i, j] of Object.entries(dataArr.c)) {
      for (let index = 0; index < arr.length; index++) {
        if (i == arr[index]) {
          dataArr.c[i].push(key);
        }
      }
    }
    console.log(key);
    console.log(dataArr.symptoms[key]);
    console.log(arr);
    console.log(dataArr.c);
  } else {
    alert("Симптом не был введен");
  }
}

export function addDis(val) {
  //добавление болезни с симптомами в коллекцию совпадений
  if (inputValue(dataArr.diseases, addDiseases, val)) {
    //добавили значение в болезни
    let arr = getChecked(dataArr.symptoms); //получили отмеченные симптомы
    let key = dataArr.diseases.length - 1; //получили последнее добавленное значение
    for (let [i, j] of Object.entries(dataArr.c)) {
      if (check(j, arr)) {
        alert("Болезнь уже добавлена");
        dataArr.diseases.pop();
        console.log(dataArr.diseases);
        break;
      } else if (
        j.every((el) => arr.includes(el)) ||
        arr.every((el) => j.includes(el))
      ) {
        //Проверка на полное вхождение массива в массив
        alert("Данная болезнь не может быть добавлена");
        dataArr.diseases.pop();
        console.log(dataArr.diseases);
        break;
      } else {
        dataArr.c[key] = arr;
      }
    }
  } else {
    alert("Болезнь не была добавлена");
  }
}

export function getСheckedRadio(col) {
  // получение элемента, отмеченного в списке галочкой
  let res;
  for (let index = 0; index < col.length; index++) {
    if (document.getElementById(col[index]).checked) {
      res = index;
      break;
    }
  }
  return res;
}

export function delSym() {
  console.log(dataArr.c);
  let temp = 0;
  let id = getСheckedRadio(dataArr.symptoms); //получение индекса элемента, который нужно удалить
  console.log(id);
  if (id != null) {
    let del = dataArr.symptoms.splice(id, 1); //удаление из списка симптомов
    console.log(dataArr.symptoms);
    for (let [i, j] of Object.entries(dataArr.c)) {
      //удаление из списка совпадений
      for (let k = 0; k < j.length; k++) {
        if (id == j[k]) {
          temp = j.splice(k, 1);
        } else if (j[k] > id) {
          j[k] -= 1;
        }
      }
      console.log(j);
    }
    document.getElementById("delS").innerText = "Элемент " + del + " удален";
  } else {
    document.getElementById("delS").innerText = "Элемент не выбран";
  }
}

export function delDis() {
  let id = getСheckedRadio(dataArr.diseases); //получение индекса элемента, который нужно удалить
  if (id != null) {
    let del = dataArr.diseases.splice(id, 1); //удаление из списка болезней
    delete dataArr.c[id]; //удаление из списка совпадений
    console.log(dataArr.diseases);
    for (let [key, value] of Object.entries(dataArr.c)) {
        if (parseInt(key) > id) {
          dataArr.c[key - 1] = value; // сдвиг ключа на 1
          delete dataArr.c[key]; // удаление старого ключа
        }
      }

    document.getElementById("delD").innerText = "Элемент " + del + " удален";
  } else {
    document.getElementById("delD").innerText = "Элемент не выбран";
  }
}