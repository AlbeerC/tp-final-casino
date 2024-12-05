"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Casino = void 0;
var Casino = /** @class */ (function () {
    function Casino(nombre, id, ubicacion) {
        this.juegos = [];
        this.usuarios = [];
        this.nombre = nombre;
        this.id = id;
        this.ubicacion = ubicacion;
    }
    Casino.prototype.agregarUsuario = function (usuario) {
        this.usuarios.push(usuario);
    };
    Casino.prototype.crearJuego = function (juego) {
        this.juegos.push(juego);
    };
    Casino.prototype.mostrarJuegos = function () {
        this.juegos.forEach(function (juego, index) {
            console.log("".concat(index + 1, " - ").concat(juego.getNombre()));
        });
    };
    // Getters
    Casino.prototype.getNombre = function () {
        return this.nombre;
    };
    Casino.prototype.getUbicacion = function () {
        return this.ubicacion;
    };
    Casino.prototype.getId = function () {
        return this.id;
    };
    Casino.prototype.getJuegos = function () {
        return this.juegos;
    };
    // Setters
    Casino.prototype.setNombre = function (nombre) {
        this.nombre = nombre;
    };
    Casino.prototype.setUbicacion = function (ubicacion) {
        this.ubicacion = ubicacion;
    };
    return Casino;
}());
exports.Casino = Casino;
