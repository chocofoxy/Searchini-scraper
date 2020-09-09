"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scraper = void 0;
const axios_1 = __importDefault(require("axios"));
//import querystring from 'querystring';
const service_1 = require("./service");
class Scraper {
    constructor(service = new service_1.WebsitesProvider()) {
        this.service = service;
        this.products = [];
        this.query = "";
        this.promises = [];
    }
    request(page, meta) {
        console.log(meta.uri + meta.query.search + "=" + this.query + "&" + meta.query.page + "=" + page);
        return axios_1.default.post(meta.uri + meta.query.search + "=" + this.query + "&" + meta.query.page + "=" + page);
    }
    filter(body, roadmap) {
        if (body == undefined)
            throw new Error(' the body of the request is empty ! ');
        roadmap.load(body);
        this.products = this.products.concat(roadmap.getProducts());
    }
    async paginate(website) {
        // TODO : get indexRange from first page 
        let pages = website.getPages();
        for (let page = pages.start; page <= pages.end; page++) {
            this.promises.push(this.request(page, website.getInformation())
                .then(res => this.filter(res.body, website)).catch(e => this.onError(e, page)));
        }
    }
    async search(website, query) {
        console.time('Timer');
        this.query = query;
        this.paginate(this.service.get(website));
        await Promise.all(this.promises);
        console.log(this.products, this.products.length, this.products[0]);
        console.timeEnd('Timer');
    }
    onError(e, page) {
        console.error(e);
        console.log(` ${'Module'} - Error on page number ${page}`);
    }
}
exports.Scraper = Scraper;
