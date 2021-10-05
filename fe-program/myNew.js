// 手写new方法

// 需要注意：
// 1. new后面只能是构造函数 
// 2. 要注意构造函数的返回值，且返回值是基本类型
// 3. 
const myNew = function (constructor, ...args) {
    if(typeof constructor !== 'function'){
        throw(`${constructor} is not a constructor`)
    }
    // var obj = Object.create(constructor.prototype)
    // 如果不能用Object.create
    var obj = {}
    obj.__proto__ = constructor.prototype
    // 给新创建的对象传参
    var rst = constructor.call(obj, ...args)
    // 如果传进来的函数有返回值，且这个返回值是基本类型，为了保证new的结果都是对象
    return typeof rst === 'object' ? rst : obj
}