# Scandiweb Test Assignment

SCOPIC Logo
![SCOPIC](/client/public/images/logo.png)

## Meta

You can find more about each folder by clicking on the folder name

## Get Started

### Perquisites

Make sure you have:
for production

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

if you want try it in development mode

to start the backend

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
