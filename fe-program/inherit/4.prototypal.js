// 原型式继承

// Object.create的实现原理
function createObj(o) {
    // o是一个原型
    function F(){}
    F.prototype = o
    return new F()
}

var person = {
    name: 'kevin',
    friends: ['daisy', 'kelly']
}

var person1 = createObj(person);
var person2 = createObj(person);

person1.name = 'person1';
console.log(person2.name); // kevin

person1.friends.push('taylor');
console.log(person2.friends); // ["daisy", "kelly", "taylor"]

// 缺点：同原型链继承一样，会共享属性
// person1.name是自己的name，person2.name是原型person上的name