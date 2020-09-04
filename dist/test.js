"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const bootstrap = async () => {
    // TODO : build fastify api and load it 
    console.time('Bootstrap');
    let scraper = new index_1.Scraper();
    console.timeEnd('Bootstrap');
};
bootstrap();
