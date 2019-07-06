/*
 * authentication actions
 */
import { ForbiddenError, NotFoundError, ValidationError } from '@slackmap/api/core';
import { texts } from "./uhf-emails";
import { now, OrientService } from "@slackmap/api/orient";
// import * as _ from 'lodash';
const _ = require('lodash');
import { Controller, Get, Query, Post, Body, Request, UseGuards } from '@nestjs/common';
import { UhfMailRegConfig } from './uhf-mail-reg-config';
import { User } from './user-decorator';
import { UhfGuard } from './uhf.guard';
import * as FB from 'fb';
import { JwtService } from './jwt.service';

const nodemailer = require('nodemailer');
const striptags = require('striptags');
const randomstring = require('randomstring');

export interface StatsResponse {
  total?: number
}
export class AuthConnectFacebookRequestDto {
  access_token: string;
  signed_request?: string;
}

export interface RegisterResponse {
}

export interface FacebookProfileEntity {
  id?: string;
  email?: string;
  name?: string;
  first_name?: string;
  last_name?: string;
}

@Controller("uhf")
export class UhfController {

  constructor(
    private db: OrientService,
    private mailConfig: UhfMailRegConfig,
    private jwt: JwtService
  ) { }
  selectQuery = [
    'name',
    'rid',
    'email',
    'facebook_id',
    'type',
    'subtype',
    'lastname',
    'firstname',
    'location_path',
    'imperial',
    'has_uhf',
    'created_at',
    '@rid as id',
    '@version as _version'
  ];

  /**
   * get your data by hash
   */
  @Get('register')
  public async edit(@Query('hash') hash: string): Promise<RegisterResponse> {
    console.log('Actquire')
    const db = await this.db.acquire();
    console.log('Actquire after')
    const event_rid = 'e0uhf2019'
    if (!hash) {
      await db.close();
      return {
        error: 'no hash provided'
      }
    }

    const data = await db.query('SELECT * FROM EventRegistration WHERE hash=:hash AND event_rid=:event_rid', {
      params: {
        hash,
        event_rid
      }
    }).one();
    await db.close();
    console.log('get record after')


    if (!data) {
      return {
        error: 'hash do not exists'
      }
    }

    return {
      data
    }
  }

  /**
   * register for uhf
   *
   */
  @Post('register')
  public async register(@Body() body: any): Promise<RegisterResponse> {
    const db = await this.db.acquire();
    const email = body.email;
    const event_rid = 'e0uhf2019';

    if (!email) {
      await db.close();
      throw new Error('no email provided')
    }

    let record: any = await db.query('SELECT * FROM EventRegistration WHERE email=:email AND event_rid=:event_rid', {
      params: {
        email,
        event_rid
      }
    }).one();

    if (record) {
      // send edit link
      const subject = tr('EDIT_EMAIL_SUBJECT', record);
      const html = tr('EDIT_EMAIL_HTML', record);

      this.sendEmail(record.email, subject, html);
      await db.close();
      return {
        message: tr('EDIT_EMAIL_SUCCESS', record)
      };
    } else {
      // new registration
      const item: any = {
        email: body.email,
        language: body.language,
        guest: body.guest,
        volunteer: body.volunteer,
        agree_mails: body.agree_mails,
        agree_privacy: body.agree_privacy,
      };
      item.event_rid = event_rid;
      item.created_at = now();

      item.rid = 'e1' + randomstring.generate(11);
      item.hash = randomstring.generate(20);

      record = await db.command('INSERT INTO EventRegistration CONTENT :item', {
        params: { item: item }
      }).one();
      const subject = tr('REGISTER_EMAIL_SUBJECT', record);
      const html = tr('REGISTER_EMAIL_HTML', record);
      this.sendEmail(item.email, subject, html);
      await db.close();
      return {
        message: tr('REGISTER_EMAIL_SUCCESS', record)
      };
    }
  }
  /**
   * register for uhf
   *
   */
  @Post('register-zjednoczony')
  public async registerZjednoczony(@Body() body: any): Promise<RegisterResponse> {
    const db = await this.db.acquire();
    const email = body.email;
    const event_rid = 'e0uhf2019';

    if (!email) {
      await db.close();
      throw new Error('no email provided')
    }

    let record: any = await db.query('SELECT * FROM EventRegistration WHERE email=:email AND event_rid=:event_rid', {
      params: {
        email,
        event_rid
      }
    }).one();

    if (record) {
      // send edit link
      const subject = tr('EDIT_EMAIL_SUBJECT', record);
      const html = tr('EDIT_EMAIL_HTML', record);

      this.sendEmail(record.email, subject, html);
      await db.close();
      return {
        message: tr('EDIT_EMAIL_SUCCESS', record)
      };
    } else {
      // new registration
      const item: any = {
        zjednoczony: true,
        email: body.email,
        // gender: body.gender,
        // firstname: body.firstname,
        // lastname: body.lastname,
        language: body.language,
        ticket_type: 'cmap',
        guest: body.guest,
        volunteer: body.volunteer,
        agree_mails: body.agree_mails,
        agree_privacy: body.agree_privacy,
      };
      item.event_rid = event_rid;
      item.created_at = now();

      item.rid = 'e1' + randomstring.generate(11);
      item.hash = randomstring.generate(20);
      record = await db.command('INSERT INTO EventRegistration CONTENT :item', {
        params: { item: item }
      }).one();
      const subject = tr('REGISTER_EMAIL_SUBJECT', record);
      const html = tr('REGISTER_EMAIL_HTML', record);
      this.sendEmail(item.email, subject, html);
      await db.close();
      return {
        message: tr('REGISTER_EMAIL_SUCCESS', record)
      };
    }
  }

  /**
   * update registration
   */
  @Post('update')
  public async update(@Body() item: any): Promise<RegisterResponse> {
    const db = await this.db.acquire();
    const rid = item['rid'];
    const hash = item['hash'];
    const event_rid = 'e0uhf2019';


    const record: any = await db.query('SELECT * FROM EventRegistration WHERE hash=:hash AND event_rid=:event_rid AND rid=:rid', {
      params: {
        hash,
        event_rid,
        rid
      }
    }).one();

    if (!record) {
      await db.close();
      return {
        error: 'hash not valid'
      }
    }
    const sendPayment = !item.payment_id;

    if (sendPayment) {

      item.payment_id = record['@rid'].position - 547;
    }

    // delete item.tshirt_gender;
    // delete item.tshirt_type;
    // delete item.tshirt_size;

    delete item.rid;

    delete item.email;
    delete item.event_rid;
    delete item.hash;
    delete item.payment_email;
    delete item.payment_email_error;
    delete item['@class'];
    delete item['@type'];
    delete item['@rid'];
    delete item['@version'];

    const json = JSON.stringify(item);

    const data: any = await db.command(`UPDATE EventRegistration MERGE ${json} RETURN AFTER WHERE hash = :hash AND rid=:rid`, {
      params: {
        hash: hash,
        rid: rid,
        data: item
      }
    }).one();

    await db.close();

    if (sendPayment) {
      const subject = tr('PAYMENT_INFO_EMAIL_SUBJECT', data);
      const html = tr('PAYMENT_INFO_EMAIL_HTML', data);
      this.sendEmail(data.email, subject, html, 'payment_email', data['@rid']);
    }

    return {
      data
    };
  }

  /**
   * update registration
   */
  @Post('delete')
  public async delete(@Body() item: any): Promise<RegisterResponse> {
    const db = await this.db.acquire();
    const rid = item['rid'];
    const hash = item['hash'];
    const event_rid = 'e0uhf2019';

    const record: any = await db.query('SELECT * FROM EventRegistration WHERE hash=:hash AND event_rid=:event_rid AND rid=:rid', {
      params: {
        hash,
        event_rid,
        rid
      }
    }).one();

    if (!record) {
      await db.close();
      return {
        error: 'hash not valid'
      }
    }

    const data = await db.command('DELETE FROM :rid', {
      params: {
        rid: record['@rid']
      }
    }).one();
    await db.close();


    const subject = tr('DELETE_EMAIL_TITLE', item);
    const html = tr('DELETE_EMAIL_SUCCESS', item);

    this.sendEmail(item.email, subject, html);

    return {
      message: tr('DELETE_EMAIL_SUCCESS', item)
    };
  }

  sendEmail(email, subject, html, logProperty?, logRid?) {

    const text = striptags(html);

    const conf = this.mailConfig;
    const transporter = nodemailer.createTransport(conf);
    const mailOptions = {
      from: `"${conf.name}" <${conf.mail}>`, // sender address
      to: email,          // list of receivers
      subject: subject,   // Subject line
      text: text,         // plaintext body
      html: html          // html body
    };

    return new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          reject(err)

          // this.db.query(`UPDATE :item set  ${logProperty}_error=:err`, {
          //     params: {
          //         item: logRid,
          //         err: now() + ': ' + err.toString()
          //     }
          // }).catch();

          return;
        }

        // this.db.query(`UPDATE :item set ${logProperty}=:date`, {
        //     params: {
        //         item: logRid,
        //         date: now()
        //     }
        // }).catch();

        resolve(info)
      });
    })
  }

  @Get('stats')
  public async stats(@Query('pass') pass: string): Promise<any> {
    if (pass !== process.env.PASS) {
      return { status: 'forbidden' }
    }
    const db = await this.db.acquire();
    const event_rid = 'e0uhf2019';
    const total: number = await db.query<any>('select count(1) as count from EventRegistration WHERE event_rid=:event_rid', {
      params: { event_rid: event_rid }
    }).all().then<number>(i => i[0].count);

    const not_finished: number = await db.query<any>('select count(1) as count from EventRegistration WHERE event_rid=:event_rid AND payment_id IS NULL', {
      params: { event_rid: event_rid }
    }).all().then<number>(i => i[0].count);

    const payment_online: number = await db.query<any>('select count(1) as count from EventRegistration WHERE event_rid=:event_rid AND payment_online IS NOT NULL', {
      params: { event_rid: event_rid }
    }).all().then<number>(i => i[0].count);

    const payment_onsite: number = await db.query<any>('select count(1) as count from EventRegistration WHERE event_rid=:event_rid AND payment_onsite IS NOT NULL', {
      params: { event_rid: event_rid }
    }).all().then<number>(i => i[0].count);

    const payment_onsite_permit: number = await db.query<any>('select count(1) as count from EventRegistration WHERE event_rid=:event_rid AND payment_onsite_permit IS NOT NULL', {
      params: { event_rid: event_rid }
    }).all().then<number>(i => i[0].count);

    const pl: number = await db.query<any>('select count(1) as count from EventRegistration WHERE event_rid=:event_rid AND country = "PL" ', {
      params: { event_rid: event_rid }
    }).all().then<number>(i => i[0].count);

    const not_pl: number = await db.query<any>('select count(1) as count from EventRegistration WHERE event_rid=:event_rid AND country <> "PL" ', {
      params: { event_rid: event_rid }
    }).all().then<number>(i => i[0].count);

    const countries: any = await db.query<any>('select count(1) as count, country from EventRegistration WHERE event_rid=:event_rid GROUP BY country', {
      params: { event_rid: event_rid }
    }).all().then<any>(items => {
      const res: any = {};
      for (const item of items) {
        res[item.country] = item.count;
      }
      return res;
    });
    const genders: any = await db.query<any>('select count(1) as count, gender from EventRegistration WHERE event_rid=:event_rid GROUP BY gender', {
      params: { event_rid: event_rid }
    }).all().then<any>(items => {
      const res: any = {};
      for (const item of items) {
        res[item.gender] = item.count;
      }
      return res;
    });
    const tshirts: any = {
      m: {},
      f: {},
      m_count: 0,
      f_count: 0
    }
    await db.query<any>(`select count(1) as count, tshirt_type from EventRegistration WHERE event_rid=:event_rid AND tshirt_gender='m' GROUP BY tshirt_type`, {
      params: { event_rid: event_rid }
    }).all().then<any>(items => {
      for (const item of items) {
        tshirts.m[item.tshirt_type] = item.count;
        tshirts.m_count = tshirts.m_count + item.count;
      }
    });
    await db.query<any>(`select count(1) as count, tshirt_type from EventRegistration WHERE event_rid=:event_rid AND tshirt_gender='f' GROUP BY tshirt_type`, {
      params: { event_rid: event_rid }
    }).all().then<any>(items => {
      for (const item of items) {
        tshirts.f[item.tshirt_type] = item.count;
        tshirts.f_count = tshirts.f_count + item.count;
      }
    });

    const int: any = function (val: any) {
      return parseInt(val) || 0;
    };

    const tshirt_limits = {
      m: {
        s: 10,
        m: 105,
        l: 85,
        xl: 10,
        xxl: 5
      },
      f: {
        xs: 25,
        s: 60,
        m: 20,
        l: 5
      }
    }

    const tshirt_available = {
      m: {
        s: tshirt_limits.m.s - int(_.get(tshirts, 'm.s')),
        m: tshirt_limits.m.m - int(_.get(tshirts, 'm.m')),
        l: tshirt_limits.m.l - int(_.get(tshirts, 'm.l')),
        xl: tshirt_limits.m.xl - int(_.get(tshirts, 'm.xl')),
        xxl: tshirt_limits.m.xxl - int(_.get(tshirts, 'm.xxl'))
      },
      f: {
        xs: tshirt_limits.f.xs - int(_.get(tshirts, 'f.xs')),
        s: tshirt_limits.f.s - int(_.get(tshirts, 'f.s')),
        m: tshirt_limits.f.m - int(_.get(tshirts, 'f.m')),
        l: tshirt_limits.f.l - int(_.get(tshirts, 'f.l'))
      }
    }
    await db.close();
    return <any>{
      total,
      not_finished,
      payment_online,
      payment_onsite,
      payment_onsite_permit,
      pl,
      not_pl,
      genders,
      tshirts,
      countries,
      countries_count: _.size(countries)
    }
  }

  /**
   *  list for admin panel
   */
  @Get('list')
  @UseGuards(UhfGuard)
  public async listGet(@User() user: any): Promise<RegisterResponse> {


    const db = await this.db.acquire();
    const records: any = await db.query(`SELECT FROM EventRegistration WHERE event_rid = 'e0uhf2019' ORDER BY @rid DESC`, {
      params: {}
    }).all();
    return records;
  }

  /**
   *  update the record
   */
  @Post('list')
  public async listUpdate(@Body() data: any, @Request() ctx): Promise<RegisterResponse> {


    if (!ctx.state.user) {
      throw new ForbiddenError({ message: 'access forbidden' })
    }
    if (!ctx.state.user.has_uhf) {
      throw new ForbiddenError({ message: 'access restricted' })
    }

    const db = await this.db.acquire();
    const item = _.omit(data, [
      '@rid',
      '@class',
      'rid',
      '@version',

    ])

    if (!data.rid) {

    }

    await db.query('UPDATE EventRegistration MERGE :data RETURN AFTER WHERE rid=:rid', {
      params: {
        hash: data.hash,
        rid: data.rid,
        data: item
      }
    });

    const records: any = await db.query(`SELECT FROM EventRegistration WHERE event_rid = 'e0uhf2019' ORDER BY @rid DESC`, {
      params: {}
    }).all();
    return records;

  }

  /**
   *  onsite peyment permit
   */
  @Post('onsite-permit')
  public async osPermit(@Request() ctx: any): Promise<RegisterResponse> {


    if (!ctx.state.user) {
      throw new ForbiddenError({ message: 'access forbidden' });
    }
    if (!ctx.state.user.has_uhf) {
      throw new ForbiddenError({ message: 'access restricted' })
    }
    const db = await this.db.acquire();
    const item = ctx.request.body;
    const rid = ctx.request.body.rid;
    const data = { payment_onsite_permit: !ctx.request.body.payment_onsite_permit };

    await db.query('UPDATE EventRegistration MERGE :data RETURN AFTER WHERE rid=:rid', {
      params: {
        rid,
        data
      }
    }).one();

    const subject = tr('ONSITE_PERMIT_EMAIL_SUBJECT', item);
    const html = tr('ONSITE_PERMIT_EMAIL_HTML', item);

    this.sendEmail(item.email, subject, html);

    const records: any = await db.query(`SELECT FROM EventRegistration WHERE event_rid = 'e0uhf2019' ORDER BY @rid DESC`, {
      params: {}
    }).all();
    return records;

  }

  /**
   *  online payment log
   */
  @Post('online-payment')
  public async onlinePayment(@Request() ctx: any): Promise<RegisterResponse> {


    if (!ctx.state.user) {
      throw new ForbiddenError({ message: 'access forbidden' })
    }
    if (!ctx.state.user.has_uhf) {
      throw new ForbiddenError({ message: 'access restricted' })
    }
    const db = await this.db.acquire();
    const rid = ctx.request.body.item.rid;
    const item = ctx.request.body.item;
    const data = { payment_online: ctx.request.body.payment };

    const row: any = await db.query('UPDATE EventRegistration MERGE :data RETURN AFTER WHERE rid=:rid', {
      params: {
        rid,
        data
      }
    }).one();

    const subject = tr('ONLINE_PAYMENT_EMAIL_SUBJECT', row);
    const html = tr('ONLINE_PAYMENT_EMAIL_HTML', row);

    this.sendEmail(row.email, subject, html);

    const records: any = await db.query(`SELECT FROM EventRegistration WHERE event_rid = 'e0uhf2019' ORDER BY @rid DESC`, {
      params: {}
    }).all();
    return records;

  }

  @Post('fb-auth')
  async fbAuth(@Body() request: AuthConnectFacebookRequestDto): Promise<any> {
    /**
     * get profile from facebook
     */
    const profile: FacebookProfileEntity = await this.fbMe(request.access_token);

    // profile id is required
    if (!profile || !profile.id) {
      throw new ValidationError({ title: `We can't get id of your facebook profile :(`, data: { rerequest: true } });
    }

    /**
     * find user in database by facebook_id or email
     */
    const users: any[] = await this.findByFacebookProfile(profile);
    let user = null;
    if (users.length) {
      user = users[0];
    }
    const api_token: string = this.jwt.tokenSign({
      facebook_profile: profile,
      user
    });

    return {
      facebook_profile: profile,
      api_token,
      users,
      user
    };
  }

  /**
   * get users by facebook profile, should be only one, but can happen more
   */
  async findByFacebookProfile(profile: FacebookProfileEntity): Promise<Array<any>> {
    let where = '';
    const params: any = {};
    if (profile.id) {
      where = 'facebook_id = :facebook_id';
      params.facebook_id = profile.id;
    }
    if (profile.email) {
      where = where + ' OR email = :email';
      params.email = profile.email;
    }
    const query = `
    SELECT ${this.selectQuery.join(',')}
    FROM User
    where ${where}
    `;
    const db = await this.db.acquire();
    const items: any = await db.query<any[]>(query, {
      params
    }).all();
    await db.close();
    return items.map(userRow2entity);
  }

  fbMe(accessToken: string): Promise<FacebookProfileEntity> {
    return new Promise<FacebookProfileEntity>(function (resolve, reject) {
      FB.api(
        'me',
        {
          fields: ['id', 'name', 'email'],
          access_token: accessToken
        },
        function (profile) {
          // error getting the profile
          if (profile.error) {
            const e = new ValidationError({
              title: `Did you canceled the login dialog?? Becourse we got: ${profile.error.message}`,
              data: { rerequest: true },
              parent: profile.error
            });
            reject(e);
          }

          resolve(profile);
        }
      );
    });
  }
}
export function userRow2entity(row: any): any {
  if (row) {
    delete row['@type'];
    delete row['@rid'];
    delete row['@version'];
    if (row['firstname']) {
      row.first_name = row['firstname'];
      delete row['firstname'];
    }
    if (row['lastname']) {
      row.last_name = row['lastname'];
      delete row['lastname'];
    }
    row.id = row.id.toString();
  }
  return row;
}
function tr(name: string, item: any) {
  if (!texts[name]) {
    return name;
  }
  if (!texts[name][item.language]) {
    return name + ':' + item.language;
  }
  let str = texts[name][item.language];
  for (const key in item) {
    if (item.hasOwnProperty(key)) {
      const value = item[key];
      str = str.replace(new RegExp('{{' + key + '}}', 'g'), value);
    }
  }
  return str;
}
