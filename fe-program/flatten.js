// 拍平数组
// 不用递归
var flatten = function (arr) {
    while (arr.some(function (item) { return Array.isArray(item); })) {
        arr = [].concat.apply([], arr);
    }
    return arr;
};
var arr = [1, [2, [3, [4, [5, 6]]]]];
console.log(flatten(arr));
