const net = require('net');

class sServer {
    constructor() {
        this._server = false;
        this._callbackInit = () => {};
        this._callbackClientInit    = (_server, _socket) => {};
        this._callbackClientTimeout = (_server, _socket) => {};
        this._callbackClientError   = (_server, _socket, _err) => {};
        this._callbackClientReceive = (_server, _socket, _data) => {};
    } /**/
    set callbackInit(fun) {
        if (typeof fun === 'function') {
            this._callbackInit = fun;
        }
    } /**/
    set callbackClientInit(fun) {
        if (typeof fun === 'function') {
            this._callbackClientInit = fun;
        }
    } /**/
    get callbackClientInit() {
        return this._callbackClientInit;
    } /**/
    set callbackClientReceive(fun) {
        if (typeof fun === 'function') {
            this._callbackClientReceive = fun;
        }
    } /**/
    get callbackClientReceive() {
        return this._callbackClientReceive;
    } /**/
    set callbackClientTimeout(fun) {
        if (typeof fun === 'function') {
            this._callbackClientTimeout = fun;
        }
    } /**/
    get callbackClientTimeout() {
        return this._callbackClientTimeout;
    } /**/
    set callbackClientError(fun) {
        if (typeof fun === 'function') {
            this._callbackClientError = fun;
        }
    } /**/
    get callbackClientError() {
        return this._callbackClientError;
    } /**/
    open(socketPort) {
        // Server init
        this._server = net.createServer();
        this._server.listen(socketPort, '0.0.0.0', () => {  // ANY interface
            console.log("TCP Server running on [localhost:"+socketPort+"]");
            this._callbackInit();
        });
        // Client connection
        this._server.sockets = [];
        this._server.callbackClientInit    = this.callbackClientInit;
        this._server.callbackClientError   = this.callbackClientError;
        this._server.callbackClientReceive = this.callbackClientReceive;
        this._server.callbackClientTimeout = this.callbackClientTimeout;
        this._server.shutdown = function() {
            console.log("server [Shutdown ]");
            this.close();
            for (var socketId in this.sockets) {
                console.log('client [Shutdown ] ' + this.sockets[socketId].remoteAddress + ':' + this.sockets[socketId].remotePort + ' connection closed');
                this.sockets[socketId].destroy();
            }
        };
        this._server.on('connection', function(sock) {
            console.log('client [Connected] ' + sock.remoteAddress + ':' + sock.remotePort);
            sock.send = sock.write;
            sock.setEncoding('utf-8');
            sock.setTimeout(1000);
            this.sockets.push(sock);
            this.callbackClientInit(this, sock);        // [this] is [this._server] on object level
            // Data receive from client
            sock.on('data', function(data) {
                console.log('client [DataInput] '+sock.remoteAddress+':'+sock.remotePort+' << ' + String(data).trim());
                this._server.callbackClientReceive(this._server, sock, data);
            });
            // Client Timeout
            sock.on('timeout', function() {
                console.log('client [Timeout  ] '+sock.remoteAddress+':'+sock.remotePort);
                this._server.callbackClientTimeout(this._server, sock);
            });
            // Error handling on client
            sock.on('error', function(error) {
                console.log('client [Error    ] '+sock.remoteAddress+':'+sock.remotePort+' '+String(error));
                this._server.callbackClientError(this._server, sock, error);
            });
            // Closing client connection
            sock.on('close', function(_data) {
                let index = this._server.sockets.findIndex(function(o) {
                    return o.remoteAddress === sock.remoteAddress && o.remotePort === sock.remotePort;
                })
                if (index !== -1) {
                    this._server.sockets.splice(index, 1);
                }
                console.log('client [Closed   ] ' + sock.remoteAddress + ':' + sock.remotePort);
            });
        });
    } /**/
    isOpen() {
        try {
            return this._server.listening;
        } catch (_error) {
            return false;
        }
    } /**/
    close() {
        try {
            this._server.shutdown();
        } catch (_error) { }
    } /**/
    shutdown() {    // Alias of close()
        this.close();
    } /**/
} /**/


// Test code
let server = new socketServer();
server.callbackInit = function() {
    console.log('Connected');
};
server.callbackClientInit = function(_server, _socket) {
    console.log('Client Init')
};
server.callbackClientError = function(_server, _socket, error) {
    console.log('Client Error >>> '+String(error));
};
server.callbackClientTimeout = function(_server, _connection) {
    console.log('Client Timeout');
};
server.callbackClientReceive = function(server, connection, data) {
    var command = String(data).trim();
    console.log("Client Data << "+command);
    if (command == "exit") {
        connection.end();
    } else if (command == "shutdown") {
        server.shutdown();
    } else {
        connection.send("Re:"+command+"\n");
    }
};
server.open(2712);


// Export
exports.socketServer = socketServer;
