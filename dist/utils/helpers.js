"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoadMap = exports.Product = void 0;
const cheerio_1 = __importDefault(require("cheerio"));
class Product {
    constructor(name, image, url, price, oldPrice, mark) { }
}
exports.Product = Product;
class RoadMap {
    constructor() { }
    load(html, options = {}) {
        this.$ = cheerio_1.default.load(html, options);
    }
}
exports.RoadMap = RoadMap;
