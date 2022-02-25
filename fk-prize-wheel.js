//肥客原生组件Web Components API大转盘抽奖fk-prize-wheel
export default class FKPrizeWheel extends HTMLElement {
  static get observedAttributes() {
    return ['image', 'options', 'title', 'size'];
  }
  constructor() {
    super(); 
    this.data = {
      grade: 0, 
      angle: 0, 
      end_angle: 0, 
      diam: 0,
      _w: 0,
      _h: 0,
      value: 0, 
    };
    const _shadowTemp = this.attachShadow({ mode: 'open' }); 
    _shadowTemp.innerHTML = `<style>
    :host {
      width: 100%;
    }
    .container {
      width: 100%;
      position: relative;
      
    }
  
    .container:before {
      content: '';
      display: block;
      padding-bottom: 100%;
    }
  
    .abs {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      
    }
  
    .background>img,
    .static>.pointer {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 100%;
    }
  
    .prizes > ::slotted(*){
      position: absolute;
      top: 0;
      left: 50%;
      transform-origin: center bottom;
      text-align: center;
    }
  
    .turn.run {
      animation: circle 8s ease forwards;
    }
  </style>
  
  <style id="runkeyframes" type="text/css">
    @keyframes circle {
      0% {
        transform: rotate(0deg);
      }
  
      100% {
        transform: rotate(1440deg);
      }
    }
  </style>
    <div class="container">
      <div class="turn abs">
        <div class="background abs">
          <img alt="${this.title}" src="${this.image}" style="width:${this.size || '100%'}" />
        </div>
        <div class="prizes abs">
          <slot alt="插槽（更专业点叫 light DOM，只对 shadow DOM 是有效的）">
          奖品列表
          </slot>
        </div>
      </div>
      <div class="static abs">
        <div class="pointer"><slot name="button">请放置按扭元素</slot></div>
      </div>
      </div>`;
      
    this.$turnBox = _shadowTemp.querySelector(".turn");
    this.$prizesBox = _shadowTemp.querySelector(".prizes");
    
    this.$slotItems = this.$prizesBox.querySelector('slot').assignedElements()
    this.$runkeyframes = _shadowTemp.getElementById('runkeyframes');
    this.$buttonBox = _shadowTemp.querySelector('.pointer');
    
    this.$buttonBox.addEventListener('click', () => {
      if (this.data.value) return;
      
      this.dispatchEvent(new CustomEvent('change', {
        detail: {
          tip: '默认change事件'
        }
      }));
      
    });
    
    this.$turnBox.addEventListener('animationend', () => {
      this.$turnBox.style.transform = "rotate(" + this.data.end_angle + "deg)"; 
      this.$turnBox.classList.remove('run'); 
      var _index = this.data.value - 1;
      this.data.value = 0;
      
      this.dispatchEvent(new CustomEvent('onPrizeEndOver', {
        detail: {
          angle: this.data.end_angle, 
          value: _index, 
          items: this.$slotItems, 
          target: this.$slotItems[_index] 
        }
      }));
      
    });
    
    this.$prizesBox.querySelector('slot').addEventListener('slotchange', e => {
      var slot = e.target;
      this.$slotItems = slot.assignedElements();
      this.data.grade = this.$slotItems.length;
      this.init();
    });
    window.onresize = this.debounce(this.init, 200);
  }
  attributeChangedCallback(name, oldVal, newVal) {}

  connectedCallback() {}

  errorCallback() {}

  disconnectedCallback() {}

  adoptedCallback() {}



  get title() {
    
    return this.getAttribute('title');
  }
  get options() {
    
    return this.getAttribute('options');
  }
  get image() {
    
    return this.getAttribute('image');
  }
  get size() {
    return this.getAttribute('size');
  }

  set alter(value) {
    if (value === null || value === false) {
      this.removeAttribute('alt');
    } else {
      this.setAttribute('alt', value);
    }
  }
  

  angle(grade) {
    return 360 / grade;
  }
  chord(diam, angle) {
    return diam * Math.sin((angle * Math.PI / 180) / 2);
  }
  setItems($em) {
    if ($em && $em.length) {
      if (this.data.angle) this.$prizesBox.style.transform = "rotate(" + this.data.angle / 2 + "deg)";
      $em.forEach((item, index) => {
        item.style.width = this.data._w + "px";
        item.style.height = this.data._h + "px";
        item.style.transform = "translateX(-50%) rotate(" + this.data.angle * index + "deg)";
      });
      
    }
  }
  init() {
    if (!this) return;
    this.data.diam = this.$prizesBox.clientWidth;
    this.data.angle = this.angle(this.data.grade);
    this.data._w = this.chord(this.data.diam, this.data.angle);
    this.data._h = this.data.diam / 2;
    this.setItems(this.$slotItems);

  }
  run(index) {
    if (this.data.value) return;
    this.data.value = index + 1;
    this.data.end_angle = 360 * 5 - (this.data.angle * index + this.data.angle / 2);
    this.$runkeyframes.innerHTML = "@keyframes circle{ 0%{transform: rotate(0deg);} 100%{transform: rotate(" + this.data.end_angle + "deg);}}";
    this.$turnBox.classList.add('run');
  }

  debounce(func, interval) {
    let timerId;
    var context = this, args = arguments;
    return function (e) {
      clearTimeout(timerId);
      timerId = setTimeout(function () {
        func.apply(context, args)
      }, interval);
    }
  };
};
if (!customElements.get('fk-prize-wheel')) {
  customElements.define('fk-prize-wheel', FKPrizeWheel);
}  
