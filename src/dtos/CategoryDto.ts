class CategoryDto {
  public id: number;
  public name: string;
  constructor(model) {
    this.id = model.id;
    this.name = model.name;
  }
}

export default CategoryDto;
