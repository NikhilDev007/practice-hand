import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  /**
   * This function is used save the data in database.
   * @param createProductDto it contains list of data transfer objects
   * @returns it returns the list of data after storing in database.
   */
  async create(createProductDto: CreateProductDto): Promise<Product> {
    return this.productRepository.save(createProductDto);
  }

  /**
   * This function used to provide complete data id wise from database.
   * @returns it returns all the data in database.
   */
  async findAll() {
    return this.productRepository.find();
  }

  /**
   * This function is used to get data from DB id wise.
   * @param id index number which define the list of data.
   * @returns provides data of index.
   */
  async getTaskById(id: number): Promise<Product> {
    const found = await this.productRepository.findOneBy({ id });

    if (!found) {
      throw new NotFoundException(`"${id}" not valid`);
    }

    return found;
  }

  /**
   * This function used to update index id data in DB.
   * @param id index number which define the list of data.
   * @param updateProductDto it contains list of data transfer objects
   * @returns return updated data and update database.
   */
  async update(id: number, updateProductDto: UpdateProductDto): Promise<any> {
    const details = await this.getTaskById(id);

    let updatedDto;
    if (details) {
      updatedDto = this.productRepository.save(updateProductDto);
    }
    return updatedDto;
  }

  /**
   * This function is used to delete data from database.
   * @param id index number which define the list of data.
   * @returns retrun the delete messege after removing data from DB.
   */
  async remove(id: number): Promise<string> {
    const remove = await this.getTaskById(id);

    if (!remove) {
      throw new NotFoundException(`This id "${id}' is not valid`);
    }

    await this.productRepository.delete(id);
    return `Removed a #${id} product data`;
  }
}
