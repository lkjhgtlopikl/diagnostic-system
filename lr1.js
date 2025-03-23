const express = require("express");
const bodyParser = require("body-parser");
const config = require("config");
const fs = require("fs");
const cors = require("cors");
const path = require('path');

const app = express();
const PORT = config.get("port") || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('Сервер работает!');
});
app.post('/', (req, res) => {
  res.send('Сервер работает!');
});

app.use((req, res, next) => {
  console.log(`${req.method} запрос на ${req.url}`);
  next();
});

let p = './client/public/data.json'

app.get('/add-symptom', (req, res) => {
  fs.readFile(p, (err, data) => {
    if (err) {
      console.error('Ошибка чтения файла:', err);
      return res.status(500).send('Ошибка чтения файла');
    }
    try {
      res.json(JSON.parse(data));
    } catch (parseError) {
      console.error('Ошибка парсинга JSON:', parseError);
      return res.status(500).send('Ошибка парсинга данных');
    }
  });
});
app.get('/add-diseases', (req, res) => {
  fs.readFile(p, (err, data) => {
    if (err) {
      console.error('Ошибка чтения файла:', err);
      return res.status(500).send('Ошибка чтения файла');
    }
    try {
      res.json(JSON.parse(data));
    } catch (parseError) {
      console.error('Ошибка парсинга JSON:', parseError);
      return res.status(500).send('Ошибка парсинга данных');
    }
  });
});
app.get('/del-symptom', (req, res) => {
  fs.readFile(p, (err, data) => {
    if (err) {
      console.error('Ошибка чтения файла:', err);
      return res.status(500).send('Ошибка чтения файла');
    }
    try {
      res.json(JSON.parse(data));
    } catch (parseError) {
      console.error('Ошибка парсинга JSON:', parseError);
      return res.status(500).send('Ошибка парсинга данных');
    }
  });
});
app.get('/del-diseases', (req, res) => {
  fs.readFile(p, (err, data) => {
    if (err) {
      console.error('Ошибка чтения файла:', err);
      return res.status(500).send('Ошибка чтения файла');
    }
    try {
      res.json(JSON.parse(data));
    } catch (parseError) {
      console.error('Ошибка парсинга JSON:', parseError);
      return res.status(500).send('Ошибка парсинга данных');
    }
  });
});
app.get('/test', (req, res) => {
  fs.readFile(p, (err, data) => {
    if (err) {
      console.error('Ошибка чтения файла:', err);
      return res.status(500).send('Ошибка чтения файла');
    }
    try {
      res.json(JSON.parse(data));
    } catch (parseError) {
      console.error('Ошибка парсинга JSON:', parseError);
      return res.status(500).send('Ошибка парсинга данных');
    }
  });
});



app.post('/add-symptom', (req, res) => {
  const data = req.body; // Получаем данные из запроса
  console.log("/data: ",data)
  // Записываем данные в файл data.json
  fs.writeFile(path.join(__dirname, p), JSON.stringify(data, null, 2), (err) => {
    if (err) {
      return res.status(500).send('Ошибка записи файла');
    }
    res.send('Данные успешно записаны');
  });
});
app.post('/add-diseases', (req, res) => {
  const data = req.body; // Получаем данные из запроса
  console.log("/data: ",data)
  // Записываем данные в файл data.json
  fs.writeFile(path.join(__dirname, p), JSON.stringify(data, null, 2), (err) => {
    if (err) {
      return res.status(500).send('Ошибка записи файла');
    }
    res.send('Данные успешно записаны');
  });
});
app.post('/del-symptom', (req, res) => {
  const data = req.body; // Получаем данные из запроса
  console.log("/data: ",data)
  // Записываем данные в файл data.json
  fs.writeFile(path.join(__dirname, p), JSON.stringify(data, null, 2), (err) => {
    if (err) {
      return res.status(500).send('Ошибка записи файла');
    }
    res.send('Данные успешно записаны');
  });
});
app.post('/del-diseases', (req, res) => {
  const data = req.body; // Получаем данные из запроса
  console.log("/data: ",data)
  // Записываем данные в файл data.json
  fs.writeFile(path.join(__dirname, p), JSON.stringify(data, null, 2), (err) => {
    if (err) {
      return res.status(500).send('Ошибка записи файла');
    }
    res.send('Данные успешно записаны');
  });
});
app.post('/test', (req, res) => {
  const data = req.body; // Получаем данные из запроса
  console.log("/data: ",data)
  // Записываем данные в файл data.json
  fs.writeFile(path.join(__dirname, p), JSON.stringify(data, null, 2), (err) => {
    if (err) {
      return res.status(500).send('Ошибка записи файла');
    }
    res.send('Данные успешно записаны');
  });
});

app.listen(5000, () => {
  console.log(`\n\nСервер запущен на порту ${PORT}...\n\n`);
});
