import app from '.';

const PORT = process.env.PORT || 5555;

app.listen(PORT, (): void => {
  console.log(`Server Running here 👉 http://localhost:${PORT}`);
});
