import express, { Request, Response, Application } from 'express';

const app: Application = express();

const PORT = process.env.PORT || 5555;

app.get('/', (req: Request, res: Response): void => {
  res.send('WMATA metro times!');
});

app.listen(PORT, (): void => {
  console.log(`Server Running here 👉 https://localhost:${PORT}`);
});
