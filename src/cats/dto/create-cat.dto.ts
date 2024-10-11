export class CreateCatDto {
    name: string;
    description: number;
    actions: string;
  }
  
export class UpdateCatDto {
  name?: string;
  description?: number;
  actions?: string;
  }
export class ListAllEntities {
    name: string;
    description: number;
    actions: string;
    limit: any;
  }
