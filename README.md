# PowerModeInput

[![NPM](https://img.shields.io/npm/v/power-mode-input.svg)](https://www.npmjs.com/package/power-mode-input) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

> PowerModeInput can make your text input box more compelling

This project can make your input box lively. One day I saw a vscode plugin called [`Power Mode`](https://marketplace.visualstudio.com/items?itemName=hoovercj.vscode-power-mode), so I wanted to write a similar javascript library. This project uses [`proton.js`](https://github.com/a-jie/Proton) and it is also great.

#### By the way recommend a great react particle animation background component [https://github.com/lindelof/particles-bg](https://github.com/lindelof/particles-bg)

### Online demo
* demo [https://codesandbox.io/s/power-mode-input-y39l6](https://codesandbox.io/s/power-mode-input-y39l6)

![](https://github.com/lindelof/power-mode-input/blob/master/image/01.gif?raw=true)


## Install

```bash
npm install --save power-mode-input
```

## Usage

```jsx
import PowerModeInput from "power-mode-input";

const input = document.getElementById("obinput");
PowerModeInput.make(input);

// close PowerModeInput
PowerModeInput.close(input);

// destroy PowerModeInput
PowerModeInput.destroy();

// another usage
PowerModeInput.make(".phone", {
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
  PowerModeInput.make(this.inputRef.current);
}
```

#### You can use it like this in `vue.js`
```vue
mounted() {
  PowerModeInput.make(this.$refs.inputRef);
}
```

#### Of course this can be done in `angular`
```javascript
const inputElement = this.elementRef.nativeElement.querySelector('input');
PowerModeInput.make(inputElement);
```

## Parameter Description
```javascript
PowerModeInput.make(input, {
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

## Explanation
For some special types of input boxes, the cursor may not be positioned correctly. I am also looking for a solution to this problem. If you know, please let me know. [See here for specific reasons](https://stackoverflow.com/questions/21177489/selectionstart-selectionend-on-input-type-number-no-longer-allowed-in-chrome)

## Contribution
I very much hope that you can work with me to modify the code. I also have a lot of fun ideas. Maybe you can join me to implement it.

## License

https://opensource.org/licenses/MIT
