# Vanilla Async
Lightweight JavaScript version of `async.parallel` and `async.series` functions
without Promises, so they will work in any browser.



### `vanillaAsync.parallel`
```javascript
vanillaAsync.parallel(
  [
    function (callback) { setTimeout(function() { console.log('a'); callback('a'); }, 2000); },
    function (callback) { setTimeout(function() { console.log('b'); callback('b'); }, 3000); },
    function (callback) { setTimeout(function() { console.log('c'); callback('c'); }, 1000); },
  ],
  function (results) {
    console.log(results); // => ["a", "b", "c"]
  }
);

// result in console =>
// c
// a
// b
// ['a', 'b', 'c']
```



### `vanillaAsync.series` (without data)
```javascript
vanillaAsync.series(
  [
    function (callback) { console.log('a'); callback(); },
    function (callback) { console.log('b'); callback(); },
    function (callback) { console.log('c'); callback(); },
  ],
  function (error) {
    console.log(error); // => null
  }
);

// result in console =>
// a
// b
// c
// null
```

```javascript
vanillaAsync.series(
  [
    function (callback) { console.log('a'); callback();             },
    function (callback) { console.log('b'); callback('some error'); },
    function (callback) { console.log('c'); callback();             },
  ],
  function (error) {
    console.log(error); // => 'some error'
  }
);

// result in console =>
// a
// b
// some error
```



### `vanillaAsync.series` (with data)
```javascript
vanillaAsync.seriesWithData(
  'x',
  [
    function (data, callback) { console.log('a'); callback(data + 'a'); },
    function (data, callback) { console.log('b'); callback(data + 'b'); },
    function (data, callback) { console.log('c'); callback(data + 'c'); },
  ],
  function (error, data) {
    console.log('error:', error); // => null
    console.log('data: ', data);  // => 'xabc'
  }
);

// result in console =>
// a
// b
// c
// error: null
// data:  xabc
```

```javascript
vanillaAsync.seriesWithData(
  'x',
  [
    function (data, callback) { console.log('a'); callback(data + 'a');               },
    function (data, callback) { console.log('b'); callback(data + 'b', 'some error'); },
    function (data, callback) { console.log('c'); callback(data + 'c');               },
  ],
  function (error, data) {
    console.log('error:', error); // => 'some error'
    console.log('data: ', data);  // => 'xab'
  }
);

// result in con  sole =>
// a
// b
// error: some error
// data:  xab
```

```javascript
vanillaAsync.seriesWithData(
  'x',
  [
    function (data, callback) { console.log('a'); callback(data + 'a');         },
    function (data, callback) { console.log('b'); callback(null, 'some error'); },
    function (data, callback) { console.log('c'); callback(data + 'c');         },
  ],
  function (error, data) {
    console.log('error:', error); // => 'some error'
    console.log('data: ', data);  // => null
  }
);

// result in con  sole =>
// a
// b
// error: some error
// data:  null
```
