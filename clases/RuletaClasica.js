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
exports.RuletaClasica = void 0;
var Ruleta_1 = require("./Ruleta");
var readlineSync = require("readline-sync");
var RuletaClasica = /** @class */ (function (_super) {
    __extends(RuletaClasica, _super);
    function RuletaClasica(nombre, apuestaMinima, apuestaMaxima) {
        return _super.call(this, nombre, apuestaMinima, apuestaMaxima) || this;
    }
    RuletaClasica.prototype.mostrarReglas = function () {
        console.log("\uD83C\uDFA1 ".concat(this.nombre, ":\n            -La apuesta debe estar entre ").concat(this.apuestaMinima, " y ").concat(this.apuestaMaxima, "\n            -Pod\u00E9s apostar los n\u00FAmeros que quieras entre 0 y ").concat(this.numeros.length - 1, "\n            -Si apostaste al n\u00FAmero ganador, ganar\u00E1s lo apostado a ese n\u00FAmero multiplicado por ").concat(this.numeros.length - 1, "\n            "));
    };
    RuletaClasica.prototype.iniciarTirada = function (usuario, apuesta) {
        this.mostrarReglas();
        this.validarApuesta(usuario, apuesta);
        var numerosElegidos = [];
        while (true) {
            var numero = readlineSync.questionInt("Elige un numero del 0 al ".concat(this.numeros.length - 1, " (o presiona -1 para terminar): "));
            if (numero === -1)
                break; // Salir del bucle si elige -1
            if (numero < 0 || numero > this.numeros.length) {
                console.log("N\u00FAmero inv\u00E1lido. Debe estar entre 0 y ".concat(this.numeros.length - 1, "."));
                continue;
            }
            if (!numerosElegidos.includes(numero)) {
                numerosElegidos.push(numero); // Agregar el número si no está en la lista
                console.log("N\u00FAmero ".concat(numero, " a\u00F1adido a tu jugada."));
            }
            else {
                console.log("El n\u00FAmero ".concat(numero, " ya ha sido elegido."));
            }
        }
        // Calcular la apuesta total
        var apuestaTotal = numerosElegidos.length * apuesta;
        if (numerosElegidos.length === 0) {
            this.mensajeResultado = "No elegiste ningún número. La jugada no se realizó.";
            return;
        }
        usuario.ajustarDinero(-apuestaTotal); // Descontar la apuesta total
        this.numeroGanador = Math.floor(Math.random() * this.numeros.length); // Número aleatorio entre 0 y 36
        // Verificar si el número ganador está entre los números elegidos
        if (numerosElegidos.includes(this.numeroGanador)) {
            var ganancia = apuesta * this.numeros.length - 1;
            usuario.ajustarDinero(ganancia);
            this.mensajeResultado = "\u00A1Felicidades! Uno de tus n\u00FAmeros (".concat(this.numeroGanador, ") fue el ganador. Has ganado ").concat(ganancia, " fichas.");
        }
        else {
            this.mensajeResultado = "Has perdido tu apuesta. El n\u00FAmero ganador fue ".concat(this.numeroGanador, ". Mejor suerte la pr\u00F3xima vez.");
        }
    };
    RuletaClasica.prototype.mostrarResultado = function () {
        if (this.mensajeResultado) {
            console.log(this.mensajeResultado);
        }
        else {
            console.log("No hay resultado para mostrar aún");
        }
    };
    return RuletaClasica;
}(Ruleta_1.Ruleta));
exports.RuletaClasica = RuletaClasica;
