const cp = require('child_process');
const express = require('express');
const cors = require('cors');
const app = express();

const runI3msgCommand = (command, cb) =>
  cp.exec(`i3-msg --type ${command}`, (error, stdout, stderr) => {
    if (error) {
      return console.error(error);
    }

    console.error(stderr);
    cb && cb(stdout);
  });

const validCommands = []

app.use(cors({
  origin: 'http://localhost:3000'
}));

// TODO: Clean output!
app.get('/:command', (req, res) => {
  runI3msgCommand(req.params.command, (stdout) => {
    res.json(JSON.parse(stdout));
  });
});

app.listen(8080);
