/**
 * UUID - v4 Unique Identifier v4 (https://www.ietf.org/rfc/rfc4122.txt)
 * @return {string} es: "9f153d57-e713-44ed-9db2-f0d5dbcdfc53"
 */
function UUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};
