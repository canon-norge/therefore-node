import { TheCase } from '../models/the_case';
import { TheCaseDefinition } from '../models/the_case_definition';
import { Therefore } from '../therefore-node';

export class CaseOperations {
  client: Therefore;
  constructor(client: Therefore) {
    this.client = client;
  }

  async closeCase(caseNo: number): Promise<void> {
    const body = {
      CaseNo: caseNo,
    };
    const request = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.client.authHeader,
      },
      body: JSON.stringify(body),
    };
    const response = await fetch(this.client.url + this.client.apiVersion + 'CloseCase', request);
    if (response.status === 500) {
      let body = await response.text();
      console.error(body);
      throw new Error('Getting Categories tree failed');
    }
    return;
  }

  async createCase(theCase: TheCase): Promise<TheCase> {
    const body = theCase;
      const request = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: this.client.authHeader,
        },
        body: JSON.stringify(body),
      };
      const response = await fetch(this.client.url + this.client.apiVersion + 'CreateCase', request);
      if (response.status === 500) {
        let body = await response.text();
        console.error(body);
        throw new Error('Getting Categories tree failed');
      }
      const data: TheCase = (await response.json()) as TheCase;
      return data;
  }

  async deleteCase(caseNo: number): Promise<void> {
    const body = {
        CaseNo: caseNo,
      };
      const request = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: this.client.authHeader,
        },
        body: JSON.stringify(body),
      };
      const response = await fetch(this.client.url + this.client.apiVersion + 'DeleteCase', request);
      if (response.status === 500) {
        let body = await response.text();
        console.error(body);
        throw new Error('Getting Categories tree failed');
      }
      return;
  }

  async getCase(caseNo: number): Promise<TheCase> {
    const body = {
        CaseNo: caseNo,
      };
      const request = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: this.client.authHeader,
        },
        body: JSON.stringify(body),
      };
      const response = await fetch(this.client.url + this.client.apiVersion + 'GetCase', request);
      if (response.status === 500) {
        let body = await response.text();
        console.error(body);
        throw new Error('Getting Categories tree failed');
      }
      const data: TheCase = (await response.json()) as TheCase;
      return data;
  }

  async getCaseDefinition(caseDeifinitionNo: number, isAccessMaskNeeded: boolean | undefined, isSearchFieldOrderNeeded?: boolean): Promise<TheCaseDefinition>{
    const body = {
        CaseDefinitionNo: caseDeifinitionNo,
        IsAccessMaskNeeded: isAccessMaskNeeded,
        IsSearchFieldOrderNeeded: isSearchFieldOrderNeeded,
      };
      const request = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: this.client.authHeader,
        },
        body: JSON.stringify(body),
      };
      const response = await fetch(this.client.url + this.client.apiVersion + 'GetCaseDefinition', request);
      if (response.status === 500) {
        let body = await response.text();
        console.error(body);
        throw new Error('Getting Categories tree failed');
      }
      const data: TheCaseDefinition = (await response.json()) as TheCaseDefinition;
      return data;
  }
}
