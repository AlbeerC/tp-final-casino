import { Ruleta } from "./Ruleta";
import { Usuario } from "./Usuario";
import * as readlineSync from "readline-sync";

export class RuletaClasica extends Ruleta {
    private numeroGanador: number | null = null;
    private resultado: string = "";

    constructor(nombre: string, apuestaMinima: number, apuestaMaxima: number) {
        super(nombre, apuestaMinima, apuestaMaxima);
    }

    iniciarTirada(usuario: Usuario, apuesta: number): void {
        if (apuesta < this.apuestaMinima || apuesta > this.apuestaMaxima) {
            this.resultado = `La apuesta debe estar entre ${this.apuestaMinima} y ${this.apuestaMaxima}.`;
            return;
        }

        if (usuario.getDineroActual() < apuesta) {
            this.resultado = "No cuentas con suficiente dinero";
            return;
        }

        const numerosElegidos: number[] = [];

        while (true) {
            const numero = readlineSync.questionInt(`Elige un numero del 0 al ${this.numeros.length - 1} (o presiona -1 para terminar): `);

            if (numero === -1) break; // Salir del bucle si elige -1

            if (numero < 0 || numero > this.numeros.length) {
                console.log(`Número inválido. Debe estar entre 0 y ${this.numeros.length - 1}.`);
                continue;
            }

            if (!numerosElegidos.includes(numero)) {
                numerosElegidos.push(numero); // Agregar el número si no está en la lista
                console.log(`Número ${numero} añadido a tu jugada.`);
            } else {
                console.log(`El número ${numero} ya ha sido elegido.`);
            }
        }

        // Calcular la apuesta total
        const apuestaTotal: number = numerosElegidos.length * apuesta;

        if (numerosElegidos.length === 0) {
            this.resultado = "No elegiste ningún número. La jugada no se realizó.";
            return;
        }

        usuario.ajustarDinero(-apuestaTotal); // Descontar la apuesta total
        this.numeroGanador = Math.floor(Math.random() * this.numeros.length - 1); // Número aleatorio entre 0 y 36

        // Verificar si el número ganador está entre los números elegidos
        if (numerosElegidos.includes(this.numeroGanador)) {
            const ganancia = apuesta * this.numeros.length - 1;
            usuario.ajustarDinero(ganancia);
            this.resultado = `¡Felicidades! Uno de tus números (${this.numeroGanador}) fue el ganador. Has ganado ${ganancia} fichas.`;
        } else {
            this.resultado = `Has perdido tu apuesta. El número ganador fue ${this.numeroGanador}. Mejor suerte la próxima vez.`;
        }
    }

    mostrarResultado(): void {
        if (this.resultado) {
            console.log(this.resultado);
        } else {
            console.log("No hay resultado para mostrar aún");
        }
    }
}