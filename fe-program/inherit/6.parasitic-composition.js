// 寄生组合式继承

function Parent (name) {
    this.name = name;
    this.colors = ['red', 'blue', 'green']
}

Parent.prototype.getName = function () {
    return this.name
}

function Child (name, age) {
    Parent.call(this, name)
    this.age = age
}

// 1. 纯原生

// function object(o) {
//     function F() {}
//     F.prototype = o;
//     return new F();
// }

// function prototype(child, parent) {
//     var prototype = object(parent.prototype);
//     prototype.constructor = child;
//     child.prototype = prototype;
// }
// // 当我们使用的时候：
// prototype(Child, Parent);


// 2.使用Object.create()，这里操作了两次原型

Child.prototype = Object.create(Parent.prototype)
// 回忆组合式：Child.prototype = new Parent()
Child.prototype.constructor = Child

// 优化，操作一次原型，但是多了一个变量，空间换时间
const prototype = Object.create(Parent.prototype)
prototype.constructor = Child
Child.prototype = prototype


