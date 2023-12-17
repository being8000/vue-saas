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

// export function debounce<T extends (...args: any[]) => any>(
//   cb: T,
//   wait: number
// ) {
//   let h: any;
//   const callable = (...args: any) => {
//     clearTimeout(h);
//     h = setTimeout(() => cb(...args), wait);
//   };
//   return <T>(<any>callable);
// }

/**
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
function debounce<T>(func: any, wait: any, immediate: any) {
  let timeout: any, _args: any, context: any, timestamp: any, result: any;

  const later = function () {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp;

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, _args);
        if (!timeout) context = _args = null;
      }
    }
  };

  return function (...args: any) {
    context = this;
    _args = args;
    timestamp = +new Date();
    const callNow = immediate && !timeout;
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }

    return result;
  };
}
