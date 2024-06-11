# MovieApp

This is a simple movie listing application built with React and TypeScript.

## Directory Structure

```
.
├── .gitignore
├── backend/
│   ├── .env
│   ├── config.js
│   ├── models/
│   │   └── Movie.ts
│   ├── package.json
│   ├── routes/
│   │   └── default.ts
│   ├── server.js
│   └── tsconfig.json
├── documentation/
│   ├── apiQueries/
│   │   └── get_movies.md
│   └── database/
│       ├── postgres_setUp.md
│       └── postgress_setTable_insertValues.md
├── frontend/
│   ├── components/
│   │   └── MovieList.tsx
│   ├── package.json
│   ├── public/
│   │   ├── index.html
│   │   └── index.tsx
│   └── tsconfig.json
├── README.md
└── webpack.config.js
```

## Running Locally

To run this project locally, you'll need to have Node.js and npm installed on your machine. This project is broken into two parts. The frontend (React pages) and the backend. You will need both running for the app to work.

1. First, clone the repository to your local machine:

```sh
git clone https://github.com/LiamRussellNZ/movieApp.git
```

2. Navigate into the project directory:

```sh
cd movieapp
```

3. Start the frontend:
    a.  Navigate to the frontend folder:

```sh
cd frontend
```

    b. Install Node packages for frontend:

```sh  
npm install
```

    c. Start the frontend:
```sh  
npm run start
```

4. Start the backend:

    a.  Navigate to the backend folder:

```sh
cd backend
```

    b. Install Node packages for frontend:

```sh  
npm install
```

    c. Start the frontend:
```sh  
node server.js
```

The application should now be running at `http://localhost:8080`.
