import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany} from "typeorm";
import { CategoriaProducto } from "./CategoriaProducto";
import { Usuario } from "./Usuario";
import { DetalleOrdenDeCompra } from "./DetalleOrdenDeCompra";
import { DetalleProducto } from "./DetalleProducto";

@Entity()
export class Producto {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
      length: 15
    })
    codigoDeBarra: string;

    @Column()
    descripcion: string;

    @Column()
    precioNeto: number;

    @Column()
    stockCritico: number;

    @Column()
    tieneVencimiento: boolean;

    @OneToMany(type => DetalleOrdenDeCompra, detalleOrdenDeCompra => detalleOrdenDeCompra.producto)
    detalleOrdenDeCompra: DetalleOrdenDeCompra[]

    @OneToMany(type => DetalleProducto, detalleProducto => detalleProducto.producto)
    detalleProducto: DetalleProducto[];

    @ManyToOne(type => Usuario, Usuario => Usuario.id)
    proveedor: Usuario;

    @ManyToOne(type => CategoriaProducto, CategoriaProducto => CategoriaProducto.id)
    categoriaProducto: CategoriaProducto;

    @Column({
      default: 1
    })
    activo: number;


}
