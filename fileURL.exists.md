# Check if a file exists
#### watch out for cross domain or same origin policy issues
Plain javascript (synchronous)
```
function fileExists(url){
    var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    return http.status != 404;
}
```
jQuery asynchronous http request
```
$.get(url)
    .done(function() { 
        // Do something now you know file exists.
    }).fail(function() { 
        // Do something else, file doesn't exists.
    })
```
