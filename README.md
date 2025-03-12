# Todo App

## Installation

Intall Todo App:

```
git clone https://github.com/Timo-Turtiainen/todo-app.git
cd todo-app\client
npm install
cd todo-app\server
npm install
npm run start
```

### Usage

Create your own .env file to todo-app/server/.env

```
MONGODB_URI = <your mongo database url with username & password>
PORT= <server runs on port>
SECRET= <your own password hash>
```

Create first user: Run script that found server\request\post_users.rest

## Features

### Registration

![Registration page](https://github.com/Timo-Turtiainen/todo-app/blob/main/client/public/registration.png)

### Login

![Login page](https://github.com/Timo-Turtiainen/todo-app/blob/main/client/public/login.png)

### Add Todos with Priority

![Add Todo](https://github.com/Timo-Turtiainen/todo-app/blob/main/client/public/add-todo.png)

### Mark completed tasks

![Completed Task](https://github.com/Timo-Turtiainen/todo-app/blob/main/client/public/checked-todo.png)

### Update existing todos

![Update Todo](https://github.com/Timo-Turtiainen/todo-app/blob/main/client/public/update-todo.png)

### Delete todos

![Delete Todo](https://github.com/Timo-Turtiainen/todo-app/blob/main/client/public/delete-todo.png)

### Count completed tasks and roughly expended time

![Count tasks and time](https://github.com/Timo-Turtiainen/todo-app/blob/redux/client/public/todo-slice.png)

### Localization

![localization](https://github.com/Timo-Turtiainen/todo-app/blob/main/client/public/localization.png)

### Search tasks

![search](https://github.com/Timo-Turtiainen/todo-app/blob/main/client/public/search.png)
