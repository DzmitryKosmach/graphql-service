# Graphql Service

## Установка


### MongoDB

Установить MongoDB любым способом. 
Как вариант, скачать zip архив с официальногьт сайта по ([ссылке](https://github.com/rolling-scopes-school/node-graphql-service)), возможно потребуется череp VPN. Разархивировать в папку `C:\mongodb ` и запусть 

```
C:\mongodb\bin\mongod.exe
```

Запустить консольную оболочку `C:\mongodb\bin\mongo.exe` и создать базу данный с именем `test` введя следующую команду:

```bash
use test
```

### Musicify microservices

Клонировать репозиторий с микросервисами [here](https://github.com/rolling-scopes-school/node-graphql-service). Во всех микросервисах переименрвать файлы .env.example на .env и изменить во всех этих файлах на 
```
"MONGO_URL=mongodb://localhost:27017"
```
Запусть микросервисы:
```bush
npm run run:all
```

Используя postman collecton и enviroment создать юзера `users/register` и залогиниться `users/login`. После этого можно заполнить базу данных.


### Graphql Service
Клонировать по ([ссылке](https://github.com/DzmitryKosmach/graphql-service)) ветка `dev`.
Запуск:
```bush
npm run start
```
или
```bush
npm run dev
```
Запускаем Apollo Server, введя в браузере:
```
http://localhost:3000/graphql
```

Имеющиеся эндпоинты:
- Albums
- Bands
- Favourites
- Genres
- Tracks
- Users
- Artists