![img](http://i62.tinypic.com/2ui8xmp.jpg)

### requestAnimationFrame & cancelAnimationFrame for optimal cross-browser development.

## request-frame v1.4.1
- Provides a clean polyfill for requestAnimationFrame & cancelAnimationFrame.
- Tested & working on: IE 5.5+, FF 3+, Opera 11.16+, Safari 4+, Chrome 14+, iOS 3+, Android 2.3+, Android Chrome 28+.  
- **iOS 6 bug fix** without user-agent sniffing.
- **Firefox 4 - 10 function mismatch normalization**.
- Doesn't modify native functions unless specified.
- AMD compliant.

### Get request-frame:

#### via npm
```
npm i request-frame --save
```
#### via bower
```
bower i request-frame
```
#### [src](https://github.com/julienetie/request-frame/tree/master/dist)
```
<script src="request-frame.min.js"></script>
```
### The API:
#### Assign the timing functions:
*requestFrame( request | cancel | native )*  request is default. 
```
var request = requestFrame('request'); // window.requestAnimationFrame | setTimeout
var cancel = requestFrame('cancel'); // window.cancelAnimationFrame | cancelTimeout
```
#### Or re/ assign native functions:
```
requestFrame('native'); // re/ declares requestAnimationFrame & cancelAnimationFrame
```
Below is just an example of the requestAnimationFrame API, see links: [MDN](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame), [MSDN](https://msdn.microsoft.com/en-us/library/windows/apps/hh453388.aspx) & [W3](http://www.w3.org/TR/2011/WD-html5-20110525/timers.html). 

#### Loop something:
```
function something( useTimeStamp ){
    
    // Do something here
    
    request(something); 
}

var requestId = request(something); // Assigns Id & calls "something"
```
#### Cancel something:
```
cancel(requestId);  // Cancels frame request 
```

### The ideology
request-frame aims to provide an optimal development consistency with the use of animation timing functions across the large number of browsers and devices. This lib is ideal for those who may want to avoid re-assigning native functions, or avoid interfering with other libs that do. requestFrame() is purposely not a constructor. The intention is for requestAnimationFrame to be used once or few times during execution since multiple task are expected to be more efficient via a single requestAnimationFrame loop compared to several instances.

### Browsers tested & passing:

![img](http://i61.tinypic.com/i1xuzd.jpg)
![img](http://i57.tinypic.com/j7fg2x.jpg)

### Issues
Please report all bugs [here](http://github.com/julienetie/request-frame/issues). 

### Contribute
Just do it!

### Credits & Thanks

Created by [Julien Etienne](https://gist.github.com/julienetie), timestamp polyfill by [ Erik Möller, Paul Irish](http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/) & [Darius Bacon](https://github.com/darius/requestAnimationFrame). Credit to all on this [thread](https://gist.github.com/paulirish/1579671) for sharing great ideas and workarounds.

--- 

[MIT License](https://github.com/julienetie/resizilla/blob/master/LICENSE) 

Copyright (c) 2015 Julien Etienne 
