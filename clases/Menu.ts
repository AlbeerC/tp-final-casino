import * as rls from "readline-sync";
import { Casino } from "./Casino";
import { Usuario } from "./Usuario";
import { TragamonedaClasico } from "./TragamonedaClasico";
import { TragamonedaMatriz } from "./TragamonedasMatriz";
import { RuletaClasica } from "./ruletaClasica";
import { RuletaPotenciada } from "./RuletaPotenciada";
 
export class Menu {
    private casino: Casino = new Casino("Casino ilegal", 24225, "Olavarria");
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

    mostrarMenu(): void {
        let opcion: number;

        // Menú principal
        do {
            console.clear();
            console.log("=========================");
            console.log(`Bienvenido al Casino ${this.casino.getNombre()}`);
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
    }

    registrarUsuario() {
        console.clear();
        console.log("=========================");
        console.log("Registro de Usuario");
        console.log("=========================");

        const nombre = rls.question("Ingresa tu nombre: ");
        const dineroInicial = parseFloat(rls.question("Ingresa tu dinero inicial: "));

        if (isNaN(dineroInicial) || dineroInicial <= 0) {
            console.log("Dinero inicial invalido. Debes ingresar un numero mayor a 0.");
            rls.question("Presiona Enter para regresar al menu principal...");
            return;
        }

        const nuevoUsuario = new Usuario(nombre, dineroInicial);
        this.casino.agregarUsuario(nuevoUsuario);
        this.usuarioActual = nuevoUsuario;

        console.log(`¡Bienvenido, ${nombre}! Tienes $${dineroInicial} para jugar.`);
        rls.question("Presiona Enter para continuar...");

        this.mostrarMenuUsuario()
    }

    // Menú gestión del usuario
    mostrarMenuUsuario(): void {
        let opcion: number;

        do {
            console.clear();
            console.log("=========================");
            console.log(`Usuario: ${this.usuarioActual.getNombre()} | Saldo: $${this.usuarioActual.dineroActual}`);
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
    }

    // Elegir un juego
    jugarJuego() {
        console.clear();
        console.log("=========================");
        console.log("Seleccionar Juego");
        console.log("=========================");

        this.casino.mostrarJuegos();

        const opcion = parseInt(rls.questionInt("Selecciona un juego por su numero o 0 para volver: "));

        if (isNaN(opcion) || opcion < 0 || opcion > this.casino.getJuegos().length) {
            console.log("Opcion invalida. Volviendo al menu...");
        } else if (opcion === 0) {
            console.log("Volviendo al menu de usuario...");
        } else {
            console.log(`Has seleccionado: ${this.casino.getJuegos()[opcion - 1].getNombre()}`);
            rls.question("Presiona Enter para continuar...");
            
            this.menuJugar(this.casino.getJuegos()[opcion - 1])
        }
    }

    depositarDinero() {
        console.clear();
        console.log("=========================");
        console.log("Depositar Dinero");
        console.log("=========================");
    
        const cantidad = parseFloat(rls.questionInt("Ingresa la cantidad a depositar: "));
    
        if (isNaN(cantidad) || cantidad <= 0) {
            console.log("Cantidad invalida. Debes ingresar un numero mayor a 0.");
        } else {
            this.usuarioActual.dineroActual += cantidad;
            console.log(`Has depositado $${cantidad}. Tu saldo actual es $${this.usuarioActual.dineroActual}.`);
        }
    
        rls.question("Presiona Enter para continuar...");
    }

    verDinero() {
        console.clear();
        console.log("=========================");
        console.log(`Tu saldo actual es: $${this.usuarioActual.dineroActual} .`);
        console.log("=========================");
        rls.question("Presiona Enter para continuar...");
    }

    retirarDinero() {
        console.clear();
        console.log("=========================");
        console.log("Retirar Dinero");
        console.log("=========================");

        const cantidad = parseFloat(rls.questionInt("Ingresa la cantidad a retirar: "));

        if (isNaN(cantidad) || cantidad <= 0) {
            console.log("Cantidad invalida. Debes ingresar un numero mayor a 0.");
        } else if (cantidad > this.usuarioActual.dineroActual) {
            console.log("No tienes suficientes dinero para retirar esa cantidad.");
        } else {
            this.usuarioActual.dineroActual -= cantidad;
            console.log(`Has retirado $${cantidad}. Tu saldo actual es ${this.usuarioActual.dineroActual}.`);
        }

        rls.question("Presiona Enter para continuar...");
    }

    menuJugar(juego: any) {
        let opcion: number;
        do {
            console.clear();
            console.log("=========================");
            console.log(`Juego: ${juego.getNombre()}`);
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
    }

    ingresarApuesta(juego: any) {
        let cantidad: number;
        let continuar = true;
    
        while (continuar) {
            console.clear();
            console.log("=========================");
            console.log(`Ingresar Apuesta - ${juego.getNombre()}`);
            console.log("=========================");
            
            // Usa questionFloat para permitir números decimales
            cantidad = rls.questionFloat("Ingresa la cantidad a apostar (0 para regresar al menu anterior): ");
            
            if (cantidad === 0) {
                console.log("Volviendo al menú de usuario...");
                continuar = false;  // Sale del ciclo y regresa al menú anterior
            } else {
                // Si la apuesta es válida, inicia la tirada
                if (juego.validarApuesta(this.usuarioActual, cantidad)) {
                    this.menuTragamonedas(juego, cantidad);
                }
                rls.question("Presiona Enter para continuar jugando o ingresa 0 para regresar al menú...");
            }
        }
    }

    menuTragamonedas(juego: any, cantidad: number) {
        let continuar = true;
    
        while (continuar) {
            console.clear();
            console.log("=========================");
            console.log(`${juego.getNombre()}`);
            console.log("=========================");

            // Validar la apuesta antes de iniciar la tirada
            if (!juego.validarApuesta(this.usuarioActual, cantidad)) {
                continuar = false;  // Sale del ciclo si no tiene dinero suficiente
                break;
            }
            
            console.log("Iniciando tirada...");
            juego.iniciarTirada(this.usuarioActual, cantidad);  // Inicia la tirada
    
            // Pregunta si desea continuar o volver al menú de apuestas
            console.log(`Dinero actual: $${this.usuarioActual.getDineroActual()}`)
            const opcion = rls.questionInt("Presiona 1 para hacer otra tirada o 0 para volver: ");
            if (opcion === 0) {
                console.log("Volviendo al menú de apuestas...");
                continuar = false;  // Salir del ciclo y regresar al menú de apuestas
            } else if (opcion !== 1) {
                console.log("Opción inválida. Regresando al menú de apuestas...");
                continuar = false;
            }
        }
    }
}
