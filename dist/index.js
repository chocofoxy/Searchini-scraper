"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scraper = void 0;
const axios_1 = __importDefault(require("axios"));
const tunisiatech_1 = require("./modules/tunisiatech");
const querystring_1 = __importDefault(require("querystring"));
class Scraper {
    // TODO : inject website service in the scraper 
    constructor(roadmap = new tunisiatech_1.Tunisiatech()) {
        this.roadmap = roadmap;
        this.products = [];
        this.pages = { start: 0, end: 0 };
        this.promises = [];
        console.time('Timer');
    }
    request(page) {
        // TODO : load website information from service 
        return axios_1.default.post(this.website.uri, querystring_1.default.stringify(this.website.query));
    }
    filter(body) {
        this.roadmap.load(body);
        this.products.push(this.roadmap.getProducts());
    }
    async paginate() {
        // TODO : get indexRange from first page 
        for (let page = 0; page <= this.pages.end; page++) {
            this.promises.push(this.request(page).then(this.filter).catch(e => this.onError(e, page)));
        }
    }
    async search(website, query) {
        // TODO : exist test mode 
        this.paginate();
        await Promise.all(this.promises);
        console.log(this.products, this.products.length);
        console.timeEnd('Timer');
    }
    onError(e, page) {
        console.log(` ${'Module'} - Error on page number ${page}`);
    }
}
exports.Scraper = Scraper;
