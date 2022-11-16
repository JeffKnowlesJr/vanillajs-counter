class myCounter extends HTMLElement {
  // https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement

  constructor() {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
  }

  get count() {
    return this.getAttribute('count')
  }

  set count(val) {
    this.setAttribute('count', val)
  }

  static get observedAttributes() {
    return ['count']
  }

  attributeChangedCallback(prop, oldValue, newValue) {
    if (prop === 'count') {
      this.render()
      let btn = this.shadow.querySelector('#btn')
      btn.addEventListener('click', this.inc.bind(this))
    }
  }

  inc() {
    this.count++
  }

  connectedCallback() {
    this.render()
    let btn = this.shadow.querySelector('#btn')
    btn.addEventListener('click', this.inc.bind(this))
  }

  render() {
    // Using innerHTML is not ideal

    this.shadow.innerHTML = `
    <h1>Counter</h1>
    ${this.count}
    <button id="btn">Increment</button>
    `
  }
}

customElements.define('my-counter', myCounter)
