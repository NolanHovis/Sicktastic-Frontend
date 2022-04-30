import { Blog } from 'src/app/models/blog.model';
import { Token } from './token.model';

export class User {
  constructor(
    public email: string,
    public first_name: string,
    public last_name: string,
    public blogs: Blog[],
    public id: number,
    private _token: Token
  ) {}

  get token() {
    if (!this._token.value || new Date() > this._token.expiry) {
      return null;
    }
    return this._token.value;
  }
}
