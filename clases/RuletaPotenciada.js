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
exports.RuletaPotenciada = void 0;
var readlineSync = require("readline-sync");
var Ruleta_1 = require("./Ruleta");
var RuletaPotenciada = /** @class */ (function (_super) {
    __extends(RuletaPotenciada, _super);
    function RuletaPotenciada(nombre, apuestaMinima, apuestaMaxima) {
        var _this = _super.call(this, nombre, apuestaMinima, apuestaMaxima) || this;
        _this.numerosPotenciados = [];
        _this.numeroGanador = null;
        _this.resultado = "";
        return _this;
    }
    RuletaPotenciada.prototype.iniciarTirada = function (usuario, apuesta) {
        if (apuesta < this.apuestaMinima || apuesta > this.apuestaMaxima) {
            this.resultado = "La apuesta debe estar entre ".concat(this.apuestaMinima, " y ").concat(this.apuestaMaxima, ".");
            return;
        }
        if (usuario.getDineroActual() < apuesta) {
            this.resultado = "No cuentas con suficiente dinero";
            return;
        }
        this.generarNumerosPotenciados();
        var numerosElegidos = [];
        while (true) {
            var numero = readlineSync.questionInt("Elige un numero del 0 al ".concat(this.numeros.length - 1, " (o presiona -1 para terminar): "));
            if (numero === -1)
                break;
            if (numero < 0 || numero > this.numeros.length) {
                console.log("N\u00FAmero inv\u00E1lido. Debe estar entre 0 y ".concat(this.numeros.length - 1, "."));
                continue;
            }
            if (!numerosElegidos.includes(numero)) {
                numerosElegidos.push(numero);
                console.log("N\u00FAmero ".concat(numero, " a\u00F1adido a tu jugada."));
            }
            else {
                console.log("El n\u00FAmero ".concat(numero, " ya ha sido elegido."));
            }
        }
        var apuestaTotal = numerosElegidos.length * apuesta;
        if (numerosElegidos.length === 0) {
            this.resultado = "No elegiste ningún número. La jugada no se realizó.";
            return;
        }
        usuario.ajustarDinero(-apuestaTotal);
        this.numeroGanador = Math.floor(Math.random() * this.numeros.length);
        if (numerosElegidos.includes(this.numeroGanador)) {
            var ganancia = 0;
            if (this.numerosPotenciados.includes(this.numeroGanador)) {
                ganancia = apuesta * (this.numeros.length - 1) * 5;
                this.resultado = "\u00A1Felicidades! Uno de tus n\u00FAmeros (".concat(this.numeroGanador, ") estaba potenciado y fue el ganador. Has ganado ").concat(ganancia, " fichas.");
            }
            else {
                ganancia = apuesta * this.numeros.length - 1;
                this.resultado = "\u00A1Felicidades! Uno de tus n\u00FAmeros (".concat(this.numeroGanador, ") fue el ganador. Has ganado ").concat(ganancia, " fichas.");
            }
            usuario.ajustarDinero(ganancia);
        }
        else {
            this.resultado = "Has perdido tu apuesta. El n\u00FAmero ganador fue ".concat(this.numeroGanador, ". Mejor suerte la pr\u00F3xima vez.");
        }
    };
    RuletaPotenciada.prototype.mostrarResultado = function () {
        if (this.resultado) {
            console.log(this.resultado);
        }
        else {
            console.log("No hay resultado para mostrar aún");
        }
    };
    RuletaPotenciada.prototype.generarNumerosPotenciados = function () {
        for (var i = 0; i < 5; i++) {
            var numeroAleatorio = Math.floor(Math.random() * this.numeros.length);
            if (!this.numerosPotenciados.includes(numeroAleatorio)) {
                this.numerosPotenciados.push(numeroAleatorio);
            }
        }
    };
    return RuletaPotenciada;
}(Ruleta_1.Ruleta));
exports.RuletaPotenciada = RuletaPotenciada;
