一、路由组件和非路由组件的区别
    1、路由组件一般放在pages|views文件夹中，非路由组件放在components文件夹中
    2、路由组件一般在router文件夹中进行注册，非路由组件使用时一般都是以标签的形式
    3、注册完路由，不管是路由组件还是非路由组件身上都具有 $route $router属性
    注：
        $route属性:一般获取路由信息【路径、query、params等】
        $router属性:一般进行编程式路由导航进行路由跳转【push | replace】
二、路由的跳转
    两种方式：
        声明式导航router-link，可以进行路由的跳转
        编程式导航push|replace，可以进行路由的跳转

三、路由传参(面试题)
    1、路由传参（对象写法）path可以和params参数一起使用吗？
    答：不能，params只能与name一起使用
    2、如何指定params参数可传可不传？
        如果路由要求传递params参数(配置了params占位)，但你就不传params参数，URL会有问题
        要想控制params参数是否传递，可以再配置路由的时候，在占位后面加上一个 ‘?’
    3、params参数可以传递也可以不传递，但如果传递是空串，如何解决？
        使用undefined解决：params参数可以传递，可以不传递（空的字符串---URL出现问题）
        ==> this.$router.push(name:'search',params:{'' || undefined});
    4、路由组件能不能传递props数据？
    答：可以，有三种写法（均是在路由配置中）
        //第一种写法：props值为对象，该对象中所有的key-value的组合最终都会通过props传给Detail组件
        // props:{a:900}
        //第二种写法：props值为布尔值，布尔值为true，则把路由收到的所有params参数通过props传给Detail组件
        // props:true
        //第三种写法：props值为函数，该函数返回的对象中每一组key-value都会通过props传给Detail组件

四、编程式路由跳转到当前路由（参数不变），多次执行控制台会抛出NavigationDuplicated 警告错误
    --声明式导航无此问题
    为何会出现：
        最新vue-router引入了promise，调用push|replace时，还需要传递成功/失败的回调

    如何解决：--> 重写push ， replace
        router/index.js(路由器配置文件中)
        //备份VueRouter原型对象的Push，Replace
        let originPush = VueRouter.prototype.push;
        let originReplace = VueRouter.prototype.replace;
        // 重写push | replace
        // 第一个参数(location)：告诉原来push方法，要往哪里跳（传递哪些参数）
        // 第二、三个参数(resolve,reject):成功，失败的回调
        VueRouter.prototype.push = function(location,resolve,reject){
            if(resolve&&reject){
            //用户传递了成功，失败的回调函数
                // 直接调用originPush，this指向window，此处用call指定this指向
                // call || apply区别
                // 相同点：都可以调用一次函数，都可以篡改函数的this指向一次
                // 不同点：call与apply传递参数：call用逗号隔开，apply使用数组
                originPush.call(this,location,resolve,reject);
            }else{
            //用户没有传递成功，失败的回调 
                originPush.call(this,location,()=>{},()=>{});
            }
        }

五、跨域问题
六、vuex
七、函数的防抖与节流(底层：闭包+延迟器)
    可以引用lodash.js（里面有封装好的 防抖和节流）
    防抖：
        前面的所有的触发都被取消，最后一次执行在规定的时间之后才会触发，也就是说如果连续快速的触发，只会执行一次
        用户操作很频繁，但是只执行一次
        _.debounce(要触发的回调函数,时间间隔)
    节流：
        在规定时间间隔内不会重复触发回调，只有大于这个时间间隔才会触发回调，把频繁触发变为少量触发
        用户操作很频繁，但是把频繁的操作变为少量的操作【可以给浏览器充分的时间解析代码】
        _.throttle(要触发的回调函数,时间间隔)