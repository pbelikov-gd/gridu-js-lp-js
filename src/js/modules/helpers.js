/**
 * @class
 * @desc Set of static methods, that are used to display all HTML and CSS (i.e. to make interactive mockup).
 * Once we have some framework here, then this class is likely to be removed.
 */
class Helpers {
  constructor() {

  }

  // Static methods

  static buy() {
    // IE 9+ solution, older ones not being supported (we'll have to make a workaround
    // with splitting className and joining it back)
    document.querySelector('.buy-modal').classList.toggle('not-displayed');
    Helpers.blur();
  }

  static edit() {
    document.querySelector('.edit-modal').classList.toggle('not-displayed');
    Helpers.blur();
  }

  static delete() {
    document.querySelector('.delete-modal').classList.toggle('not-displayed');
    Helpers.blur();
  }

  static closeModal() {
    document.querySelectorAll('.modal-container').forEach((item) => {
      item.classList.add('not-displayed');
    });
    Helpers.blur();
  }

  static blur() {
    document.querySelector('body').classList.toggle('has-modal-active');
  }

  // Private methods

  static initSlider () {
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
  if (window.Helpers) {
    return;
  }

  // Pulling it to global scope for now, as soon as we'll remove it once framework is here
  window.Helpers = Helpers;

  // Now - init the slider
  Helpers.initSlider();
});

module.exports = {
  Helpers
};
