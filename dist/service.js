"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebsitesProvider = void 0;
const tunisiatech_1 = require("./modules/tunisiatech");
// TODO : load all modules in this service 
class WebsitesProvider {
    constructor() {
        this.modules = {};
        this.modules["Tunisiatech"] = new tunisiatech_1.Tunisiatech();
    }
    get(name) {
        return this.modules[name];
    }
}
exports.WebsitesProvider = WebsitesProvider;
