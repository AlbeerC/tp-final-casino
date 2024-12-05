"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.TragamonedaClasico = void 0;
var Tragamoneda_1 = require("./Tragamoneda");
var TragamonedaClasico = /** @class */ (function (_super) {
    __extends(TragamonedaClasico, _super);
    function TragamonedaClasico(nombre, apuestaMinima, apuestaMaxima) {
        var _this = _super.call(this, nombre, apuestaMinima, apuestaMaxima) || this;
        _this.resultadoSimbolos = [];
        _this.simbolos = ["🍒", "🍋", "🍊", "🍇", "⭐", "🔔"];
        return _this;
    }
    TragamonedaClasico.prototype.mostrarReglas = function () {
        console.log("".concat(this.nombre, "\n            -La apuesta debe estar entre ").concat(this.apuestaMinima, " y ").concat(this.apuestaMaxima, "\n            -En cada tirada, salen tres s\u00EDmbolos:\n                -Si coinciden los tres, ganas tu apuesta multiplicado por 10\n                -Si coinciden dos, recuperas tu apuesta\n                -Si no coincide ninguno, pierdes tu apuesta\n            "));
    };
    TragamonedaClasico.prototype.iniciarTirada = function (usuario, apuesta) {
        this.resultadoSimbolos = [];
        this.validarApuesta(usuario, apuesta);
        usuario.ajustarDinero(-apuesta);
        this.calcularGanancia(usuario, apuesta);
        this.mostrarResultado();
    };
    TragamonedaClasico.prototype.calcularGanancia = function (usuario, apuesta) {
        for (var i = 0; i < 3; i++) {
            var indice = Math.floor(Math.random() * this.simbolos.length);
            this.resultadoSimbolos.push(this.simbolos[indice]);
        }
        console.log("".concat(this.resultadoSimbolos.join(" | ")));
        // Si coinciden los tres símbolos
        if (this.resultadoSimbolos[0] === this.resultadoSimbolos[1] && this.resultadoSimbolos[1] === this.resultadoSimbolos[2]) {
            var ganancia = apuesta * 10;
            usuario.ajustarDinero(ganancia);
            this.mensajeResultado = "Felicidades! Los tres s\u00EDmbolos fueron iguales. Ganaste $".concat(ganancia, " pesos");
            // Si coinciden dos símbolos
        }
        else if (this.resultadoSimbolos[0] === this.resultadoSimbolos[1] || this.resultadoSimbolos[1] === this.resultadoSimbolos[2] || this.resultadoSimbolos[0] === this.resultadoSimbolos[2]) {
            usuario.ajustarDinero(apuesta);
            this.mensajeResultado = "Coincideron dos s\u00EDmbolos. Recuperas la apuesta";
            // Si no coincide ninguno
        }
        else {
            this.mensajeResultado = "Los tres s\u00EDmbolos fueron distintos. Pierdes $".concat(apuesta, " pesos");
        }
    };
    TragamonedaClasico.prototype.mostrarResultado = function () {
        if (this.mensajeResultado) {
            console.log(this.mensajeResultado);
        }
        else {
            console.log("No hay resultado para mostrar aún");
        }
    };
    return TragamonedaClasico;
}(Tragamoneda_1.Tragamoneda));
exports.TragamonedaClasico = TragamonedaClasico;
