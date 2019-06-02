import { Injectable, Optional } from "@nestjs/common";

@Injectable()
export class UhfMailRegConfig {
  mail: string = process.env.UHF_MAIL_REG_MAIL;
  name: string = process.env.UHF_MAIL_REG_NAME;
  host: string = process.env.UHF_MAIL_REG_HOST;
  port: number = parseInt(process.env.UHF_MAIL_REG_PORT, 10);
  secure = true; // use SSL
  tls = {
    rejectUnauthorized: false
  };
  auth = {
      user: process.env.UHF_MAIL_REG_AUTH_USER,
      pass: process.env.UHF_MAIL_REG_AUTH_PASS
  };
  constructor(@Optional() options: Partial<UhfMailRegConfig> = {}) {
    Object.assign(this, options);
    Object.keys(this).forEach(key => {
      if (this[key] === undefined || this[key] === NaN) {
        console.error('ERROR:', this.constructor.name + ' requires ' + key + ' config property to be defined');
      }
    })
  }
}
