# Angular Dashboard Example

## Установка

```
git clone https://github.com/r0di0n0v/dashboard-ng-example.git
cd dashboard-ng-example
npm i
```
Запуск echo-сервера
```
node src/backend/index.js
```
Запуск frontend-сервера, дашборд будет доступен по адресу `http://127.0.0.1:4200/`
```
npm run start
```

## Описание проекта
Проект представляет собой пример реализации динамически конфигурируемого дашборда и состоит из 2 страниц: `/` - страница дашборда и `/admin` - страница настройки.

Главная страница `/` отображает активный дашборд в вбыраной конфигурации.

Страница настройки `/admin` позволяет создавать/удалять и редактировать уже созданные дашборды, конфигурации дашбордов сохраняются в `localStorage`.

Настройка дашборда позволяет выбрать из списка шаблон размещения размещения блоков, а так же сконфигурировать сами блоки - способы отображения данных: таблица, число, график, задав им места расположения в шаблоне и источник данных.

Источник данных представляет из себя сервис генерирующий произольную последовательность чисел, источник располагается в angular-приложении и обменивается с блоками дашборда данными при помощи websocket echo-сервера.
