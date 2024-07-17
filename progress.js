const valueInput = document.querySelector('.value-input');
const switchInputAnimate = document.getElementById('animate');
const switchInputHide = document.getElementById('hide');

class Progress {
    progressCircle;
    progressContainer;

    value = 0;
    animated = false;
    hidden = false;

    constructor(containerElement = document.body) {
        containerElement.append(this.createProgress());
    }

    createProgress = () => {
        const container = document.createElement("div");
        container.classList.add("progress-container-svg");

        const progressSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        progressSvg.setAttributeNS(null, "viewBox", "0 0 100 100");

        const progressSvgBackground = progressSvg.cloneNode();

        const progressCircleBackground = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        progressCircleBackground.setAttributeNS(null,"cx", "50");
        progressCircleBackground.setAttributeNS(null,"cy", "50");
        progressCircleBackground.setAttributeNS(null,"fill", "none");
        progressCircleBackground.setAttributeNS(null,"r", "45");
        progressCircleBackground.setAttributeNS(null,"stroke-width", "10");
        progressCircleBackground.setAttributeNS(null,"stroke", "#e8e8ff");
        progressCircleBackground.setAttributeNS(null,"stroke-dasharray", "283");

        const progressCircle = progressCircleBackground.cloneNode();
        progressCircle.setAttributeNS(null,"stroke", "blue");
        progressCircle.setAttributeNS(null,"stroke-dashoffset", "283");

        progressSvg.append(progressCircle);
        progressSvgBackground.append(progressCircleBackground);
        container.append(progressSvgBackground, progressSvg);

        this.progressCircle = progressCircle;
        this.progressContainer = container;

        return container;
    }

    updateValue = (value) => {
        if (!value) {
            value = 0;
        }

        const strokeDasharray = Math.round(2 * Math.PI * this.progressCircle.getAttribute('r'));
        const currentDashOffset = strokeDasharray * (value / 100);

        this.progressCircle.style.strokeDashoffset = `${strokeDasharray - currentDashOffset}`;
        this.value = value;
    }

    toggleAnimation = () => {
        if (this.animated) {
            this.progressCircle.style.animation = "none";
        } else {
            this.progressCircle.style.animation = "spin 2s linear infinite";
        }

        this.animated = !this.animated;
    }

    toggleHiddenState = () => {
        if (this.hidden) {
            this.progressContainer.style.display = 'block';
        } else {
            this.progressContainer.style.display = 'none';
        }

        this.hidden = !this.hidden;
    }
}

const progressInstance = new Progress(document.querySelector('.progress'));

valueInput.addEventListener('input', (event) => {
    let value = event.target.value;

    if (value > 100) {
        value = 100;
        valueInput.value = value;
    }

    progressInstance.updateValue(parseInt(value));
});

switchInputAnimate.addEventListener('change', () => {
    progressInstance.toggleAnimation();
});

switchInputHide.addEventListener('change', () => {
    progressInstance.toggleHiddenState();
});

/**
 * реализация через -mask: radial-gradient(circle, transparent 58%, black 59%)
 * при применении mask появлялась пикселизация прогресса, выглядело некрасиво
 */

// class Progress {
//     progressContainer;
//
//     value = 0;
//     animated = false;
//     hidden = false;
//
//     constructor(containerElement = document.body) {
//         containerElement.append(this.createProgress());
//     }
//
//     createProgress = () => {
//         const container = document.createElement("div");
//         container.classList.add("progress-container-div");
//
//         this.progressContainer = container;
//
//         return container;
//     }
//
//     updateValue = (value) => {
//         if (!value) {
//             value = 0;
//         }
//
//         this.progressContainer.style.background = `conic-gradient(blue ${value}%, #e6e6f1f7 0)`;
//     }
//
//     toggleAnimation = () => {
//         if (this.animated) {
//             this.progressContainer.style.animation = "none";
//         } else {
//             this.progressContainer.style.animation = "spin 2s linear infinite";
//         }
//
//         this.animated = !this.animated;
//     }
//
//     toggleHiddenState = () => {
//         if (this.hidden) {
//             this.progressContainer.style.display = 'block';
//         } else {
//             this.progressContainer.style.display = 'none';
//         }
//
//         this.hidden = !this.hidden;
//     }
// }
//
// const progressInstance = new Progress(document.querySelector('.progress'));
//
// valueInput.addEventListener('input', (event) => {
//     let value = event.target.value;
//
//     if (value > 100) {
//         value = 100;
//         valueInput.value = value;
//     }
//
//     progressInstance.updateValue(parseInt(value));
// });
//
// switchInputAnimate.addEventListener('change', () => {
//     progressInstance.toggleAnimation();
// });
//
// switchInputHide.addEventListener('change', () => {
//     progressInstance.toggleHiddenState();
// });
