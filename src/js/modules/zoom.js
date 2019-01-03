const uniqueId = require('lodash/uniqueId');

class Zoom {
    constructor(target, img, zoomRatio = 2) {
        // No need to make any zooming on non-image, so just throw and exit
        if (!(target instanceof HTMLImageElement)) {
            throw new Error('Zoom can be applied only to images.');
        }

        this.target = target;

        // We should zoom existing image if its not provided explicitly
        this.img = img ? img : this.target.getAttribute('src');
        this.zoom = null;

        // Set ratio
        this.zoomRatio = zoomRatio;

        // Once we are ready - populate the Zoom
        this._init();

        // Set boundaries on init
        this._setSize();
    }

    move(event) {
        // We dont want any default behavior here ...
        event.preventDefault();

        // Now - find out where cursor is ...
        const cursorPosition = this._getCursor(event);

        // Now - find the position of zoom (we need to have cursor in the middle of it)
        let x = cursorPosition.x - this.zoom.offsetWidth / 2;
        let y = cursorPosition.y - this.zoom.offsetHeight / 2;

        // Now - do not let zoom come out from image
        x = Math.min(Math.max(x, 0), this.target.width - this.zoom.offsetWidth);
        y = Math.min(Math.max(y, 0), this.target.height - this.zoom.offsetHeight);

        // Position the zoom
        this.zoom.style.left = `${x}px`;
        this.zoom.style.top = `${y}px`;

        // Position the background
        this.zoom.style.backgroundPosition = `${-x * this.cx}px ${-y * this.cy}px`;
    }

    resize() {
        this._setSize();
    }

    // Private methods

    _init() {
        // Double protect from re-initialization
        if (this.zoom) {
            return;
        }

        // Our zoom will have its own container, that should be uniquely identified
        this.zoom = document.createElement('div');
        this.zoom.id = uniqueId();
        this.zoom.classList.add('image-zoom');
        this.zoom.style.backgroundImage = `url(${this.img})`;

        // Populate it ...
        this.target.parentNode.insertBefore(this.zoom, this.target);

        // Zoom will be hidden by default (we'll have it managed by CSS)
        // Zoom will be invoked when we hover over target
        this.target.addEventListener('mousemove', this.move.bind(this));
        this.zoom.addEventListener('mousemove', this.move.bind(this));

        // We need to adjust when resize
        window.addEventListener('resize', this.resize.bind(this));
        
        // Future - zoom will be configurable
    }

    _setSize() {
        this.cx = this.zoomRatio;
        this.cy = this.zoomRatio;

        // Implement zooming of the actual image
        this.zoom.style.backgroundSize = `${this.target.width * this.cx}px ${this.target.height * this.cy}px`
    }

    _getCursor(event) {
        // Get the rectangle (we do it here because of scrolling)
        const rect = this.target.getBoundingClientRect();
        // At this point we need to find X and Y coordinates of the contoller (mouse), relative to target image.
        return {
            x: (event.pageX - rect.left) - window.pageXOffset, 
            y: (event.pageY - rect.top) - window.pageYOffset
        };
    }
}

module.exports = Zoom;