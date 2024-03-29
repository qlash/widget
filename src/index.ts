import Widget from './module/Widget'

window.medistoreWidget = {
  render() {
    const entry: NodeListOf<HTMLElement> = document.querySelectorAll('[data-medicover]:not([data-rendered="pending"])')

    entry.forEach(element => {
      new Widget(element)
    })
  },
}

window.medistoreWidget.render()
