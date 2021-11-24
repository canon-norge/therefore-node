import { TheCase } from '../models/the_case';
import { TheCaseDefinition } from '../models/the_case_definition';
import { Therefore } from '../therefore-node';

export class CaseOperations {
  async closeCase(this: Therefore, caseNo: number): Promise<void> {
    const body = {
      CaseNo: caseNo,
    };

    const request = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.authHeader,
      },
      body: JSON.stringify(body),
    };

    if (this.tenant != null) {
      request.headers = { ...request.headers, ...{ TenantName: this.tenant } };
    }
    const response = await fetch(this.url + this.apiVersion + 'CloseCase', request);
    if (response.status === 500) {
      let body = await response.text();
      console.error(body);
      throw new Error('Getting Categories tree failed');
    }
    return;
  }

  async createCase(this: Therefore, theCase: TheCase): Promise<TheCase> {
    const request = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.authHeader,
      },
      body: JSON.stringify(theCase),
    };

    if (this.tenant != null) {
      request.headers = { ...request.headers, ...{ TenantName: this.tenant } };
    }

    const response = await fetch(this.url + this.apiVersion + 'CreateCase', request);
    if (response.status === 500) {
      let body = await response.text();
      console.error(body);
      throw new Error('Creating new case failed');
    }
    const data: TheCase = (await response.json()) as TheCase;
    return data;
  }

  async updateCase(this: Therefore, theCase: TheCase) : Promise<TheCase> {
    const request = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.authHeader,
      },
      body: JSON.stringify(theCase),
    };
    if (this.tenant != null) {
      request.headers = { ...request.headers, ...{ TenantName: this.tenant } };
    }

    const response = await fetch(this.url + this.apiVersion + 'CreateCase', request);
    return response.json() as unknown as TheCase
  }

  async getCaseDefinition(this: Therefore, caseDefinitionNo: number) : Promise<TheCase> {
    const request = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.authHeader,
      },
      body: JSON.stringify({"CaseDefinitionNo": caseDefinitionNo }) ,
    };
    if (this.tenant != null) {
      request.headers = { ...request.headers, ...{ TenantName: this.tenant } };
    }

    const response = await fetch(this.url + this.apiVersion + 'GetCaseDefinition', request);
    return response.json() as unknown as TheCase
  }
}

// async deleteCase(caseNo: number): Promise<void> {
//   const body = {
//       CaseNo: caseNo,
//     };
//     const request = {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: this.client.authHeader,
//       },
//       body: JSON.stringify(body),
//     };
//     const response = await fetch(this.client.url + this.client.apiVersion + 'DeleteCase', request);
//     if (response.status === 500) {
//       let body = await response.text();
//       console.error(body);
//       throw new Error('Getting Categories tree failed');
//     }
//     return;
// }

// async getCase(caseNo: number): Promise<TheCase> {
//   const body = {
//       CaseNo: caseNo,
//     };
//     const request = {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: this.client.authHeader,
//       },
//       body: JSON.stringify(body),
//     };
//     const response = await fetch(this.client.url + this.client.apiVersion + 'GetCase', request);
//     if (response.status === 500) {
//       let body = await response.text();
//       console.error(body);
//       throw new Error('Getting Categories tree failed');
//     }
//     const data: TheCase = (await response.json()) as TheCase;
//     return data;
// }

// async getCaseDefinition(caseDeifinitionNo: number, isAccessMaskNeeded: boolean | undefined, isSearchFieldOrderNeeded?: boolean): Promise<TheCaseDefinition>{
//   const body = {
//       CaseDefinitionNo: caseDeifinitionNo,
//       IsAccessMaskNeeded: isAccessMaskNeeded,
//       IsSearchFieldOrderNeeded: isSearchFieldOrderNeeded,
//     };
//     const request = {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: this.client.authHeader,
//       },
//       body: JSON.stringify(body),
//     };
//     const response = await fetch(this.client.url + this.client.apiVersion + 'GetCaseDefinition', request);
//     if (response.status === 500) {
//       let body = await response.text();
//       console.error(body);
//       throw new Error('Getting Categories tree failed');
//     }
//     const data: TheCaseDefinition = (await response.json()) as TheCaseDefinition;
//     return data;
