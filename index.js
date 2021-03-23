const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const ytdl = require('ytdl-core');

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.get('/teste', (req, res) => {
    return res.json({ message: 'API OK!' });
});

app.use(cors());
app.use(express.static(path.join(__dirname)));

app.post('/download', async (req, res) => {
    try {
        const { url } = req.body;
        const info = await ytdl.getInfo(url);

        ytdl(url)
        .pipe(fs.createWriteStream(`C:/temp/${info.videoDetails.title}.mp3`))
        .on('finish', () => res.status(200).json({ file: `${info.title}.mp3`}));
    } catch (error) {
        res.status(500).json(error);
    }
});

const port = process.env.PORT || 6500;
app.listen(port);
