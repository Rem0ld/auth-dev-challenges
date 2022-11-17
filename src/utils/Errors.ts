export class MissingDataPayloadException extends Error {
  constructor(missing?: string, data: any = {}) {
    super();
    this.message = `missing data in payload, ${missing.length ? missing : ""}
    data received: ${JSON.stringify(data)}`;
  }
}

export class ResourceNotExist extends Error {
  constructor(identifier: string) {
    super();
    this.message = `Resource ${identifier} does not exist`;
  }
}
