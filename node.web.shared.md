**Shared Code**
```javascript
// All the code in this module is enclosed in closure
(function(exports) {

    // Helper function
    function toLC(str) {
        return str.trim().toLowerCase();
    }

    // Function to be exposed
    function getFrequency(str) {
        str = toLC(str);
        var freq = [];
        for(var i = 0; i < 26; i++) {
            freq.push(0);
        }
        for(var i = 0; i < str.length; i++) {
            freq[str.charCodeAt(i)-97]++;
        }
        return freq;
    }

    // Export the function to exports In node.js this will be exports the module.exports
    // In browser this will be function in the global object sharedModule
    exports.getFrequency = getFrequency;

})(typeof exports === 'undefined'? this['sharedModule']={}: exports);
```
---

**node js**
```javascript
// Simple node.js script which uses sharedModule.js

// Get module.exports of sharedModule
const utilities = require('./sharedModule');

// Print ferquency of character
console.log(utilities.getFrequency("GeeksForGeeks"));
```
---

**WEB Side**

clientApp.js
```javascript
// Use functionality getFrequency which is available in sharedModule object 
document.write(this.sharedModule.getFrequency("GeeksForGeeks"));  
```

index.html
```html
<script src="./sharedModule.js"></script> 
<script src="./clientApp.js"></script> 
```
