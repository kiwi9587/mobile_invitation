const express = require('express');
const cors = require('cors');
const app = express();
const invitationRouter = require('./routes/invitation');
const galleryRouter = require('./routes/gallery');
const guestbookRouter = require('./routes/guestbook');
const accountRouter = require('./routes/account');
const seedRouter = require('./routes/seed');

// Allow cross-origin requests from frontend dev server
app.use(cors());
app.use(express.json());

app.use('/api', invitationRouter);
app.use('/api/gallery', galleryRouter);
app.use('/api/guestbook', guestbookRouter);
app.use('/api', accountRouter);
app.use('/api/seed', seedRouter);

// 기본 라우트
app.get('/', (req, res) => {
  res.send('Mobile Invitation API');
});

module.exports = app;
