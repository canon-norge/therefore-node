import { IGetCaseDocumentsResponse } from '../interfaces/get_case_documents_response';
import { TheCase } from '../models/the_case';
import { TheCaseDefinition } from '../models/the_case_definition';
import { WebApi } from '../services/web_api.service';
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
    console.log('Creating Case...');
    const data = await WebApi.prototype.post.call(this,'CreateCase', theCase)
    return data;
  }

  async updateCase(this: Therefore, theCase: TheCase): Promise<TheCase> {
    console.log('Updating Case...')
    const data = await WebApi.prototype.post.call(this,'SaveCaseIndexData', theCase)
    return data
  }

  async getCaseDefinition(this: Therefore, caseDefinitionNo: number): Promise<TheCase> {
    console.log('Getting CaseDefinition...')

    const body = {
      CaseDefinitionNo: caseDefinitionNo
    }

    const data = await WebApi.prototype.post.call(this,'GetCaseDefinition', body)
    return data
  }

  async deleteCase(this: Therefore, caseNo: number): Promise<void> {
    console.log('Deleting Case...')

    const body = {
      CaseNo: caseNo,
    };

    await WebApi.prototype.post.call(this,'DeleteCase', body)
    return
  }

  async getCase(this: Therefore, caseNo: number): Promise<TheCase> {
    console.log('Getting Case...')

    const body = {
      CaseNo: caseNo,
    };
    
    const data = await WebApi.prototype.post.call(this,'GetCase', body)
    return data
  }

  async getCaseDocuments(this: Therefore, CaseNo: number, CategoryNo?: number) : Promise<IGetCaseDocumentsResponse> {
    console.log('Getting Case Documents')

    const body = {
      CaseNo: CaseNo,
      CategoryNo: CategoryNo
    };

    const data = await WebApi.prototype.post.call(this,'GetCaseDocuments', body)
    return data;
  }
}

