import Proton from "proton-engine";
import RAFManager from "raf-manager";
import PMap from "./map";

let container, proton, defaultEmitter;
const piMap = new PMap();

const PowerInput = {
  container: null,
  make(node, config = {}) {
    if (typeof node === "string") node = document.querySelector(node);
    if (!container) container = createContainer();

    if (!proton) {
      proton = new Proton();
      proton.addRenderer(createProtonRenderer(container, config));
      RAFManager.add(renderProton);
    }

    const emitter = createEmitter(node, config);
    proton.addEmitter(emitter);
    addPowerEvent(node);
    piMap.add({ emitter, node, config });

    return this;
  },

  close(node) {
    if (typeof node === "string") node = document.querySelector(node);
    const { emitter } = piMap.findByNode(node);
    proton.removeEmitter(emitter);
    piMap.removeByNode(node);
    removePowerEvent(node);
    return this;
  },

  destroy() {
    try {
      piMap.map(({ node }) => removePowerEvent(node));
      piMap.destroy();
      RAFManager.remove(renderProton);
      proton.destroy();
    } catch (e) {}
    return this;
  }
};

// ~~~~~~~~~~~ PROTON FUNCTION ~~~~~~~~~~~ //
const createEmitter = (node, config = {}) => {
  const emitter = new Proton.Emitter();
  emitter.rate = config.num ? new Proton.Rate(Math.floor(config.num * 0.7), config.num) : new Proton.Rate(6, 9);
  // emitter.damping = 0.008;

  const life = config.life ? new Proton.Life(config.life) : new Proton.Life(0.5, 1.2);
  const color = config.color || getDefaultColor(node);
  const tha = config.tha ? new Proton.Span(config.tha[0], config.tha[1]) : new Proton.Span(-30, 30);
  const v = config.v ? new Proton.Span(config.v * 0.8, config.v) : new Proton.Span(0.6, 1.2);

  if (config.alpha) {
    if (Array.isArray(config.alpha)) {
      emitter.addBehaviour(new Proton.Alpha(config.alpha[0], config.alpha[1]));
    } else {
      emitter.addBehaviour(new Proton.Alpha(config.alpha));
    }
  } else {
    emitter.addBehaviour(new Proton.Alpha(Proton.getSpan(0.6, 0.9)));
  }

  if (config.radius) {
    const r = config.radius;
    const radius = new Proton.Radius(r * 0.5, r);
    emitter.addInitialize(radius);
  } else {
    const radius = new Proton.Radius(1, 2);
    emitter.addInitialize(radius);
  }

  const g = config.g || 2.5;

  if (config.random) {
    emitter.addBehaviour(new Proton.RandomDrift(config.random, config.random, 0.2));
  }

  emitter.addInitialize(new Proton.Mass(1));
  emitter.addInitialize(life);
  emitter.addInitialize(new Proton.Velocity(v, tha, "polar"));
  emitter.addBehaviour(new Proton.Color(color));
  emitter.addBehaviour(new Proton.Scale(1, 0.5));
  emitter.addBehaviour(new Proton.G(parseFloat(g)));
  return emitter;
};

const createProtonRenderer = (container, config) => {
  const renderer = new Proton.DomRenderer(container);

  renderer.onParticleCreated = particle => {
    const body = renderer.pool.get(renderer.circleConf, particle);
    body.style.width = 2 * particle.radius + "px";
    body.style.height = 2 * particle.radius + "px";
    body.style.marginLeft = -particle.radius + "px";
    body.style.marginTop = -particle.radius + "px";

    body.style.borderRadius = 0;
    renderer.element.appendChild(body);
    particle.body = body;
  };

  return renderer;
};

const renderProton = () => {
  proton && proton.update();
};

// ~~~~~~~~~~~ UTILS FUNCTION ~~~~~~~~~~~ //
const addPowerEvent = node => {
  node.addEventListener("input", inputHandler, false);
};

const removePowerEvent = node => {
  try {
    node.removeEventListener("input", inputHandler, false);
    node.onpropertychange = null;
  } catch (e) {}
};

const inputHandler = e => {
  const { emitter, config } = piMap.findByNode(e.currentTarget || e.target);
  const pos = getCursorPosition(e);
  emitter.p.x = pos.x;
  emitter.p.y = pos.y + (config.height || config.y || 0);
  emitter.emit("once");
};

// ~~~~~~~~~~~ DOCUMENT FUNCTION ~~~~~~~~~~~ //
const createContainer = () => {
  const container = document.createElement("div");
  container.style.position = "fixed";
  container.style.left = "0px";
  container.style.top = "0px";
  container.style.zIndex = 9999;
  container.pointerEvents = "none";
  container.id = `powerinput_${(Math.random() * 999999) >> 0}`;
  document.body.appendChild(container);

  return container;
};

const getDefaultColor = node => {
  let color = node.style.color;
  if (color && color !== "inherit") {
  } else {
    const copyStyle = getComputedStyle(node);
    color = copyStyle["color"];

    if (color && color !== "inherit") {
    } else {
      color = "#000000";
    }
  }

  if (color.indexOf("rgb") === 0) {
    color = rgbToHex(color);
  }
  return color;
};

const rgbToHex = c => {
  const rgb = c
    .replace(/^(rgb|rgba)\(/, "")
    .replace(/\)$/, "")
    .replace(/\s/g, "")
    .split(",");

  const r = +rgb[0];
  const g = +rgb[1];
  const b = +rgb[2];

  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};

const getCursorXY = (input, selectionPoint) => {
  const con = document.createElement("div");
  con.style.position = "absolute";
  con.style.zIndex = -99;
  con.style.visibility = "hidden";

  const div = document.createElement("div");
  const copyStyle = getComputedStyle(input);
  for (const prop of copyStyle) {
    div.style[prop] = copyStyle[prop];
  }

  const swap = ".";
  const inputValue = input.tagName === "INPUT" ? input.value.replace(/ /g, swap) : input.value;
  // set the div content to that of the textarea up until selection
  const textContent = inputValue.substr(0, selectionPoint);
  div.textContent = textContent;
  if (input.tagName === "TEXTAREA") div.style.height = "auto";
  if (input.tagName === "INPUT") div.style.width = "auto";

  // create a marker element to obtain caret position
  const span = document.createElement("span");
  span.textContent = inputValue.substr(selectionPoint) || ".";
  span.style.backgroundColor = "#ff0000";
  div.appendChild(span);
  con.appendChild(div);
  document.body.appendChild(con);

  const { offsetLeft: spanX, offsetTop: spanY } = span;
  //const rect = span.getBoundingClientRect();
  const pos = getGlobalPosition(input);
  document.body.removeChild(con);

  return {
    x: pos.x + spanX,
    y: pos.y + spanY
  };
};

const getGlobalPosition = element => {
  let x = 0;
  let y = 0;
  while (element) {
    x += element.offsetLeft - element.scrollLeft + element.clientLeft;
    y += element.offsetTop - element.scrollTop + element.clientTop;
    element = element.offsetParent;
  }

  return { x, y };
};

const getCursorPosition = e => {
  const { currentTarget: input } = e;
  const { selectionEnd } = input;

  return getCursorXY(input, selectionEnd);
};

export default PowerInput;
