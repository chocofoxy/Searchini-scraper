"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tunisiatech = void 0;
const helpers_1 = require("utils/helpers");
class Tunisiatech extends helpers_1.RoadMap {
    getInformation() {
        return {
            name: 'Tunisiatech',
            method: 'POST',
            query: { search: 's', page: 'n' },
            uri: `https://tunisiatech.tn/tunisie`,
            options: {
                gzip: true,
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    "Content-Type": "application/json;charset=UTF-8"
                },
                resolveWithFullResponse: true
            },
            api: false
        };
    }
    getPages() {
        return { start: 0, end: 5 };
    }
    getProducts() {
        let products = [];
        for (let element in this.$("div.ajax_block_product").children()) {
            products.push(this.getProduct(element));
        }
        return products;
    }
    getProduct(element) {
        let name = this.$(element).find(".product-title > a").text();
        let pic = this.$(element).find("a.product-thumbnail  > img");
        let price = this.$(element).find(".price > span");
        return new helpers_1.Product(name, pic.attr("src"), pic.parent().attr("href"), price.text().replace(/(\r\n\s|\n|\r|\s)/gm, '').replace(',', '.'), price.parent().prev().prev().prev().text().replace(/(\r\n\s|\n|\r|\s)/gm, '').replace(',', '.'), "");
    }
}
exports.Tunisiatech = Tunisiatech;
