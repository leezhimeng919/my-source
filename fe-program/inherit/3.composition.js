// 组合继承（原型链继承+经典继承）
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

Child.prototype = new Parent()
Child.prototype.constructor = Child

var child1 = new Child('kevin', '18')
child1.colors.push('black')

console.log(child1.name) // kevin
console.log(child1.age) // 18
console.log(child1.colors) // ["red", "blue", "green", "black"]

var child2 = new Child('daisy', '20')

console.log(child2.name) // daisy
console.log(child2.age) // 20
console.log(child2.colors) // ["red", "blue", "green"]

// 优点
// 1. 所有实例的引用类型的属性不会共享
// 2. 所有方法在实例创建时不会重复创建
// 3. 可以向父类传参

// 缺点
// 1. 调用了两次父构造函数
//      1. 创建子实例时：Parent.call(this, name)
//      2. 设置子类原型时：Child.prototype = new Parent()
// 导致：实例原型(Child.prototype)和实例(child1)上都有相同属性