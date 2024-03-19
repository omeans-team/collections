const textElem = document.querySelector('#shadow__text');
const spotElem = document.querySelector('#shadow__spot');
const boxElem = document.querySelector('#shadow__box--back');

const container = document.querySelector('#box');
var width = container.offsetWidth;
var height = container.offsetHeight;

const relMousePos = {
    _x: 0, _y: 0, x: 0, y: 0,
    updatePos: function(e) {
        const event = (e || window.event) && (e.touches && e.touches[0]) || e;
        this.x = event.clientX - this._x;
        this.y = event.clientY - this._y;
    },
    setOrigin: function(e) {
        this._x = e.offsetLeft + Math.floor(e.offsetWidth / 2);
        this._y = e.offsetTop + Math.floor(e.offsetHeight / 2);
    }
}
relMousePos.setOrigin(container);
container.addEventListener('mousemove', relMousePos.updatePos);

function updateSize(e) {
    width = container.offsetWidth;
    height = container.offsetHeight;
    relMousePos.setOrigin(container);
    
    onMouseMove({clientX: relMousePos._x, clientY: relMousePos._y + 25});
}

function updateTime() {
    let date = new Date();
    let time = date.toLocaleTimeString();
    textElem.innerText = time;
    
    setTimeout(updateTime, 1000);
}

function onMouseMove(e) {
    relMousePos.updatePos(e);
    
    var xm = relMousePos.x;
    var ym = relMousePos.y;

    var d = Math.round(Math.sqrt(xm*xm + ym*ym) / 10);
    textElem.style.textShadow = -xm + 'px ' + -ym + 'px ' + (d + 10) + 'px black';    
    boxElem.style.boxShadow = '0 ' + -ym + 'px ' + (d + 30) + 'px black';    
    spotElem.style.backgroundPosition = (xm - (width / 2)) + 'px ' + (ym - (height / 2)) + 'px';
}

function init() {  
    updateTime();
    
    container.addEventListener('mousemove', onMouseMove);
    container.addEventListener('touchmove', function (e) {
        e.preventDefault();
        e.stopPropagation();
        onMouseMove(e);
    }, {passive: false});
    
    onMouseMove({clientX: relMousePos._x, clientY: relMousePos._y + 25});
}

document.addEventListener('resize', updateSize);
document.addEventListener('DOMContentLoaded', init);

