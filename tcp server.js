//
// Usage:  node TCPServer.js
//

// Import net module.
var net = require('net');

// Create and return a net.Server object, the function will be invoked when client connect to this server.
var server = net.createServer(function(client) {
    console.log('+++ Connect. Address: '+client.localAddress+':'+client.localPort+'.     Client: ' + client.remoteAddress + ':' + client.remotePort);
    client.setEncoding('utf-8');
    client.setTimeout(1000);

    // When receive client data.
    client.on('data', function (data) {
        // Print received client data and length.
        hexDump = data.split('').map(function (c) { return c.charCodeAt(0).toString(16); }).join(' ');
        console.log('<<< ['+data+']  Size:'+client.bytesRead+' ['+hexDump+']');
        // Server send data back to client use client net.Socket object.
        // client.end('Server received data : '+data+', send back to client data size : ' + client.bytesWritten);
        client.end('Re:'+data);
    });

    // When client send data complete.
    client.on('end', function () {
        console.log('+++ Client disconnect.');
        // Get current connections count.
        server.getConnections(function (err, count) {
            if (!err) {
                // Print current connection count in server console.
                console.log("+++ Connections %d", count);
            } else {
                console.error('!!! '+JSON.stringify(err));
            }

        });
    });
    // When client timeout.
    client.on('timeout', function () {
        console.log('+++ Timout Client');
    })
});


// Make the server a TCP server listening on port 9100
server.listen(9100, function () {
    // Get server address info.
    var serverInfo = server.address();
    var serverInfoJson = JSON.stringify(serverInfo);
    console.log('\nTCP server listen on address : '+serverInfoJson+'\n');
    server.on('close', function () {
        console.log('+++ TCP server socket is closed.');
    });
    server.on('error', function (error) {
        console.error('!!! '+JSON.stringify(error));
    });
});
