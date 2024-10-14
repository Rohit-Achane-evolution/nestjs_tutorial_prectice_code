export class CreateCatDto {
    name: string;
    description: string;
    actions: string;
  }
  
export class UpdateCatDto {
  name?: string;
  description?: string;
  actions?: string;
  }
export class ListAllEntities {
    name: string;
    description: string;
    actions: string;
    limit: any;
  }
