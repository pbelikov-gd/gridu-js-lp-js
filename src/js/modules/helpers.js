let helper;

class Helper {
  constructor() {
    let self = this;

    console.log('Instantiating Helper ...');
    self._initButtons();
    self._initSlider();
  }

  // Public methods

  buy() {
    let self = this;
    // IE 9+ solution, older ones not being supported (we'll have to make a workaround
    // with splitting className and joining it back)
    document.querySelector('.buy-modal').classList.toggle('not-displayed');
    self._blur();
  }

  edit() {
    let self = this;
    document.querySelector('.edit-modal').classList.toggle('not-displayed');
    self._blur();
  }

  delete() {
    let self = this;
    document.querySelector('.delete-modal').classList.toggle('not-displayed');
    self._blur();
  }

  closeModal() {
    let self = this;
    document.querySelectorAll('.modal-container').forEach((item) => {
      item.classList.add('not-displayed');
    });
    self._blur();
  }

  // Private methods

  _blur() {
    document.querySelector('body').classList.toggle('has-modal-active');
  }

  _initButtons() {
    let self = this;

    if (!!document.querySelector('.buy-button')) {
      document.querySelector('.buy-button').addEventListener('click', (event) => {
        self.buy();
      });
    }

    if (!!document.querySelector('.edit-button')) {
      document.querySelector('.edit-button').addEventListener('click', (event) => {
        self.edit();
      });
    }

    if (!!document.querySelector('.delete-button')) {
      document.querySelector('.delete-button').addEventListener('click', (event) => {
        self.delete();
      });
    }
  }

  _initSlider () {
    let self = this;

    // Slider is made of jQuery UI slider, so binding is made this way
    if (document.querySelector('.filter-options .slider')) {
      document.querySelectorAll('.filter-options .slider').forEach(obj => {
        let minValue = +obj.dataset.minValue;
        let nextValue = minValue;
        let maxValue = +obj.dataset.maxValue;
        let step = +obj.dataset.step;
        let leftValue = +obj.dataset.leftValue;
        let rightValue = +obj.dataset.rightValue;
        let left = obj.querySelector('.slider-left > .value');
        let right = obj.querySelector('.slider-right .value');
        $(obj).slider({
          range: true,
          min: minValue,
          max: maxValue,
          step: step,
          values: [leftValue, rightValue],
          slide: function(event, ui) {
            left.innerText = ui.values[0];
            right.innerText = ui.values[1];
          }
        });
      });
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Do nothing, if we are already done
  if (window.helper) {
    return;
  }

  // Pulling it to global scope for now, as soon as we'll remove it once framework is here
  window.helper = new Helper();
});

module.exports = {Helper, helper};
