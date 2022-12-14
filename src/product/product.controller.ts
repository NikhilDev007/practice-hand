import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  /**
   * This function is used saev the data in database.
   * @param createProductDto it contains list of data transfer objects
   * @returns it returns the list of data after storing in database.
   */
  @Post()
  async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return await this.productService.create(createProductDto);
  }

  /**
   * This function used to provide complete data id wise from database.
   * @returns it returns all the data in database.
   */
  @Get()
  findAll() {
    return this.productService.findAll();
  }

  /**
   * This function is used to get data from DB id wise.
   * @param id index number which define the list of data.
   * @returns provides data of index.
   */
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<any> {
    return this.productService.getTaskById(id);
  }

  /**
   * This function used to update index id data in DB.
   * @param id index number which define the list of data.
   * @param updateProductDto it contains list of data transfer objects
   * @returns return updated data and update database.
   */
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  /**
   * This function is used to delete data from database.
   * @param id index number which define the list of data.
   * @returns retrun the delete messege after removing data from DB.
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
