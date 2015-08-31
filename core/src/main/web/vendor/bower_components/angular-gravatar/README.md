[![Bower version](https://badge.fury.io/bo/angular-gravatar.png)](http://badge.fury.io/bo/angular-gravatar)
[![NPM version](https://badge.fury.io/js/angular-gravatar.png)](http://badge.fury.io/js/angular-gravatar)

[![Build Status](https://travis-ci.org/wallin/angular-gravatar.png?branch=master)](https://travis-ci.org/wallin/angular-gravatar)
[![Code Climate](https://codeclimate.com/github/wallin/angular-gravatar.png)](https://codeclimate.com/github/wallin/angular-gravatar)
angular-gravatar
==============

Angular.JS directive for [Gravatar](http://www.gravatar.com).

Copyright (C) 2015, Sebastian Wallin <sebastian.wallin@gmail.com>

Requirements
-----

* AngularJS (http://angularjs.org)

Install with Bower
-----

```
bower install angular-gravatar
```

Install with NPM
-----

```
npm install angular-gravatar
```

Usage
-----
Include angular-gravatar.js in your application.

```html
<script src="components/angular-gravatar/build/angular-gravatar.js"></script>
```

Add the module `ui.gravatar` as a dependency to your app:

```js
var app = angular.module('app', ['ui.gravatar']);
```

Then use the directive on an image tag and it will set the correct `src`
attribute for you.

```html
<img gravatar-src="'sebastian.wallin@gmail.com'" gravatar-size="100">
```

If the source is already an MD5 hash, it will be left untouched (thanks @thewarpaint)

#### Binding Once

If you know that the source is not going to change, you can use the `gravatar-src-once` instead:

```js
<img gravatar-src-once="user.email">
```

> Note: this directive will watch for a non falsy value and then stop watching.

Configuration
-----

The options that are sent along to Gravatar can be set either
directly in the directive as seen above with `size` or configured as default
parameters via the `gravatarServiceProvider`:

```js
angular.module('ui.gravatar').config([
  'gravatarServiceProvider', function(gravatarServiceProvider) {
    gravatarServiceProvider.defaults = {
      size     : 100,
      "default": 'mm'  // Mystery man as default for missing avatars
    };

    // Use https endpoint
    gravatarServiceProvider.secure = true;

    // Force protocol
    gravatarServiceProvider.protocol = 'my-protocol';
  }
]);
```

Note that by default, no explicit protocol is set. This means that the image will use the protocol with which the page is loaded. For example; if the page url is http://www.example.com the image will be loaded over http, but if the page url is https://www.example.com the image will be loaded over https.

Anyway, you can force the protocol you want (for `https` use `secure = true` instead of `protocol = 'https'` because gravatar url differs for secure/no secure).
For example, if you are developing a mobile app with Cordova you should use `http`. Otherwise directive will use `file` protocol and fail.

All the available options can be seen over at the [Gravatar docs for image
requests](https://sv.gravatar.com/site/implement/images/)

License
-----

MIT

[Contributors](https://github.com/wallin/angular-gravatar/graphs/contributors)
-----
* Alexander Makarenko (https://github.com/estliberitas)
* Eduardo Garcia (https://github.com/thewarpaint)
* Thomas Vervest (https://github.com/tvervest)
* Gonzalo Aguirre (https://github.com/gaguirre)
* Gabe Hayes (https://github.com/gabehayes)
