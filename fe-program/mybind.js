// call思路

Function.prototype.call = Function.prototype.call || function (ctx, ...args) {
    if (typeof this !== "function") {
        throw new Error("Function.prototype.bind - what is trying to be bound is not callable");
    }
  // ctx为null则为window
  ctx = ctx || window;
  const fn = Symbol();
  ctx[fn] = this;
  const rst = ctx[fn](...args)
  delete ctx[fn]
  return rst;
};

Function.prototype.bind = function (ctx, ...args) {
    if (typeof this !== "function") {
        throw new Error("Function.prototype.bind - what is trying to be bound is not callable");
    }
    ctx = ctx || window;
    let fn = Symbol();
    ctx[fn] = this;
    var fBound = function (...args2) {
        // 如果不用apply
        // ctx[fn]是外部的this,指向执行bind的函数
        // 内部的this指向实例
        this[fn] = ctx[fn]
        return this instanceof ctx[fn] ? this[fn](...[...args, ...args2]) : ctx[fn](...[...args, ...args2])
        // return ctx[fn].apply(this instanceof ctx[fn] ? this : ctx, [...args, ...args2]);
    }
    fBound.prototype = Object.create(this.prototype)
    return fBound;
};

Function.prototype.bind = function (ctx, ...args) {
    if (typeof this !== "function") {
      throw new Error("Function.prototype.bind - what is trying to be bound is not callable");
    }
    const _this = this;
    var fBound = function (...args2) {
        return _this.apply(this instanceof _this ? this : ctx, [...args, ...args2]);
    }
    fBound.prototype = Object.create(this.prototype)
    return fBound;
}

var value = 2;

var foo = {
    value: 1
};

function bar(name, age) {
    this.habit = 'shopping';
    console.log(this.value);
    console.log(name);
    console.log(age);
}

bar.prototype.friend = 'kevin';

var bindFoo = bar.bind(foo, 'daisy');

var obj = new bindFoo('18');
// undefined
// daisy
// 18
console.log(obj.habit);
console.log(obj.friend);
// shopping
// kevin