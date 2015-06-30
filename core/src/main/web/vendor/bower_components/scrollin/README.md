<h1 align="left"> Scrollin </h1>
<p align="center">
  <img alt="scrollin" width="300px" align="left" src="https://cloud.githubusercontent.com/assets/883126/7601542/595b08ce-f8e5-11e4-9ba5-ee868f3004b9.png"/>
</p>
**Do something great when an element enters the viewport.**

</br></br></br></br></br></br></br></br></br>
### Install
<h4>
  <pre align="center">npm i scrollin</pre>
  <pre align="center">bower i scrollin</pre>
</h4>

### Use
```js
Scrollin.track(document.querySelector('#hi'), {handler: () => alert('hi!')})
```

## API

* `Scrollin.track(document.querySelector('#hi'), {handler: () => alert('hi!')})`
* `Scrollin.untrackAll()`
* `Scrollin.untrack(document.querySelector('#hi'))`
* `Scrollin.checkForVisibleElements()`

### Dev

* `npm i`
* `npm run dev`

#### Building

* `npm run compile`

#### Polyfill Caveats

* You may need to polyfill `window.requestAnimationFrame`
* You may need to polyfill `Array.prototype.splice`
* You may need to polyfill `Array.prototype.some`

📜
