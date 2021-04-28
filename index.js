const cp = require('child_process');

const runI3msgCommand = (command, cb) =>
  cp.exec(`i3-msg --type ${command}`, (error, stdout, stderr) => {
    if (error) {
      return console.error(error);
    }

    console.log(stdout);
    console.error(stderr);
    cb && cb(stdout);
  });

runI3msgCommand('get_tree', (stdout) => {
  console.log(JSON.parse(stdout));
});
