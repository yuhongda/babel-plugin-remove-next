export const resultTransformSnapshot = `
import { readFileSync } from "fs";
import { round } from "mathjs";
export const makeRound = v => {
  round(1.22, 2);

  return round(v);
};`

export const resultJSXTransformSnapshot = `
import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';

const SFC_Inner_MyComponent = observer((props) => {
  const [counter, setCounter] = useState(0);

  return <div style={props.styles.blue}></div>;
});`


