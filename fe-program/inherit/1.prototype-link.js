// 原型链继承
function Parent () {
    this.name = ['jimmy']
    this.age = 18
}

// 优点：多个实例创建时不会重复创建方法
Parent.prototype.getName = function () {
    console.log(this.name)
}

function Child() {

}

Child.prototype = new Parent()

// 缺点一：创建实例过程中，不能向父类传参
let child1 = new Child()
let child2 = new Child()

// 缺点二：引用类型的属性被所有实例共享
child2.name.push('lzm')
console.log(child1.name)
console.log(child2.age)