"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Menu = void 0;
var rls = require("readline-sync");
var Casino_1 = require("./Casino");
var Usuario_1 = require("./Usuario");
var TragamonedaClasico_1 = require("./TragamonedaClasico");
var TragamonedasMatriz_1 = require("./TragamonedasMatriz");
var ruletaClasica_1 = require("./ruletaClasica");
var RuletaPotenciada_1 = require("./RuletaPotenciada");
var Menu = /** @class */ (function () {
    function Menu() {
        this.casino = new Casino_1.Casino("Casino ilegal", 24225, "Olavarria");
        this.crearJuegos();
    }
    Menu.prototype.crearJuegos = function () {
        var tragamonedas1 = new TragamonedaClasico_1.TragamonedaClasico("Tragamoneda Clásico", 10, 200);
        var tragamonedas2 = new TragamonedasMatriz_1.TragamonedaMatriz("Tragamoneda 3x3", 20, 200);
        var ruleta1 = new ruletaClasica_1.RuletaClasica("Ruleta Clásica", 5, 100);
        var ruleta2 = new RuletaPotenciada_1.RuletaPotenciada("Ruleta Potenciada", 10, 100);
        this.casino.crearJuego(tragamonedas1);
        this.casino.crearJuego(tragamonedas2);
        this.casino.crearJuego(ruleta1);
        this.casino.crearJuego(ruleta2);
    };
    Menu.prototype.mostrarMenu = function () {
        var opcion;
        // Menú principal
        do {
            console.clear();
            console.log("=========================");
            console.log("Bienvenido al Casino ".concat(this.casino.getNombre()));
            console.log("=========================");
            console.log("1 - Registrarse");
            console.log("0 - Salir");
            opcion = rls.questionInt("Selecciona una opcion: ");
            switch (opcion) {
                case 1:
                    this.registrarUsuario();
                    break;
                case 0:
                    console.log("Gracias por visitarnos. ¡Hasta pronto!");
                    break;
                default:
                    console.log("Opcion invalida. Intenta de nuevo.");
            }
        } while (opcion !== 0);
    };
    Menu.prototype.registrarUsuario = function () {
        console.clear();
        console.log("=========================");
        console.log("Registro de Usuario");
        console.log("=========================");
        var nombre = rls.question("Ingresa tu nombre: ");
        var dineroInicial = parseFloat(rls.question("Ingresa tu dinero inicial: "));
        if (isNaN(dineroInicial) || dineroInicial <= 0) {
            console.log("Dinero inicial invalido. Debes ingresar un numero mayor a 0.");
            rls.question("Presiona Enter para regresar al menu principal...");
            return;
        }
        var nuevoUsuario = new Usuario_1.Usuario(nombre, dineroInicial);
        this.casino.agregarUsuario(nuevoUsuario);
        this.usuarioActual = nuevoUsuario;
        console.log("\u00A1Bienvenido, ".concat(nombre, "! Tienes $").concat(dineroInicial, " para jugar."));
        rls.question("Presiona Enter para continuar...");
        this.mostrarMenuUsuario();
    };
    // Menú gestión del usuario
    Menu.prototype.mostrarMenuUsuario = function () {
        var opcion;
        do {
            console.clear();
            console.log("=========================");
            console.log("Usuario: ".concat(this.usuarioActual.getNombre(), " | Saldo: $").concat(this.usuarioActual.dineroActual));
            console.log("=========================");
            console.log("1 - Jugar un juego");
            console.log("2 - Depositar dinero");
            console.log("3 - Ver dinero");
            console.log("4 - Retirar dinero");
            console.log("0 - Salir");
            opcion = rls.questionInt("Selecciona una opcion: ");
            switch (opcion) {
                case 1:
                    this.jugarJuego();
                    break;
                case 2:
                    this.depositarDinero();
                    break;
                case 3:
                    this.verDinero();
                    break;
                case 4:
                    this.retirarDinero();
                    break;
                case 0:
                    console.log("Saliendo del menu de usuario...");
                    break;
                default:
                    console.log("Opcion invalida. Intenta de nuevo.");
                    rls.question("Presiona Enter para continuar...");
            }
        } while (opcion !== 0);
    };
    // Elegir un juego
    Menu.prototype.jugarJuego = function () {
        console.clear();
        console.log("=========================");
        console.log("Seleccionar Juego");
        console.log("=========================");
        this.casino.mostrarJuegos();
        var opcion = parseInt(rls.questionInt("Selecciona un juego por su numero o 0 para volver: "));
        if (isNaN(opcion) || opcion < 0 || opcion > this.casino.getJuegos().length) {
            console.log("Opcion invalida. Volviendo al menu...");
        }
        else if (opcion === 0) {
            console.log("Volviendo al menu de usuario...");
        }
        else {
            console.log("Has seleccionado: ".concat(this.casino.getJuegos()[opcion - 1].getNombre()));
            rls.question("Presiona Enter para continuar...");
            this.menuJugar(this.casino.getJuegos()[opcion - 1]);
        }
    };
    Menu.prototype.depositarDinero = function () {
        console.clear();
        console.log("=========================");
        console.log("Depositar Dinero");
        console.log("=========================");
        var cantidad = parseFloat(rls.questionInt("Ingresa la cantidad a depositar: "));
        if (isNaN(cantidad) || cantidad <= 0) {
            console.log("Cantidad invalida. Debes ingresar un numero mayor a 0.");
        }
        else {
            this.usuarioActual.dineroActual += cantidad;
            console.log("Has depositado $".concat(cantidad, ". Tu saldo actual es $").concat(this.usuarioActual.dineroActual, "."));
        }
        rls.question("Presiona Enter para continuar...");
    };
    Menu.prototype.verDinero = function () {
        console.clear();
        console.log("=========================");
        console.log("Tu saldo actual es: $".concat(this.usuarioActual.dineroActual, " ."));
        console.log("=========================");
        rls.question("Presiona Enter para continuar...");
    };
    Menu.prototype.retirarDinero = function () {
        console.clear();
        console.log("=========================");
        console.log("Retirar Dinero");
        console.log("=========================");
        var cantidad = parseFloat(rls.questionInt("Ingresa la cantidad a retirar: "));
        if (isNaN(cantidad) || cantidad <= 0) {
            console.log("Cantidad invalida. Debes ingresar un numero mayor a 0.");
        }
        else if (cantidad > this.usuarioActual.dineroActual) {
            console.log("No tienes suficientes dinero para retirar esa cantidad.");
        }
        else {
            this.usuarioActual.dineroActual -= cantidad;
            console.log("Has retirado $".concat(cantidad, ". Tu saldo actual es ").concat(this.usuarioActual.dineroActual, "."));
        }
        rls.question("Presiona Enter para continuar...");
    };
    Menu.prototype.menuJugar = function (juego) {
        var opcion;
        do {
            console.clear();
            console.log("=========================");
            console.log("Juego: ".concat(juego.getNombre()));
            console.log("=========================");
            juego.mostrarReglas();
            console.log("1 - Ingresar cantidad de apuesta");
            console.log("0 - Salir");
            opcion = rls.questionInt("Selecciona una opcion: ");
            switch (opcion) {
                case 1:
                    this.ingresarApuesta(juego);
                    break;
                case 0:
                    console.log("Saliendo del juego...");
                    break;
                default:
                    console.log("Opcion invalida. Intenta de nuevo.");
            }
        } while (opcion !== 0);
    };
    Menu.prototype.ingresarApuesta = function (juego) {
        var cantidad;
        var continuar = true;
        while (continuar) {
            console.clear();
            console.log("=========================");
            console.log("Ingresar Apuesta - ".concat(juego.getNombre()));
            console.log("=========================");
            // Usa questionFloat para permitir números decimales
            cantidad = rls.questionFloat("Ingresa la cantidad a apostar (0 para regresar al menú anterior): ");
            juego.validarApuesta(this.usuarioActual, cantidad);
            this.menuTragamonedas(juego, cantidad);
            rls.question("Presiona Enter para continuar jugando o ingresa 0 para regresar al menú...");
        }
    };
    Menu.prototype.menuTragamonedas = function (juego, cantidad) {
        var continuar = true;
        while (continuar) {
            console.clear();
            console.log("=========================");
            console.log("".concat(juego.getNombre()));
            console.log("=========================");
            console.log("Iniciando tirada...");
            juego.iniciarTirada(this.usuarioActual, cantidad); // Inicia la tirada
            // Pregunta si desea continuar o volver al menú de apuestas
            var opcion = rls.questionInt("Presiona 1 para hacer otra tirada o 0 para volver: ");
            if (opcion === 0) {
                console.log("Volviendo al menú de apuestas...");
                continuar = false; // Salir del ciclo y regresar al menú de apuestas
            }
            else if (opcion !== 1) {
                console.log("Opción inválida. Regresando al menú de apuestas...");
                continuar = false;
            }
        }
    };
    return Menu;
}());
exports.Menu = Menu;
