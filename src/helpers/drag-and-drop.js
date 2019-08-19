// вспомогательный класс для drag&drop
export default class dragAndDrop {
  constructor() {
    this.target = null;
    this.next = null;
  }

  insertTarget () {
    const nextPosition = this.next.getBoundingClientRect().top;
    const targetPosition = this.target.getBoundingClientRect().top;

    if (targetPosition > nextPosition) {
      this.next.insertAdjacentElement('beforebegin', this.target);
      this.target.style.opacity = '1';
      return;
    }
    const nextEl = this.next.nextTargetSibling;

    if (nextEl) {
      this.target.style.opacity = '1';
      nextEl.insertAdjacentElement('beforebegin', this.target);
      return;
    }
    this.target.style.opacity = '1';
    this.next.insertAdjacentElement('afterend', this.target);

  };
}