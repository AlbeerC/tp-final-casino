import * as rls from "readline-sync";
import { Casino } from "./Casino";
import { Usuario } from "./Usuario";
import { Tragamoneda } from "./Tragamoneda";
import { TragamonedaClasico } from "./TragamonedaClasico";
import { TragamonedaMatriz } from "./TragamonedasMatriz";
import { RuletaClasica } from "./ruletaClasica";
import { RuletaPotenciada } from "./RuletaPotenciada";
 
export class Menu {
    private casino: Casino = new Casino("Ilegal", 24225, "Olavarria");
    private usuarioActual: Usuario;

    crearJuegos(): void {
        const tragamonedas1 = new TragamonedaClasico("Tragamoneda Clásico", 10, 200);
        const tragamonedas2 = new TragamonedaMatriz("Tragamoneda 3x3", 20, 200);
        const ruleta1 = new RuletaClasica("Ruleta Clásica", 5, 100);
        const ruleta2 = new RuletaPotenciada("Ruleta Potenciada", 10, 100);
        this.casino.crearJuego(tragamonedas1);
        this.casino.crearJuego(tragamonedas2);
        this.casino.crearJuego(ruleta1);
        this.casino.crearJuego(ruleta2);
    }

    constructor() {
        this.crearJuegos();
    }

    mostrarCabecera(): void {
        console.clear();
        console.log("\x1b[33m==============================");
        console.log(`Usuario: ${this.usuarioActual.getNombre()} | Dinero: $${this.usuarioActual.getDineroActual()}`);
        console.log("==============================\x1b[0m");
    }    

    mostrarMenu(): void {
        let opcion: number;

        // Menú principal
        do {
            console.clear();
            console.log("\x1b[35m====================================");
            console.log(`Bienvenido al Casino ${this.casino.getNombre()}`);
            console.log("====================================\x1b[0m");
            console.log("\x1b[32m1 - Registrarse");
            console.log("0 - Salir\x1b[0m");

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
    }

    registrarUsuario() {
        console.clear();
        console.log("\x1b[34m=========================");
        console.log("Registro de Usuario");
        console.log("=========================\x1b[0m");

        const nombre = rls.question("Ingresa tu nombre: ");
        const dineroInicial = rls.questionFloat("Ingresa tu dinero inicial: ");

        if (isNaN(dineroInicial) || dineroInicial <= 0) {
            console.log("Dinero inicial invalido. Debes ingresar un numero mayor a 0.");
            return;
        }

        const nuevoUsuario = new Usuario(nombre, dineroInicial);
        this.casino.agregarUsuario(nuevoUsuario);
        this.usuarioActual = nuevoUsuario;

        console.log(`¡Bienvenido, ${nombre}! Tienes $${dineroInicial} para jugar.`);

        this.mostrarMenuUsuario();
    }

    // Menú gestión del usuario
    mostrarMenuUsuario(): void {
        let opcion: number;

        do {
            console.clear();
            this.mostrarCabecera();
            console.log("\x1b[32m1 - Jugar un juego");
            console.log("2 - Depositar dinero");
            console.log("3 - Retirar dinero");
            console.log("0 - Volver\x1b[0m");

            opcion = rls.questionInt("Selecciona una opcion: ");

            switch (opcion) {
                case 1:
                    this.jugarJuego();
                    break;
                case 2:
                    this.depositarDinero();
                    break;
                case 3:
                    this.retirarDinero();
                    break;
                case 0:
                    console.log("Saliendo del menu de usuario...");
                    break;
                default:
                    console.log("Opcion invalida. Intenta de nuevo.");
            }
        } while (opcion !== 0);
    }

    // Elegir un juego
    jugarJuego() {
        this.mostrarCabecera();
        console.clear();
        console.log("\x1b[34m=========================");
        console.log("Seleccionar Juego");
        console.log("=========================\x1b[0m");

        this.casino.mostrarJuegos();
        console.log("0 - Volver\x1b[0m")

        const opcion = rls.questionInt("Selecciona una opcion: ");

        if (isNaN(opcion) || opcion < 0 || opcion > this.casino.getJuegos().length) {
            console.log("Opcion invalida. Volviendo al menu...");
        } else if (opcion === 0) {
            console.log("Volviendo al menu de usuario...");
        } else {
            console.log(`Has seleccionado: ${this.casino.getJuegos()[opcion - 1].getNombre()}`);
            
            this.menuJugar(this.casino.getJuegos()[opcion - 1])
        }
    }

    depositarDinero() {
        console.clear();
        console.log("\x1b[34m=========================");
        console.log("Depositar Dinero");
        console.log("=========================\x1b[0m");
    
        const cantidad = rls.questionFloat("Ingresa la cantidad a depositar: ");
    
        if (isNaN(cantidad) || cantidad <= 0) {
            console.log("Cantidad invalida. Debes ingresar un numero mayor a 0.");
        } else {
            this.usuarioActual.dineroActual += cantidad;
            console.log(`Has depositado $${cantidad}. Tu saldo actual es $${this.usuarioActual.dineroActual}.`);
        }

        rls.question("\nPresiona Enter para continuar...");
    }

    retirarDinero() {
        console.clear();
        console.log("\x1b[34m=========================");
        console.log("Retirar Dinero");
        console.log("=========================\x1b[0m");
        this.mostrarCabecera();

        const cantidad = rls.questionFloat("Ingresa la cantidad a retirar: ");

        if (isNaN(cantidad) || cantidad <= 0) {
            console.log("Cantidad invalida. Debes ingresar un numero mayor a 0.");
        } else if (cantidad > this.usuarioActual.dineroActual) {
            console.log("No tienes suficientes dinero para retirar esa cantidad.");
        } else {
            this.usuarioActual.dineroActual -= cantidad;
            console.log(`Has retirado $${cantidad}. Tu saldo actual es $${this.usuarioActual.dineroActual}.`);
        }

        rls.question("\nPresiona Enter para continuar...");
    }

    menuJugar(juego: any) {
        this.mostrarCabecera();

        console.log("\x1b[34m=========================");
        juego.mostrarReglas();
        console.log("=========================\x1b[0m");

        rls.question("\nPresiona Enter para continuar...");

        this.ingresarApuesta(juego);
    }

    ingresarApuesta(juego: any) {
        this.mostrarCabecera();
        let cantidad: number;
        let continuar = true;
    
        while (continuar) {
            cantidad = rls.questionFloat("Ingresa la cantidad a apostar (0 para regresar al menu anterior): ");
            
            if (cantidad === 0) {
                console.log("Volviendo al menú de usuario...");
                continuar = false;  // Sale del ciclo y regresa al menú anterior
            } else {
                // Si la apuesta es válida, inicia la tirada
                if (juego.validarApuesta(this.usuarioActual, cantidad)) {
                    this.menuJuego(juego, cantidad);
                }
            }
        }
    }

    menuJuego(juego: any, cantidad: number) {
        let continuar = true;
    
        while (continuar) {
            console.clear();
            this.mostrarCabecera();
    
            // Submenú específico para tragamonedas
            if (juego instanceof Tragamoneda) {
                while (true) {
                    console.clear();
                    this.mostrarCabecera();
    
                    // Validar si tiene dinero suficiente para apostar
                    if (!juego.validarApuesta(this.usuarioActual, cantidad)) {
                        console.log("No tienes suficiente dinero para continuar.");
                        continuar = false;
                        break;
                    }
    
                    // Inicia la tirada
                    juego.iniciarTirada(this.usuarioActual, cantidad);
    
                    // Mensaje para continuar o volver
                    const input = rls.question("\x1b[33mPresiona Enter para hacer otra tirada o 0 para volver: \x1b[0m");
                    if (input === "0") {
                        continuar = false; // Salir del menú del juego
                        break;
                    } else if (input === "") {
                        // Si presiona Enter, se repite el bucle para otra tirada
                        continue;
                    } else {
                        console.log("Opción inválida. Intenta nuevamente.");
                    }
                }
            } else {
                // Flujo genérico para otros juegos
                while (true) {
                    console.clear();
                    this.mostrarCabecera();
    
                    // Validar si tiene dinero suficiente para apostar
                    if (!juego.validarApuesta(this.usuarioActual, cantidad)) {
                        console.log("No tienes suficiente dinero para continuar.");
                        continuar = false;
                        break;
                    }
    
                    // Inicia la tirada
                    juego.iniciarTirada(this.usuarioActual, cantidad);
    
                    // Mensaje para continuar o volver
                    const input = rls.question("\x1b[33mPresiona Enter para hacer otra tirada o 0 para volver: \x1b[0m");
                    if (input === "0") {
                        continuar = false; // Salir del menú del juego
                        break;
                    } else if (input === "") {
                        // Si presiona Enter, se repite el bucle para otra tirada
                        continue;
                    } else {
                        console.log("Opción inválida. Intenta nuevamente.");
                    }
                }
            }
        }
    }
    
}
