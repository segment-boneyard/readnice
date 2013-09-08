
# map-element

## Example

```js
var map = require('map-element');

var arr = [1, 2, 3, 4];
var ul = map('ul', arr, function (val) {
  var li = document.createElement('li');
  li.textContent = val;
  return li;
});
```
  
## API

### map(type, array, iterator)