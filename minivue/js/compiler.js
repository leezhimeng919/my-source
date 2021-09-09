const EventType = ['click', 'dbclick']

class Compiler {
    constructor (vm) {
        this.el = vm.$el
        this.vm = vm
        this.compile(this.el)
    }
    // 编译模板，处理文本节点和元素节点
    compile (el) {
        let childNodes = el.childNodes
        Array.from(childNodes).forEach( node => {
            if (this.isTextNode(node)) {
                // 处理文本节点
                this.compileText(node)
            } else if (this.isElementNode(node)) {
                // 处理元素节点
                this.compileElement(node)
            }

              // 判断node节点是否有子节点，如果有子节点，要递归
            if (node.childNodes && node.childNodes.length) {
                this.compile(node)
            }
        })

      
    }
    // 编译元素节点，处理指令
    compileElement (node) {
        // console.dir(node)
        // 遍历所有的属性节点
        Array.from(node.attributes).forEach(attr => {
            let attrName = attr.name
            // 判断是否是指令
            if( this.isDirective(attrName) ) {
                // 'v-text' -> 'text'
                attrName = attrName.substr(2)
                let key = attr.value
                this.update(node, key, attrName)
            }
        })
    }
    // 拓展指令时，只需要添加Updater方法
    update(node, key, attrName) {
        let updateFn, updateEventType
        if(!attrName.includes(':')){
            updateFn = this[attrName + 'Updater']
        }else {
            let attrNameArr = attrName.split(':')
            updateFn = this[attrNameArr[0] + 'Updater']
            updateEventType = attrNameArr[1]
        }
        updateFn  && updateFn.call(this, node, this.vm[key], key, updateEventType)

    }

    // 处理v-text指令
    textUpdater(node, value, key) {
        node.textContent = value
        // 创建watcher对象
        new Watcher(this.vm, key, (newValue) => {
            node.textContent = newValue
        })
       
    }

    // 处理v-html指令
    htmlUpdater(node, value, key) {
        node.innerHTML = value
        // 创建watcher对象
        new Watcher(this.vm, key, (newValue) => {
            node.innerHTML = newValue
        })
       
    }

    
     // 处理v-on指令
     onUpdater(node, value, key, eventType) {
        //  如果key是一个方法
        let handler = this.vm.$options.methods[key]
        
        if(typeof handler === 'function'){
            // EventType = ['click', 'dbclick']
            EventType.includes(eventType) && node.addEventListener(eventType, () => {
                handler()
            })
        } 
        // 如果key是方法，则按视为一行js语句处理
        else (
            eval(key)
        )
    }

    // 处理v-model指令
    modelUpdater(node, value, key) {
        node.value = value
        // 创建watcher对象
        new Watcher(this.vm, key, (newValue) => {
            node.value = newValue
        })
         // 实现双向绑定
         node.addEventListener('input', () => {
            this.vm[key] = node.value 
        })
    }

    // 编译文本节点，处理插值表达式
    compileText (node) {
        // console.dir(node)
        // 非贪婪模式
        let reg = /\{\{(.+?)\}\}/
        let value = node.textContent
        if (reg.test(value)) {
            // string.trim()去空格
            let key = RegExp.$1.trim()
            node.textContent = value.replace(reg, this.vm[key])
             // 创建watcher对象
            new Watcher(this.vm, key, (newValue) => {
                node.textContent = newValue
            })
        }

       
    }
    // 判断元素属性是否是指令
    isDirective (attrName) {
        return attrName.startsWith('v-')
    }
    // 判断节点是否是文本节点
    isTextNode (node) {
        return node.nodeType === 3
    }

    // 判断节点是否是元素节点
    isElementNode (node) {
        return node.nodeType === 1
    }

}