// Detect if tcp port is free
async function portIsFree(port) {
    var isPortAvailable = function (port) {
        isPortAvailable.lastError = '';
        return new Promise(resolve => {
            const tester = net.createServer()
                .once('error', err => {                             // catch errors, and resolve false
                    isPortAvailable.lastError = err.code || err;    // EADDRINUSE , EACCES ...
                    resolve(false);
                })
                .once('listening', () =>                            // return true if succed
                    tester.once('close', () => resolve(true)).close())
                .listen(port);
        });
    };
    var status = await isPortAvailable(port);
    if (status) {
        console.log('Port ' + port + ' IS available!');
        return true;
    } else {
        console.log('Port ' + port + ' IS NOT available!');
        console.log('Reason : ' + isPortAvailable.lastError);
        return false;
    }
};
