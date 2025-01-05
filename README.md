
# Sociokix

Frontend (React Native + TypeScript + TailwindCSS)

Backend (Node.js + TypeScript + Prisma + PostgreSQL)



## Clone this Repo

To clone this repo run 

```bash
  git clone https://github.com/MjStar24/SociokixAssignment.git
```
## Docker Services

To build docker services run

```bash
  docker-compose build
```
To Start Services run

```bash
  docker-compose up
```
To stop services run

```bash
  docker-compose down
```
## To run backend


```bash
  cd backend
```
Add the env file (sample env provided)

```bash
    DATABASE_URL=
    PORT=4000
```

```bash
   npm install
```
```bash
   npm start
```

To run frontend there is readme file in ./frontend
## To run frontend and backend docker images

Run 

```bash
  cd backend
```
or

```bash
  cd frontend
```

Build the image

```bash
  docker build -t <image_name> .
```
Run the image

```bash
  docker run -it <image_name>

```