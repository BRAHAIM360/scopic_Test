# SCOPIC Test

SCOPIC Logo
![SCOPIC](/client/public/images/logo.png)

## Meta

You can find more about each folder by clicking on the folder name

## Get Started

### Perquisites

Make sure you have:

- [Git](https://git-scm.com/)
- [docker](https://www.docker.com/products/docker-desktop)

for development you need to also have

- [Nodejs](https://nodejs.org/) version 14 or higher
- [Yarn](https://yarnpkg.com/) version 1.4.2 or higher

### Run it locally

- Open terminal and clone the repo:

```sh
 git clone https://github.com/BRAHAIM360/scopic_Test.git
```

if you want try it in production mode

- Go to the project root:

```sh
cd scopic_Test
docker-compose up -d
```

The App will be available at <http://localhost:9000>
the app container a creater user with the following credentials to login:
username: user1
password: user1

username: user2
password: user2

username: admin1
password: admin1

username: admin2
password: admin2

if you want try it in development mode

to start the backend
make sure you have docker running

- Go to the project api folder:

```sh
cd api
yarn // to install the dependencies
yarn db:dev:up // to start the database
yarn start:dev // to start the backend
```

The backend will be available at <http://localhost:3333>
and the swagger documentation at <http://localhost:3333/swagger>

to start the backend

- Go to the project client folder:

```sh
cd frontend
yarn // to install the dependencies
yarn dev // to start the frontend
```

The frontend will be available at <http://localhost:3000>

## License

Licensed under the MIT license.
