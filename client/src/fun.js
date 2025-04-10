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
      console.log(dataArr); // Здесь вы можете использовать загруженные данные
      //console.log(dataArr.c[0][1][2])
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
  return fetch("http://localhost:3000/" + path, {
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
function calculationMD(arr) {
  //рассчет результирующей меры доверия
  let res = arr[0]
  for (let i = 1; i < arr.length; i++) {
    res = res + arr[i] * (1 - res)
  }

  return res
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

export function checkDis(arrCheked) {
  const results = {};
  //arrCheked - массив отмеченных симптомов
  let MD = [];//маассив мер доверия
  let MND = [];//массив мер недоверия
  // Проходим по каждому ключу в объекте dataArr.c
  for (const key in dataArr.c) {
    MD = [];
    MND = [];
    results[key] = [dataArr.diseases[key]];
    dataArr.c[key].forEach(subArray => {
      if (arrCheked.includes(subArray[0])) {
        MD.push(subArray[1]);
        MND.push(subArray[2]);
      }
    });
    results[key].push(calculationMD(MD).toFixed(4));
    results[key].push(calculationMD(MND).toFixed(4));
    results[key].push((calculationMD(MD) - calculationMD(MND)).toFixed(4));
  }
  return results;
}

export function chooseDis() {
  //установление диагноза
  let arr = getChecked(dataArr.symptoms);//массив отмеченных симптомов
  let dis = checkDis(arr);//массив болезней и коэффициентов уверенности
  let all = ""
  let res = ""
  const dataArray = Object.entries(dis);
  dataArray.sort((a, b) => {
    // Преобразуем строки в числа для корректного сравнения
    return parseFloat(b[1][1]) - parseFloat(a[1][1]);
  });

  // Вывод отсортированного массива
  console.log(dataArray);
  ;//сортировка полученного массива по КУ

  const sortedData = Object.fromEntries(dataArray);
  console.log(sortedData);
  for (let [i, j] of dataArray.values()) {
    console.log(j)
    if (parseFloat(j[1]) >= 0.5) {
      res += (j[0] + " : " + "\n  Мера доверия: " + j[1] + "\n Мера недоверия: " + j[2] + "\n  Коэффициент уверенности: " + j[3] + "\n\n");

    }
    all += (j[0] + " : " + "\n  Мера доверия: " + j[1] + "\n Мера недоверия: " + j[2] + "\n  Коэффициент уверенности: " + j[3] + "\n\n");
  }
  document.getElementById("dis").innerText = res//вывод наиболее вероятных болезней
  document.getElementById("all").innerText = all//вывод всех болезней
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
  let number = 0
  if (inputValue(dataArr.symptoms, addSymptom, val)) {
    //добавили значение в симптомы
    let arr = getChecked(dataArr.diseases); //получили отмеченные болезни
    let key = dataArr.symptoms.length - 1; //получили последнее добавленное значение
    for (let [i, j] of Object.entries(dataArr.c)) {
      for (let index = 0; index < arr.length; index++) {
        if (i == arr[index]) {//добавляем симптом и меры доверия/недоверия в таблицу совпадений
          let temp = []
          temp.push(key)
          do {
            number = parseFloat(prompt("Введите меру доверия для болезни " + dataArr.diseases[index] + " :").replace(',', '.'));
            if (isNaN(number)) {
              alert("Ошибка: Введите корректное вещественное число.");
            } else if (!((0 <= number) && (number < 1))) {
              alert("Ошибка: Число должно находится в интервале от 0 до 1");
            }
          } while (isNaN(number) || !((0 <= number) && (number < 1)));
          temp.push(number)
          do {
            number = parseFloat(prompt("Введите меру недоверия для болезни " + dataArr.diseases[index] + " :").replace(',', '.'));
            if (isNaN(number)) {
              alert("Ошибка: Введите корректное вещественное число.");
            } else if (!((0.01 <= number) && (number <= 0.1))) {
              alert("Ошибка: Число должно находится в интервале от 00,1 до 0,1");
            }
          } while (isNaN(number) || !((0.01 <= number) && (number <= 0.1)));
          temp.push(number)
          dataArr.c[i].push(temp);
        }
      }
    }
  } else {
    alert("Симптом не был введен");
  }
}

export function addDis(val) {
  //добавление болезни с симптомами в коллекцию совпадений
  let sym = []
  let temp = []
  let f = false
  let t = []
  if (inputValue(dataArr.diseases, addDiseases, val)) {
    //добавили значение в болезни
    let arr = getChecked(dataArr.symptoms); //получили отмеченные симптомы
    let key = dataArr.diseases.length - 1; //получили последнее добавленное значение
    for (let [i, j] of Object.entries(dataArr.c)) {
      t = j.map(subArray => subArray[0]);
      if (check(t, arr)) {
        alert("Болезнь уже добавлена");
        dataArr.diseases.pop();
        f = false
        break;
      } else if (
        t.every((el) => arr.includes(el)) ||
        arr.every((el) => t.includes(el))
      ) {
        //Проверка на полное вхождение массива в массив
        alert("Данная болезнь не может быть добавлена");
        dataArr.diseases.pop();
        f = false
        break;
      } else {
        f = true//если болезнь может быть добавлена
      }
    }
    if (f) {//добавляем симптом и меры доверия/недоверия в таблицу совпадений
      for (let i = 0; i < arr.length; i++) {
        let number = 0
        temp = []
        temp.push(arr[i])
        //let input = ;
        do {
          number = parseFloat(prompt("Введите меру доверия для сиптома " + dataArr.symptoms[i] + " :").replace(',', '.'));
          if (isNaN(number)) {
            alert("Ошибка: Введите корректное вещественное число.");
          } else if (!((0 <= number) && (number < 1))) {
            alert("Ошибка: Число должно находится в интервале от 0 до 1");
          }
        } while (isNaN(number) || !((0 <= number) && (number < 1)));
        temp.push(number)
        do {
          number = parseFloat(prompt("Введите меру недоверия для сиптома " + dataArr.symptoms[i] + " :").replace(',', '.'));
          if (isNaN(number)) {
            alert("Ошибка: Введите корректное вещественное число.");
          } else if (!((0.01 <= number) && (number <= 0.1))) {
            alert("Ошибка: Число должно находится в интервале от 00,1 до 0,1");
          }
        } while (isNaN(number) || !((0.01 <= number) && (number <= 0.1)));
        temp.push(number)
        sym.push(temp)
      }
      dataArr.c[key] = sym;
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
        if (id == j[k][0]) {
          temp = j.splice(k, 1);
        } else if (j[k][0] > id) {
          j[k][0] -= 1;
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