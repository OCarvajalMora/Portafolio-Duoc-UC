import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {CategoriaProducto} from "../entity/CategoriaProducto";

export class ProductCategoryController {

  private repository = getRepository(CategoriaProducto);

  async all(request: Request, response: Response, next: NextFunction){
    const result = [];
    const fetched =  await this.repository
      .createQueryBuilder('c')
      .leftJoin('producto', 'p', 'p.categoriaProductoId = c.id')
      .addSelect('COUNT(p.id)', 'productos')
      .where('c.activo = 1')
      .groupBy('c.id')
      .orderBy('c.id', 'DESC')
      .getRawMany();

    fetched.forEach(element => {
      let obj = {
        id: element.c_id,
        categoria: element.c_categoria,
        productos: element.productos
      }
      result.push(obj);
    });

    //return response.status(200).send(fetched);

    response.status(200).send(result);
  }

  async save(request: Request, response: Response, next: NextFunction){
    this.repository.findOne({where: {categoria: request.body.categoria, activo: 1}}).then(async (productCategory) => {
      if(productCategory){
        return response.status(409).end();
      }
      this.repository.save(request.body).then(() => {
        return response.status(200).end();
      });
    }).catch(() => {
      return response.status(500).end();
    });
  }

  async update(request: Request, response: Response, next: NextFunction){
    this.repository.findOne(request.params.id, {where: {activo: 1}}).then(async (productCategory) => {

      productCategory.categoria = request.body.categoria;

      this.repository.save(productCategory).then(() => {
        return response.status(200).end();
      });
    }).catch(() => {
      return response.status(500).end();
    });
  }

  async delete(request: Request, response: Response, next: NextFunction){
    this.repository.findOneOrFail(request.params.id, {where: {activo: 1}}).then(async (productCategorie) => {
      productCategorie.activo = 0;
      await this.repository.save(productCategorie);
      return response.status(200).end();
    }).catch(() => {
      return response.status(500).end();
    });
  }

  async one(request: Request, response: Response, next: NextFunction){
    this.repository.findOne(request.param('id'), {where: {activo: 1}}).then(result => {
      if(!result){
        return response.status(404).end();
      }
      return response.status(200).json(result);
    }).catch(() => {
      return response.status(500).end();
    });
  }

}
