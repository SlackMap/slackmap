/*
 * authentication actions
 */
import { ForbiddenError, NotFoundError, ValidationError } from '@slackmap/api/core';
import { texts } from "./uhf-emails";
import { now, OrientService } from "@slackmap/api/orient";
// import * as _ from 'lodash';
const _ = require('lodash');
import { Controller, Get, Query, Post, Body, Request } from '@nestjs/common';
import { UhfMailRegConfig } from './uhf-mail-reg-config';
const nodemailer = require('nodemailer');
const striptags = require('striptags');
const randomstring = require('randomstring');

export interface StatsResponse {
    total?: number
}

@Controller("uhf")
export class UhfController {

    constructor(
        private db: OrientService,
        private mailConfig: UhfMailRegConfig
    ) { }

    /**
     * get your data by hash
     */
    @Get('register')
    public async edit(@Query('hash') hash: string): Promise<RegisterResponse> {
      const db = await this.db.acquire();
        const event_rid = 'e0uhf2019'
        if (!hash) {
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
            return {
                message: tr('EDIT_EMAIL_SUCCESS', record)
            };
        } else {
            // new registration
            let item = body;
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
        var rid = item['rid'];
        var hash = item['hash'];
        var event_rid = 'e0uhf2019';


        var record: any = await db.query('SELECT * FROM EventRegistration WHERE hash=:hash AND event_rid=:event_rid AND rid=:rid', {
            params: {
                hash,
                event_rid,
                rid
            }
        }).one();

        if (!record) {
            return {
                error: 'hash not valid'
            }
        }
        const sendPayment = !item.payment_id;

        if (sendPayment) {
            item.payment_id = record['@rid'].position;
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

        let data: any = await db.command(`UPDATE EventRegistration MERGE ${json} RETURN AFTER WHERE hash = :hash AND rid=:rid`, {
            params: {
                hash: hash,
                rid: rid,
                data: item
            }
        }).one();


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
        var rid = item['rid'];
        var hash = item['hash'];
        var event_rid = 'e0uhf2019';


        var record: any = await db.query('SELECT * FROM EventRegistration WHERE hash=:hash AND event_rid=:event_rid AND rid=:rid', {
            params: {
                hash,
                event_rid,
                rid
            }
        }).one();

        if (!record) {
            return {
                error: 'hash not valid'
            }
        }

        let data = await db.query('DELETE FROM :rid', {
            params: {
                rid: record['@rid']
            }
        }).one();


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
    public async stats(): Promise<StatsResponse> {
      const db = await this.db.acquire();
        const event_rid = 'e0uhf2019';

        const total: number = await db.query<any>('select count(1) from EventRegistration WHERE event_rid=:event_rid', {
            params: { event_rid: event_rid }
        }).all().then<number>(i => i[0].count);

        const not_finished: number = await db.query<any>('select count(1) from EventRegistration WHERE event_rid=:event_rid AND payment_id IS NULL', {
            params: { event_rid: event_rid }
        }).all().then<number>(i => i[0].count);

        const payment_online: number = await db.query<any>('select count(1) from EventRegistration WHERE event_rid=:event_rid AND payment_online IS NOT NULL', {
            params: { event_rid: event_rid }
        }).all().then<number>(i => i[0].count);

        const payment_onsite: number = await db.query<any>('select count(1) from EventRegistration WHERE event_rid=:event_rid AND payment_onsite IS NOT NULL', {
            params: { event_rid: event_rid }
        }).all().then<number>(i => i[0].count);

        const payment_onsite_permit: number = await db.query<any>('select count(1) from EventRegistration WHERE event_rid=:event_rid AND payment_onsite_permit IS NOT NULL', {
            params: { event_rid: event_rid }
        }).all().then<number>(i => i[0].count);

        const pl: number = await db.query<any>('select count(1) from EventRegistration WHERE event_rid=:event_rid AND country = "PL" ', {
            params: { event_rid: event_rid }
        }).all().then<number>(i => i[0].count);

        const not_pl: number = await db.query<any>('select count(1) from EventRegistration WHERE event_rid=:event_rid AND country <> "PL" ', {
            params: { event_rid: event_rid }
        }).all().then<number>(i => i[0].count);

        const countries: any = await db.query<any>('select count(1), country from EventRegistration WHERE event_rid=:event_rid GROUP BY country', {
            params: { event_rid: event_rid }
        }).all().then<any>(items => {
            let res: any = {};
            for (let item of items) {
                res[item.country] = item.count;
            }
            return res;
        });
        const genders: any = await db.query<any>('select count(1), gender from EventRegistration WHERE event_rid=:event_rid GROUP BY gender', {
            params: { event_rid: event_rid }
        }).all().then<any>(items => {
            let res: any = {};
            for (let item of items) {
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
        await db.query<any>(`select count(1), tshirt_type from EventRegistration WHERE event_rid=:event_rid AND tshirt_gender='m' GROUP BY tshirt_type`, {
            params: { event_rid: event_rid }
        }).all().then<any>(items => {
            for (let item of items) {
                tshirts.m[item.tshirt_type] = item.count;
                tshirts.m_count = tshirts.m_count + item.count;
            }
        });
        await db.query<any>(`select count(1), tshirt_type from EventRegistration WHERE event_rid=:event_rid AND tshirt_gender='f' GROUP BY tshirt_type`, {
            params: { event_rid: event_rid }
        }).all().then<any>(items => {
            for (let item of items) {
                tshirts.f[item.tshirt_type] = item.count;
                tshirts.f_count = tshirts.f_count + item.count;
            }
        });

        let int: any = function (val: any) {
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
    public async listGet(@Request() ctx: any): Promise<RegisterResponse> {

        if (!ctx.state.user) {
            throw new ForbiddenError({message: 'access forbidden'})
        }
        if (!ctx.state.user.has_uhf) {
            throw new ForbiddenError({message: 'access restricted'})
        }

        const db = await this.db.acquire();
        var records: any = await db.query(`SELECT FROM EventRegistration WHERE event_rid = 'e0uhf2019' ORDER BY @rid DESC`, {
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
            throw new ForbiddenError({message: 'access forbidden'})
        }
        if (!ctx.state.user.has_uhf) {
            throw new ForbiddenError({message: 'access restricted'})
        }

        const db = await this.db.acquire();
        var item = _.omit(data, [
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

        var records: any = await db.query(`SELECT FROM EventRegistration WHERE event_rid = 'e0uhf2019' ORDER BY @rid DESC`, {
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
            throw new ForbiddenError({message:'access forbidden'});
        }
        if (!ctx.state.user.has_uhf) {
            throw new ForbiddenError({message: 'access restricted'})
        }
        const db = await this.db.acquire();
        var item = ctx.request.body;
        var rid = ctx.request.body.rid;
        var data = {payment_onsite_permit: !ctx.request.body.payment_onsite_permit};

        await db.query('UPDATE EventRegistration MERGE :data RETURN AFTER WHERE rid=:rid', {
            params: {
                rid,
                data
            }
        }).one();

        const subject = tr('ONSITE_PERMIT_EMAIL_SUBJECT', item);
        const html = tr('ONSITE_PERMIT_EMAIL_HTML', item);

        this.sendEmail(item.email, subject, html);

        var records: any = await db.query(`SELECT FROM EventRegistration WHERE event_rid = 'e0uhf2019' ORDER BY @rid DESC`, {
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
            throw new ForbiddenError({message: 'access forbidden'})
        }
        if (!ctx.state.user.has_uhf) {
            throw new ForbiddenError({message: 'access restricted'})
        }
        const db = await this.db.acquire();
        var rid = ctx.request.body.item.rid;
        var item = ctx.request.body.item;
        var data = {payment_online: ctx.request.body.payment};

        var row:any = await db.query('UPDATE EventRegistration MERGE :data RETURN AFTER WHERE rid=:rid', {
            params: {
                rid,
                data
            }
        }).one();

        const subject = tr('ONLINE_PAYMENT_EMAIL_SUBJECT', row);
        const html = tr('ONLINE_PAYMENT_EMAIL_HTML', row);

        this.sendEmail(row.email, subject, html);

        var records: any = await db.query(`SELECT FROM EventRegistration WHERE event_rid = 'e0uhf2019' ORDER BY @rid DESC`, {
            params: {}
        }).all();
        return records;

    }

}

export interface RegisterResponse {
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
