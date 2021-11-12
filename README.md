# babel-plugin-remove-next

> The aim of this babel plugin is to remove mock from production build.

## Installation

```js
npm install --save-dev babel-plugin-remove-next
```

## Usage

### Config
in `.babelrc` file:

```js
{
  "plugins": [
    ["babel-plugin-remove-next"]
  ]
}
```

### In your code
add the comment line `// babel-plugin-remove-next` before the code you want to remove:

```js
import { readFileSync } from "fs";
import { round } from "mathjs";
export const makeRound = v => {
  // babel-plugin-remove-next
  function mocksFunc() {
		round(1.22, 2);
	};
  round(1.22, 2);

  return round(v);
};
```
↓↓↓↓↓↓

```diff
import { readFileSync } from "fs";
import { round } from "mathjs";
export const makeRound = v => {
-  // babel-plugin-remove-next
-  function mocksFunc() {
-		round(1.22, 2);
-	};
  round(1.22, 2);

  return round(v);
};
```

### For JSX
in JSX, we need make a little changes, by using a empty JSX expression block`{/* babel-plugin-remove-next */}` 

```JSX
import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';

const SFC_Inner_MyComponent = observer((props) => {
  const [counter, setCounter] = useState(0);

  return <div style={props.styles.blue}>
    
   	{/* babel-plugin-remove-next */}
    <div>will be removed</div>
  
  </div>;
});
```
↓↓↓↓↓↓
```diff
import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';

const SFC_Inner_MyComponent = observer((props) => {
  const [counter, setCounter] = useState(0);

  return <div style={props.styles.blue}>
    
-   {/* babel-plugin-remove-next */}
-    <div>will be removed</div>
  
  </div>;
});
```
