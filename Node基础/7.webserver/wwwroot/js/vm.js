/*
 let people = {
  name: "lisi",
  age: 18
}
console.log('姓名:%s,年龄:%s', people.name, people.age);//vm.js:9 姓名:lisi,年龄:18
*/

//上面的代码就是普通的获取/设置对象的属性,看不到什么奇怪的变化
/* 
let modeng = {}
let age;
Object.defineProperty(modeng, 'age', {
  get: function () {
    console.log("获取年龄");
    return age;
  },
  set: function (newVal) {
    console.log('设置年龄');
    age = newVal;
  }
});
modeng.age = 18;
console.log(modeng.age);//设置年龄,获取年龄,18
 */
//你会发现通过上述操作之后,我们访问age属性是会自动执行get函数,设置age属性时,会自动执行set函数,这就给我们的双向绑定提供了非常大的方便.

/**
 * 监听器 observer
 * 监听器的作用就是去监听数据的每一个属性,使用 Object.defineProperty方法监听.
 * 当我们监听到属性发生变化之后我们需要通知 Watcher 订阅者执行更新函数去更新试图.
 * 在这个过程中我们可能有很多个订阅者 Watcher 所以我们要创建一个容器 Dep 去做一个统一的管理
 */
function defineReactive(data, key, value) {
  //递归调用,监听所有属性
  observer(value);
  var dep = new Dep();
  Object.defineProperty(data, key, {
    get: function () {
      if (Dep.target) {
        dep.addSub(Dep.target);
      };
      return value;
    },
    set: function (newVal) {
      if (value !== newVal) {
        value = newVal;
        dep.notify();//通知订阅器
      };
    },
  });
};
//创建监听器
function observer(data) {
  if (!data || typeof data !== 'object') {
    return;
  };
  Object.keys(data).forEach(key => {
    defineReactive(data, key, data[key]);
  });
};
//创建容器 Dep
function Dep() {
  this.subs = [];
};
Dep.prototype.addSub = function (sub) {
  this.subs.push(sub);
};
Dep.prototype.notify = function () {
  console.log("属性发生变化通知 Watcher 执行更新视图函数");
  this.subs.forEach(sub => {
    sub.update();
  });
};
Dep.target = null;
//以上我们就创建了一个监听器observer.我们现在可以尝试一下给一个对象添加监听然后改变属性会有什么变化?

let modeng = {
  age: 18
}
observer(modeng);
modeng.age = 20
//我们可以看到浏览器控制台打印出 “属性发生变化通知 Watcher 执行更新视图函数” 说明我们实现的监听器没毛病，既然监听器有了，我们就可以通知属性变化了，那肯定是需要 Watcher 的时候了。

/**
 * 订阅者 Watcher
 * Watcher 主要是接受属性变化的通知，然后去执行更新函数去更新视图，所以我们做的主要是有两步：
 * 1.把 Watcher 添加到 Dep 容器中，这里我们用到了 监听器的 get 函数
 * 2.接收到通知，执行更新函数。
 */

function Watcher(vm, prop, callback) {
  this.vm = vm;
  this.prop = prop;
  this.callback = callback;
  this.value = this.get();
}
Watcher.prototype = {
  update: function () {
    const value = this.vm.$data[this.prop];
    const oldVal = this.value;
    if (value !== oldVal) {
      this.value = value;
      this.callback(value);
    }
  },
  get: function () {
    Dep.target = this; //储存订阅器
    const value = this.vm.$data[this.prop]; //因为属性被监听，这一步会执行监听器里的 get方法
    Dep.target = null;
    return value;
  }
}
//这一步我们把 Watcher 也给弄了出来，到这一步我们已经实现了一个简单的双向绑定了，我们可以尝试把两者结合起来看下效果。

function Mvue(options, prop) {
  this.$options = options;
  this.$data = options.data;
  this.$prop = prop;
  this.$el = document.querySelector(options.el);
  this.init();
}
Mvue.prototype.init = function () {
  observer(this.$data);
  this.$el.textContent = this.$data[this.$prop];
  new Watcher(this, this.$prop, value => {
    this.$el.textContent = value;
  });
}
// 这里我们尝试利用一个实例来把数据与需要监听的属性传递进来，通过监听器监听数据，然后添加属性订阅，绑定更新函数。

// < div id = "app" > {{ name }}</div >
const vm = new Mvue({
  el: "#app",
  data: {
    name: "王麻子"
  }
}, "name");
//我们可以看到数据已经正常的显示在页面上，那么我们在通过控制台去修改数据(vm.$data.name="张三")，发生变化后视图也会跟着修改。
