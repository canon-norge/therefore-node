import { ICategoryInfo } from '../interfaces/category_info';
import { TheDocument } from '../models/the_document';
import { Therefore } from '../therefore-node';

require('isomorphic-fetch');

export class DocumentOperations {
  client: Therefore;
  constructor(client: Therefore) {
    this.client = client;
  }
  
  async createDocument(document: TheDocument) {
    console.log(`Creating Document...`);

    const body = document;
    const request = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.client.authHeader,
      },
      body: JSON.stringify(body),
    };

    const response = await fetch(this.client.url + this.client.apiVersion + 'CreateDocument', request);
    const data: ICategoryInfo = (await response.json()) as any;
    return data;
  }
}
