import cheerio from 'cheerio';


export interface indexRange {
    start: Number,
    end: Number
}

export class Product {
    constructor(
        name: String,
        image: String,
        url: String,
        price: Number,
        oldPrice: Number,
        mark: String,
    ) { }
}

export class RoadMap {

    $: any

    constructor() { }

    load(html: string, options = {}): void {
        this.$ = cheerio.load(html, options)
    }

}

export interface Template {

    getInformation(): Information

    getPages(): indexRange

    getProducts(): Array<Product>

    getProduct(element: any): Product

}


export interface Information {
    name: String
    uri: String 
    method: String
    query: {
        search: String
        page: String
    }
    options: Object
    api: Boolean

}