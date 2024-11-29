"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Juego = void 0;
var Juego = /** @class */ (function () {
    function Juego(nombre, apuestaMinima, apuestaMaxima) {
        this.nombre = nombre;
        this.apuestaMinima = apuestaMinima;
        this.apuestaMaxima = apuestaMaxima;
    }
    // Getters
    Juego.prototype.getNombre = function () {
        return this.nombre;
    };
    Juego.prototype.getApuestaMinima = function () {
        return this.apuestaMinima;
    };
    Juego.prototype.getApuestaMaxima = function () {
        return this.apuestaMaxima;
    };
    // Setters
    Juego.prototype.setNombre = function (nombre) {
        this.nombre = nombre;
    };
    Juego.prototype.setApuestaMinima = function (apuestaMinima) {
        this.apuestaMinima = apuestaMinima;
    };
    Juego.prototype.setApuestaMaxima = function (apuestaMaxima) {
        this.apuestaMaxima = apuestaMaxima;
    };
    return Juego;
}());
exports.Juego = Juego;
