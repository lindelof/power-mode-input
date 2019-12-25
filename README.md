# PowerInput

[![NPM](https://img.shields.io/npm/v/power-input.svg)](https://www.npmjs.com/package/power-input) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

> PowerInput can make your text input box more compelling

This project can make your input box lively. One day I saw a vscode plugin called [`Power Mode`](https://marketplace.visualstudio.com/items?itemName=hoovercj.vscode-power-mode), so I wanted to write a similar javascript library. This project uses [`proton.js`](https://github.com/a-jie/Proton) and it is also great.

#### By the way recommend a great react particle animation background component [https://github.com/lindelof/particles-bg](https://github.com/lindelof/particles-bg)

### Online demo
* demo [https://codesandbox.io/s/power-input-l45h1](https://codesandbox.io/s/power-input-l45h1)

![](https://github.com/lindelof/power-input/blob/master/image/01.gif?raw=true)


## Install

```bash
npm install --save power-input
```

## Usage

```jsx
import PowerInput from 'power-input';

...
PowerInput.make(document.getElementById("obinput"));

// or
PowerInput.make(".phone", {
  height: 5,
  tha: [0, 360],
  g: 0.5,
  num: 5,
  radius: 6,
  circle: true,
  alpha: [0.75, 0.1],
  color: "random"
});
```

#### If you are in `react`, you can use it like this
```jsx
componentDidMount(){
  PowerInput.make(this.inputRef.current);
}
```

#### You can use it like this in `vue.js`
```vue
mounted() {
  PowerInput.make(this.$refs.inputRef);
}
```

#### Of course this can be done in `angular`
```javascript
const inputElement = this.elementRef.nativeElement.querySelector('input');
PowerInput.make(inputElement);
```

## Parameter Description
```javascript
PowerInput.make(input, {
  height: 5,
  tha: [0, 360],
  g: 0.5,
  num: 5,
  ... // Parameter
});
```

key | describe |type | example
----|-----|-----|------
`g` | Whether to add gravity | number | `1`
`num` | The number of particles emitted each time | number | `3`
`radius` | The radius of every particle | number | `10`
`alpha` | The alpha of every particle | number | `.1`
`tha` | The Particle emitter angle | array | `[0, 360]`
`v` | The Particle emitter Particle velocity | number | `0.5`
`life` | The life of every particle | number | `1.2`
`color` | Particle color  | array or string | `#ffcccc`
`random` | Random force | number | `1.2`
`y` | Particle emitter height  | number | `2`
`height` | Particle emitter height Ibid  | number | `2`

---

## Contribution
I very much hope that you can work with me to modify the code. I also have a lot of fun ideas. Maybe you can join me to implement it.

## License

https://opensource.org/licenses/MIT
