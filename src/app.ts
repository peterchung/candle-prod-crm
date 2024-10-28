import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import routes from './routes';
import path from 'path';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.static('client/build'));
app.use(bodyParser.json());
app.use(routes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.listen(port, () =>
  console.log(`Quickstart app listening at http://localhost:${port}`)
);

export default app;
