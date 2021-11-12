import { removeNext } from "../../../../remove-next.macro";

export const makeRound = (v) => {
  removeNext();
  const mocks = {
    d1: "11",
    v1: "11",
  };
  round(1.22, 2);
  return round(v);
};

export const makeRound2 = (v) => {
  const mocks = {
    d1: "11",
    v1: "11",
  };
  removeNext();
  round(1.22, 2);
  return round(v);
};
