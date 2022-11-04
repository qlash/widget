import Widget from './module/Widget'

const entry: NodeListOf<HTMLElement> = document.querySelectorAll('[data-medicover]')

entry.forEach(element => {
  new Widget(element)
})
