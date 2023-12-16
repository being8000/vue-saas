export enum DT {
  Undefined = "[object Undefined]",
  Null = "[object Null]",
  String = "[object String]",
  Number = "[object Number]",
  Boolean = "[object Boolean]",
  Array = "[object Array]",
  Object = "[object Object]",
}
type DTKey = keyof typeof DT;
export const is = (o: any, type: DTKey) => {
  return Object.prototype.toString.call(o) === DT[type];
};

export const autoIncreaseID = (function () {
  let id = 0;
  return function () {
    id++;
    return id;
  };
})();
