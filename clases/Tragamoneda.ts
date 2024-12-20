import { Juego } from "./Juego";
import { Usuario } from "./Usuario";

export abstract class Tragamoneda extends Juego {
    protected simbolos: string[] = [];

    constructor(nombre:string, apuestaMinima:number, apuestaMaxima:number){
        super(nombre, apuestaMinima, apuestaMaxima)
    }

    abstract iniciarTirada(usuario: Usuario, apuesta: number): void;
    abstract mostrarResultado(): void;
    abstract calcularGanancia(usuario: Usuario, apuesta: number):void;
}