import { removeNextJSX } from "../../../../remove-next.macro";

import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';

const SFC_Inner_MyComponent = observer((props) => {
  const [counter, setCounter] = useState(0);

  return <div style={props.styles.blue}>
    
   	{removeNextJSX()}
    <div>will be removed</div>
  
  </div>;
});

