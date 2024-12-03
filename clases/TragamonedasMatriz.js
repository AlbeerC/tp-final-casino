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
exports.TragamonedaMatriz = void 0;
var Tragamoneda_1 = require("./Tragamoneda");
var TragamonedaMatriz = /** @class */ (function (_super) {
    __extends(TragamonedaMatriz, _super);
    function TragamonedaMatriz(nombre, apuestaMinima, apuestaMaxima) {
        var _this = _super.call(this, nombre, apuestaMinima, apuestaMaxima) || this;
        _this.filas = 3;
        _this.columnas = 3;
        _this.mensajeResultado = '';
        _this.matriz = [];
        _this.simbolos = ["🍀", "💎", "🚀", "🔥", "🎲", "👑"];
        return _this;
    }
    // Crear la matriz y llenarla con números aleatorios
    TragamonedaMatriz.prototype.llenarMatriz = function () {
        var _this = this;
        this.matriz = Array.from({ length: this.filas }, function () {
            return Array.from({ length: _this.columnas }, function () { return Math.floor(Math.random() * _this.simbolos.length); });
        });
    };
    // Mostrar los símbolos del resultado
    TragamonedaMatriz.prototype.mostrarMatriz = function () {
        var _this = this;
        this.matriz.forEach(function (fila) {
            console.log(fila.map(function (index) { return _this.simbolos[index]; }).join(" | "));
        });
    };
    TragamonedaMatriz.prototype.iniciarTirada = function (usuario, apuesta) {
        if (apuesta < this.apuestaMinima || apuesta > this.apuestaMaxima) {
            this.mensajeResultado = "La apuesta debe estar entre ".concat(this.apuestaMinima, " y ").concat(this.apuestaMaxima, ".");
            return;
        }
        if (usuario.getDineroActual() < apuesta) {
            this.mensajeResultado = "No cuentas con suficiente dinero";
            return;
        }
        usuario.ajustarDinero(-apuesta);
        this.llenarMatriz();
        this.mostrarMatriz();
        usuario.ajustarDinero(this.calcularGanancia(usuario, apuesta));
        this.mensajeResultado = "Ganancia total: $".concat(this.calcularGanancia(usuario, apuesta), " pesos");
    };
    TragamonedaMatriz.prototype.calcularGanancia = function (usuario, apuesta) {
        var gananciaTotal = 0;
        // Premios para cada símbolo
        var premios = {
            "🍀": (2 * apuesta),
            "💎": (4 * apuesta),
            "🚀": (6 * apuesta),
            "🔥": (8 * apuesta),
            "🎲": (10 * apuesta),
            "👑": (20 * apuesta)
        };
        // Evaluar filas horizontales
        for (var i = 0; i < 3; i++) {
            var simbolo1_1 = this.simbolos[this.matriz[i][0]];
            var simbolo2_1 = this.simbolos[this.matriz[i][1]];
            var simbolo3_1 = this.simbolos[this.matriz[i][2]];
            if (simbolo1_1 === simbolo2_1 && simbolo2_1 === simbolo3_1) {
                gananciaTotal += premios[simbolo1_1];
            }
        }
        // Diagonal principal (arriba izquierda -> abajo derecha)
        var simbolo1 = this.simbolos[this.matriz[0][0]];
        var simbolo2 = this.simbolos[this.matriz[1][1]];
        var simbolo3 = this.simbolos[this.matriz[2][2]];
        if (simbolo1 === simbolo2 && simbolo2 === simbolo3) {
            gananciaTotal += premios[simbolo1];
        }
        // Diagonal secundaria (arriba derecha -> abajo izquierda)
        var simbolo4 = this.simbolos[this.matriz[0][2]];
        var simbolo5 = this.simbolos[this.matriz[1][1]];
        var simbolo6 = this.simbolos[this.matriz[2][0]];
        if (simbolo4 === simbolo5 && simbolo5 === simbolo6) {
            gananciaTotal += premios[simbolo4];
        }
        return gananciaTotal;
    };
    TragamonedaMatriz.prototype.mostrarResultado = function () {
        if (this.mensajeResultado) {
            console.log(this.mensajeResultado);
        }
        else {
            console.log("No hay resultado para mostrar aún");
        }
    };
    return TragamonedaMatriz;
}(Tragamoneda_1.Tragamoneda));
exports.TragamonedaMatriz = TragamonedaMatriz;
