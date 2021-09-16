// 实现函数组合compose
const fn1 = function (x) {
    return x + 1
}
const fn2 = function (x) {
    return x + 2
}
const fn3 = function (x) {
    return x + 3
}


// const compose = function(...args) {
//     // 返回一个接收一个参数的函数
//     return function (value) {
//         // if(!args.length) return value
//         // fn1(fn2(fn3(value))) 
//         return args.reduceRight((acc, cur) => {
//             console.log(cur)
//             return cur(acc)
//         }, value)
//     }
// }

const compose = (...args) => value => args.reduceRight((acc, cur) => cur(acc), value)


const fn = compose()

console.log(fn(5))