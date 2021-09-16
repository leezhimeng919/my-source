// 拍平数组

// 不用递归
const flatten: Function = function (arr: any): Array<number> {
    while(arr.some((item:any) => Array.isArray(item))){
        arr = [].concat(...arr)
    }
    return arr
}

const arr: any = [1, [2, [3, [4, [5, 6]]]]]

console.log(flatten(arr))