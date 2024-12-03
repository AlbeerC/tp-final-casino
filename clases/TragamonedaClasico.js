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
        _this.simbolos = ["🍒", "🍋", "🍊", "🍇", "⭐", "🔔"];
        _this.resultado = [];
        _this.mensajeResultado = '';
        return _this;
    }
    TragamonedaClasico.prototype.iniciarTirada = function (usuario, apuesta) {
        if (apuesta < this.apuestaMinima || apuesta > this.apuestaMaxima) {
            this.mensajeResultado = "La apuesta debe estar entre ".concat(this.apuestaMinima, " y ").concat(this.apuestaMaxima, ".");
            return;
        }
        if (usuario.getDineroActual() < apuesta) {
            this.mensajeResultado = "No cuentas con suficiente dinero";
            return;
        }
        usuario.ajustarDinero(-apuesta);
        this.calcularGanancia(usuario, apuesta);
    };
    TragamonedaClasico.prototype.calcularGanancia = function (usuario, apuesta) {
        for (var i = 0; i < 3; i++) {
            var indice = Math.floor(Math.random() * this.simbolos.length);
            this.resultado.push(this.simbolos[indice]);
        }
        console.log("".concat(this.resultado.join(" | ")));
        // Si coinciden los tres símbolos
        if (this.resultado[0] === this.resultado[1] && this.resultado[1] === this.resultado[2]) {
            var ganancia = apuesta * 10;
            usuario.ajustarDinero(ganancia);
            this.mensajeResultado = "Felicidades! Los tres s\u00EDmbolos fueron iguales. Ganaste $".concat(ganancia, " pesos");
            // Si coinciden dos símbolos
        }
        else if (this.resultado[0] === this.resultado[1] || this.resultado[1] === this.resultado[2] || this.resultado[0] === this.resultado[2]) {
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
