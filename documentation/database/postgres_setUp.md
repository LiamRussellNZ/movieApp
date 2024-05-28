Currently the app uses a local (installed on the same device) of Postgres.
Download Postgress from [https://www.postgresql.org/](https://www.postgresql.org/)

To connect your instance using psql (a command line ultility):
1. On the command line navigate to the PostgreSQL bin Directory:

Change to the directory where PostgreSQL is installed. For example:
```sh
cd "C:\Program Files\PostgreSQL\xx\bin"
```

Replace xx with your PostgreSQL version number.

2. Connect to PostgreSQL Using psql:

Run the following command:
```sh
psql -U postgres
```
Using Powershell this command worked:
```sh
.\psql -U postgres
```

Enter the password you set during the installation when prompted.

Create your database
```sh
CREATE DATABASE movies;
```

Use the command below to connect to the database 
```sh
\c movies
```

If all is well you should see the message below in your terminal
```
You are now connected to database "movies" as user "postgres".
```