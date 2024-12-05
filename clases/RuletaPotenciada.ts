import * as readlineSync from "readline-sync";

import { Ruleta } from "./Ruleta";
import { Usuario } from "./Usuario";
import { Reglas } from "../interfaces/Reglas";

export class RuletaPotenciada extends Ruleta implements Reglas {
    private numerosPotenciados: number[] = [];
    
    constructor(nombre: string, apuestaMinima: number, apuestaMaxima: number) {
        super(nombre, apuestaMinima, apuestaMaxima);
    }

    mostrarReglas(): void {
        console.log(`🎡⚡ ${this.nombre}:
            -La apuesta debe estar entre ${this.apuestaMinima} y ${this.apuestaMaxima}
            -Podés apostar los números que quieras entre 0 y ${this.numeros.length - 1}
            -En cada ronda, se potencian 5 números.
            -Si apostaste al número ganador, ganarás lo apostado a ese número multiplicado por ${this.numeros.length - 5}
            -Si apostaste al número ganador y además está potenciado, ganarás lo apostado a ese número multiplicado por ${(this.numeros.length - 5) * 5}
            `);
    }

    iniciarTirada(usuario: Usuario, apuesta: number): void {

        this.validarApuesta(usuario, apuesta);
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
            this.mensajeResultado = "No elegiste ningún número. La jugada no se realizó.";
            return;
        }

        usuario.ajustarDinero(-apuestaTotal);
        this.numeroGanador = Math.floor(Math.random() * this.numeros.length);

        if (numerosElegidos.includes(this.numeroGanador)) {
            let ganancia: number = 0;
            if (this.numerosPotenciados.includes(this.numeroGanador)) {
                ganancia = apuesta * (this.numeros.length - 5) * 5;
                this.mensajeResultado = `¡Felicidades! Uno de tus números (${this.numeroGanador}) estaba potenciado y fue el ganador. Has ganado ${ganancia} fichas.`;
            } else {
                ganancia = apuesta * this.numeros.length - 5;
                this.mensajeResultado = `¡Felicidades! Uno de tus números (${this.numeroGanador}) fue el ganador. Has ganado ${ganancia} fichas.`;
            }
            usuario.ajustarDinero(ganancia);
        } else {
            this.mensajeResultado = `Has perdido tu apuesta. El número ganador fue ${this.numeroGanador}. Mejor suerte la próxima vez.`;
        }

        this.mostrarResultado();
    }

    mostrarResultado(): void {
        if (this.mensajeResultado) {
            console.log(this.mensajeResultado);
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