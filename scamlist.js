const { exec } = require("child_process");

// downloads file to the current directory (test to see where it downloads, if it needs to go up a few directories i can help)
setInterval(() => {
    exec("curl -L -O raw.githubusercontent.com/skyblockz/pricecheckbot/master/scammer.json", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    });
}, 6*60*60*1000);