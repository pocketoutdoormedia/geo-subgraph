import { BaseError } from '../../utils';

export class AddExampleDbError extends BaseError {
  constructor() {
    super();
    this.message = 'Unable to save example';
  }
}

export class GetExampleDbError extends BaseError {
  constructor(id: number) {
    super();
    this.message = `Unable to find example with id: ${id}`;
  }
}

export type Example = {
  id: number;
};
