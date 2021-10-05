// 借用构造函数（经典继承）
function Parent (name='li') {
    this.names = ['jimmy', 'lzm', name]
    // 缺点：每次创建实例都会创建一遍方法
    this.getName = function() {
        return this.names
    }
}

function Child (name) {
    // 优点一：可以在Child中向Parent传值
    Parent.call(this, name)
}

let names = [1,2,3]
let child1 = new Child('li')

child1.names.push('zhimeng')
console.log(child1.names)
// 优点一：避免了引用类型的属性被所有实例共享
let child2 = new Child()
console.log(child2.names)
