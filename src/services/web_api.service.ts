import { Therefore } from '../therefore-node';

export class WebApi {
  async post(this: Therefore, endPoint: string, body?: any, rawBody?: any, headers?: any) {
    let request = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.authHeader,
      },
    }
    if(body){
      request = {...request, ...{body: JSON.stringify(body)}}
    }
    if(rawBody){
      request = {...request, ...{body: rawBody}}
    }
    if(this.tenant){
      request.headers = {...request.headers, ...{TenantName: this.tenant}}
    }
    if(this.client_type){
      request.headers = {...request.headers, ...{"The-Client-Type": this.client_type}}
    }
    if(headers) {
      request.headers = {...request.headers, ...headers}
    }
    console.log(request)
    const response = await fetch(this.url + this.apiVersion + endPoint, request);
    if (response.status === 500) {
      let body = await response.text();
      console.error(body);
      throw new Error(`POST ${endPoint} failed`);
    }
    return response.json()
  }
}
