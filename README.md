# FKPrizeWheel
肥客大转盘抽奖fk-prize-wheel浏览器原生组件Web Components API
## 组件特性：
+ 原生组件Web Components API
+ 兼容Angular、Vue、React 和 原生JavaScript
+ 自动根据奖品项元素数量来动态均分奖盘和单项奖的角度
+ 自动停至指定奖品动画并回调事件
+ 支持奖盘和按扭等素材自定义
+ 相应式布局动态调整转盘尺寸适应容器或屏幕

## 组件安装：
1. html引用（推荐）
```html
<script type="module">
  import './fk-prize-wheel.js';
</script>
``` 

2. 使用文件引入
```html 
<script type="module" src="./fk-prize-wheel.js"></script>
```

3. vue或react项目引用
```js 
import './fk-prize-wheel.js';
```

## 组件参数：
+  title              属性       标题
+  image              属性       转盘背景图地址
+  size               属性       转盘背景图比例(默认100%)
+  onchange           事件       点击中间按扭区域的事件
+  onPrizeEndOver     事件       动画结束后触发事件(需要 addEventListener 来监听)
+  slot               默认插槽    用于放置奖品列表项元素
+  slot[name=button]  按扭插槽    抽奖中心区域插槽

## 组件使用：
```html
<fk-prize-wheel 
    title="肥客大转盘抽奖fk-prize-wheel浏览器原生组件Web Components API"
    onchange="console.log('默认事件:',event.detail)"
    image="pan.jpg"
    size="110%"
  >
    <div>奖品2</div>
    <div>奖品2</div>
    <div>奖品3</div>
    <div>奖品4</div>
    <div>奖品5</div>
    <div>奖品6</div>
    // <p slot="button" onclick="start()">中间抽奖按钮</p>
    <div slot="button" onclick="start()">
      <img style="width: 100%;"  src="./res/circular_shadow.png" />
      <img style="position: absolute; top:50%;left:50%; transform: translate(-50%, -50%);" width="80" src="./res/go.png">
    </div>
  </fk-prize-wheel>

  <script>
    // 肥客大转盘抽奖fk-prize-wheel浏览器原生组件Web Components API
    var fkPrizewWeel = document.querySelector('fk-prize-wheel');
    // 抽奖转盘动画结束事件
    fkPrizewWeel.addEventListener('onPrizeEndOver',function(event){
      console.log("---- onPrizeEndOver ----");
      console.log(event.detail);
    });
    // 抽奖
    function start(){
      fkPrizewWeel.run(3); // 传参 index 第几个奖器
    }
  </script>
```
