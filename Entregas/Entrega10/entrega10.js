// Ejercicio 8

class Figura {
    constructor(x, y) {
        this._x = x;
        this._y = y;
        this._color = "#000000";
    }
    set color(color) {
        if (/[#]{1}[a-fA-F0-9]{6}/.test(color)) {
            this._color = color;
        }
    }
    pintar() {
        console.log("Nos movemos a la posición (" + str(this._x) +
            ", " + str(this._y) + ") Cogemos la pintura de color " + this._color)
    }
    esblanca() {
        return _color === "#FFFFFF"
    }
}

class Elipse extends Figura {
    constructor(x, y, rh, rv) {
        super(x, y);
        this._rh = rh;
        this._rv = rv;
    }
    pintar() {
        if (this._rh === this._rv) {
            console.log("Nos movemos a la posición (" + str(this._x) + ", " + str(this._y) + ") Cogemos la pintura de color " + this._color /
                +"Pintamos elipse de radios " + _rh + " y " + _rv)
        } else {
            console.log("Nos movemos a la posición (" + str(this._x) + ", " + str(this._y) + ") Cogemos la pintura de color " + this._color /
                +"Pintamos circulo de radio " + _rh)
        }
    }
}


class Circulo extends Elipse {
    constructor(x, y, r) {
        super(x, y, r, r);
    }
}