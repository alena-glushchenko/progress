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
            this.progressContainer.style.visibility = 'visible';
        } else {
            this.progressContainer.style.visibility = 'hidden';
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
//             this.progressContainer.style.visibility = 'visible';
//         } else {
//             this.progressContainer.style.visibility = 'hidden';
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

let list = {
    value: 1,
    next: {
        value: 2,
        next: {
            value: 3,
            next: {
                value: 4,
                next: null
            }
        }
    }
};

const sumTo = (n) => {
    // if (n === 1) {
    //     return 1;
    // } else {
    //     return n + sumTo(n - 1);
    // }

    return n === 1 ? 1 :  n + sumTo(n - 1);
}

// console.log(sumTo(1));
// console.log(sumTo(2));
// console.log(sumTo(3));
// console.log(sumTo(4));
// console.log(sumTo(100));


const factorial = (n) => {
    // if (n === 1) {
    //     return 1;
    // } else {
    //     return n * factorial(n - 1);
    // }

    return n === 1 ? 1 : n * factorial(n - 1)
}

// console.log(factorial(5))


const fib = (n) => {
    if (n <= 1) {
        return n;
    } else {
        return fib(n - 1) + fib(n - 2);
    }
}

// console.log(fib(3)); // 2
// console.log(fib(7)); // 13
// console.log(fib(77)); // 5527939700884757

const printList = (list) => {
    console.log( list.value)
    !list.next ? list.value : printList(list.next);
}

// printList(list)

const printListReverse = (list) => {
    if (list.next) {
        printListReverse(list.next);
    }
    console.log(list.value)

    // list.next ? printList(list.next) : list.value;
}

// printListReverse(list)

const sum = (a) => {
    return function (b) {
        return a + b;
    }
}

function makeCounter() {
    let count = 0;

    return function() {
        return count++; // есть доступ к внешней переменной "count"
    };
}

const byField = (sortingValue) => {
    return function (a, b) {
        return a[sortingValue] > b[sortingValue] ? 1 : -1;
    }
}

//1 4 2
//3 2 1

const game = (n, ...args) => {
    let Petya = args[0];
    let Vasya = args[1];

    for (let i = 2; i < n; i++) {
        if (Vasya > Petya) {
            Petya += args[i];
        } else {
            Vasya += args[i];
        }
    }

    return Petya === Math.max(Petya, Vasya) ? "Petya" : "Vasya";
}

// console.log(game(3, 1, 2, 3 ))

const money = (n , sum,  ...args) => {
    let count = 0;

    for (let i = 0; i < n; i++) {
        count += args[i];
    }

    return count === sum ? "Yes" : "No";
}

// console.log(money(2, 4, 2, 3))

