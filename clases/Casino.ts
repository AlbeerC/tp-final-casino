import { Usuario } from "./Usuario";
import { Juego } from "./Juego";

export class Casino {
    private nombre: string;
    private id: number;
    private ubicacion: string;
    private juegos: Juego[];
    private usuarios: Usuario[];

    constructor(nombre: string, id: number, ubicacion: string) {
        this.nombre = nombre;
        this.id = id;
        this.ubicacion = ubicacion;
    }

    agregarUsuario(nombre: string, dineroInicial: number) {
        const nuevoUsuario = new Usuario(nombre, dineroInicial);
        this.usuarios.push(nuevoUsuario);
    }

    crearJuego(juego: Juego) {
        this.juegos.push(juego);
    }

    mostrarJuegos(): void {
        this.juegos.forEach((juego, index) => {
            console.log(`${index + 1} - ${juego.getNombre()}`);
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

    // Setters
    setNombre(nombre: string): void {
        this.nombre = nombre;
    }

    setUbicacion(ubicacion: string): void {
        this.ubicacion = ubicacion;
    }
}