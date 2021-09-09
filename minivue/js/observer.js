class Observer {
    constructor (data) {
        this.walk(data)
    }

    walk (data) {
        // 1. 判断data是否是对象
        if(!data || typeof data !== 'object') {
            return
        }
        // 2. 遍历data对象的所有属性
        Object.keys(data).forEach(key => {
            this.defineReactive(data, key, data[key])
        })

    }

    defineReactive (obj, key, val) {
        const self = this
        let dep = new Dep()
        // 如果val是对象，则会递归转换getter/setter
        this.walk(val)
        Object.defineProperty(obj, key, {
            enumerable: true,
            configurable: true,
            get () {
                // 收集依赖
                Dep.target && dep.addSub(Dep.target)
                // 这里为啥不能用obj[key],因为obj[key]会隐式的调用这个get方法，陷入死循环
                return val
            },
            set (newValue) {
                if (val === newValue){
                    return
                }
                val = newValue
                // 将新值也转成响应式
                self.walk(newValue)
                // 发送通知
                dep.notify()
            }
        })
    }
}