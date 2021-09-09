# Vuex学习之购物车案例

## 分析：三个组件
1. 商品列表组件
2. 购物车列表组件
3. 我的购物车组件（弹出窗口）

## 商品列表组件
1. 展示商品列表功能
   1. products模块中
      1. state中添加products数组
      2. mutations中添加setProducts的方法用来修改products
      3. actions中添加getProducts方法。此方法通过axios请求接口获取products的数据data，然后通过commit(setProducts, data)变更products的状态
   2. 页面中
      1. 通过mapState和mapActions指定命名空间注入配置
      2. 在create钩子中执行getProducts方法 
2. 添加购物车功能
   1. cart模块中
      1. state中添加cartProducts数组
      2. mutations中添加addToCart(state, payload)方法，此时payload应该是products里的元素
         1. 当cartProducts中有该商品，只增加数量count和重新计算该商品总价totalPrice
         2. 如果cartProducts没有该商品，则push进去并新增count、totalPrice、isCheck属性
   2. products页面中
      1. 通过mapMutations指定命名空间注入方法
      2. 在添加购物车按钮注册click事件调用addToCart方法，并使用插槽传入scope.row即选中的product数据
   
         
## 我的购物车组件（弹出窗口）
1. 展示购物车列表
   1. 方法同展示商品列表，传入数据不同
2. 删除商品
   1. cart模块中
      1. 在mutations中新增deleteProduct(state, payload)方法，此时payload应该是productId
         1. 通过id和Array.findIndex方法找到待删除商品在cartProducts的小标
         2. 使用Array.splice删除该商品
   2. pop-cart组件页面中
      1. 通过mapMutations和指定命名空间注入方法
      2. 在删除按钮上注册click事件，并通过插槽的scope.row.id传入productId
3. 统计数据
   1. cart模块中
      1. 在getters中添加两个计算属性，用来计算totalCount和totalPrice
   2. pop-cart组件页面中
      1. 使用mapGetters注入两个计算属性，并使用模板或者v-bind绑到视图上

## 购物车列表组件
1. 展示购物车列表
   1. 同我的购物车组件
2. 全选和选中
3. 数字文本框加减功能
4. 删除
   1. 同我的购物车组件
5. 统计选中商品的数量和总价