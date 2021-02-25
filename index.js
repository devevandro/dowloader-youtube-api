const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const ytdl = require('ytdl-core');

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.get('/teste', (req, res) => {
    return res.json({message: 'API OK!'});
});

app.use(cors());

app.post('/download', async (req, res) => {
    const { url } = req.body;
    const { format } = req.body;

    try {
        const info = await ytdl.getInfo(url);
        ytdl(url)
        .pipe(fs.createWriteStream(format === 'mp3' ? `files/${info}.mp3` : `files/${info}.mp4`));
    } catch (error) {
        res.status(500).json(error);
    }
});

const port = process.env.PORT || 6500;
app.listen(port);
