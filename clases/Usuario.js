"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuario = void 0;
var Usuario = /** @class */ (function () {
    function Usuario(nombre, dineroInicial) {
        this.nombre = nombre;
        this.dineroInicial = dineroInicial;
        this.dineroActual = dineroInicial;
    }
    Usuario.prototype.depositarDinero = function (cantidad) {
        this.dineroActual += cantidad;
        console.log("Depositado ".concat(cantidad, " a tu cuenta."));
    };
    Usuario.prototype.retirarDinero = function (cantidad) {
        if (cantidad < this.dineroActual) {
            console.log("Retirado ".concat(cantidad, " de tu cuenta."));
        }
        else {
            console.log("No cuentas con suficiente dinero");
        }
    };
    Usuario.prototype.ajustarDinero = function (cantidad) {
        this.dineroActual += cantidad;
    };
    Usuario.prototype.verDinero = function () {
        console.log(this.dineroActual);
    };
    // Getters
    Usuario.prototype.getNombre = function () {
        return this.nombre;
    };
    Usuario.prototype.getDineroActual = function () {
        return this.dineroActual;
    };
    // Setters
    Usuario.prototype.setDinero = function (dinero) {
        this.dineroActual = dinero;
    };
    return Usuario;
}());
exports.Usuario = Usuario;
