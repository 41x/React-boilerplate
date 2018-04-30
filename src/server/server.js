import express from 'express';
import path from 'path';
import cors from 'cors';

const app = express();

app.use(cors());

// We're going to serve up the public
// folder since that's where our
// client bundle.js file will end up.
app.use(express.static('public'));

app.get('*', (req, res, next) => {
    res.sendFile(`${path.resolve(__dirname)}/public/index.html`);
});

app.listen(3000, () => {
    console.log('Server is listening on port: 3000');
});
