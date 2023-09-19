# Quizless

Quizless is a fullstack quizlet clone with GPT integration (before quizlet did it)

## Installation

The project is divided into a frontend react client library and backend node & express

```
npm install
cd client
npm install
cd ..
cd server
npm install
```

## Usage

npm start script in root folder uses concurrently 
to simultaneously run server and client 

The environment variables are atlas and openai keys & jwt secret. 
If you want to run this on your own computer, you can write in your own variables using dotenv

```
npm start
```

## Contributing

This project is semi-archived; I'm still using it but there are no major changes planned

Pull requests are welcome.

## License

[MIT](https://choosealicense.com/licenses/mit/)
