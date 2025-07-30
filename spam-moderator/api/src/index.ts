import express from 'express';
import cors from 'cors';
import postsRouter from './routes/posts';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/posts', postsRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
