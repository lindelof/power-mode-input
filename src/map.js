export default class PMap {
  constructor() {
    this.list = [];
  }

  add(data) {
    this.list.push(data);
  }

  map(callback){
    for (let i = 0; i < this.list.length; i++) {
      const m = this.list[i];
      callback(m);
    }
  }

  findByNode(node) {
    for (let i = 0; i < this.list.length; i++) {
      const m = this.list[i];
      if (m["node"] === node) {
        return m;
      }
    }

    return null;
  }

  removeByNode(node) {
    for (let i = 0; i < this.list.length; i++) {
      const m = this.list[i];
      if (m["node"] === node) {
        this.list.splice(i, 1);
        break;
      }
    }
  }

  removeByEmitter(emitter) {
    for (let i = 0; i < this.list.length; i++) {
      const m = this.list[i];
      if (m["emitter"] === emitter) {
        this.list.splice(i, 1);
        break;
      }
    }
  }

  destroy() {
    for (let i = 0; i < this.list.length; i++) {
      const m = this.list[i];
      for (let key in m) {
        delete m[key];
      }
    }

    this.list.length = 0;
  }
}
