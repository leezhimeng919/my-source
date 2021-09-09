class Vue {
    constructor (options) {
        // 1. 接收初始化的参数
        this.$options = options || {}
        this.$data = options.data || {}
        this.$el = typeof options.el === 'string' ? document.querySelector(options.el) : options.el
        // 2. 把data中的属性转成getter/setter，注入到Vue实例中,即可直接访问
        this._proxyData(this.$data)
        // 3. 调用Observer监听data中所有属性的变化
        new Observer(this.$data)
        // 4. 调用Compiler解析指令/插值表达式
        new Compiler(this)
    }

    _proxyData (data) {
        Object.keys(data).forEach(key => {
            Object.defineProperty(this, key, {
                enumerable:true,
                configurable:true,
                get () {
                    return data[key]
                },
                set(newValue) {
                    if(newValue === data[key]) {
                        return
                    }
                    data[key] = newValue
                }
            })
        })
    }
}