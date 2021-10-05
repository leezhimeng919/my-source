// 寄生式继承
function createObj (o) {
    var clone = Object.create(o)
    clone.sayName = function () {
        console.log('hi')
    }
    return clone
}

// Child.prototype = createObj(Parent.prototype)

// 缺点：同借用构造函数，每次创建实例都会重复创建方法