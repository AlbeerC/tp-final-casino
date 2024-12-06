import { Usuario } from "./Usuario";
import { Juego } from "./Juego";

export class Casino {
    private nombre: string;
    private id: number;
    private ubicacion: string;
    private juegos: Juego[] = [];
    private usuarios: Usuario[] = [];

    constructor(nombre: string, id: number, ubicacion: string) {
        this.nombre = nombre;
        this.id = id;
        this.ubicacion = ubicacion;
    }

    agregarUsuario(usuario: Usuario) {
        this.usuarios.push(usuario);
    }

    crearJuego(juego: Juego) {
        this.juegos.push(juego);
    }

    mostrarJuegos(): void {
        this.juegos.forEach((juego, index) => {
            console.log(`\x1b[32m${index + 1} - ${juego.getNombre()}`);
        });
    }

    // Getters
    getNombre(): string {
        return this.nombre;
    } 

    getUbicacion(): string {
        return this.ubicacion;
    }

    getId(): number {
        return this.id;
    }

    getJuegos(): Juego[] {
        return this.juegos
    }

    // Setters
    setNombre(nombre: string): void {
        this.nombre = nombre;
    }

    setUbicacion(ubicacion: string): void {
        this.ubicacion = ubicacion;
    }
}