const entry: NodeListOf<HTMLElement> = document.querySelectorAll('[data-medicover]');

entry.forEach(element => {
  console.log(element.dataset.medicover);
});
