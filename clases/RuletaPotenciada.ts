import * as readlineSync from "readline-sync";

import { Ruleta } from "./Ruleta";
import { Usuario } from "./Usuario";

export class RuletaPotenciada extends Ruleta {
    private numerosPotenciados: number[] = [];
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

        this.generarNumerosPotenciados();

        const numerosElegidos: number[] = [];

        while (true) {
            const numero = readlineSync.questionInt(`Elige un numero del 0 al ${this.numeros.length - 1} (o presiona -1 para terminar): `);

            if (numero === -1) break;

            if (numero < 0 || numero > this.numeros.length) {
                console.log(`Número inválido. Debe estar entre 0 y ${this.numeros.length - 1}.`);
                continue;
            }

            if (!numerosElegidos.includes(numero)) {
                numerosElegidos.push(numero);
                console.log(`Número ${numero} añadido a tu jugada.`);
            } else {
                console.log(`El número ${numero} ya ha sido elegido.`);
            }
        }

        const apuestaTotal: number = numerosElegidos.length * apuesta;

        if (numerosElegidos.length === 0) {
            this.resultado = "No elegiste ningún número. La jugada no se realizó.";
            return;
        }

        usuario.ajustarDinero(-apuestaTotal);
        this.numeroGanador = Math.floor(Math.random() * this.numeros.length - 1);

        if (numerosElegidos.includes(this.numeroGanador)) {
            let ganancia: number = 0;
            if (this.numerosPotenciados.includes(this.numeroGanador)) {
                ganancia = apuesta * (this.numeros.length - 1) * 5;
                this.resultado = `¡Felicidades! Uno de tus números (${this.numeroGanador}) estaba potenciado y fue el ganador. Has ganado ${ganancia} fichas.`;
            } else {
                ganancia = ganancia = apuesta * this.numeros.length - 1;
                this.resultado = `¡Felicidades! Uno de tus números (${this.numeroGanador}) fue el ganador. Has ganado ${ganancia} fichas.`;
            }
            usuario.ajustarDinero(ganancia);
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
    
    generarNumerosPotenciados(): void {
        for (let i: number = 0; i < 5; i++) {
            const numeroAleatorio: number = Math.floor(Math.random() * this.numeros.length);
            if (!this.numerosPotenciados.includes(numeroAleatorio)) {
                this.numerosPotenciados.push(numeroAleatorio);
            }
        }
    }
}