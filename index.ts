import axios from 'axios';
import { Product , indexRange, Information, RoadMap, Template } from './utils/helpers';
import { Tunisiatech } from './modules/tunisiatech'
//import querystring from 'querystring';
import { WebsitesProvider } from './service';

export class Scraper {

    products: Product[] = []
    query: string = ""
    promises: Promise<any>[] = []

    constructor( private service = new WebsitesProvider()) {
        
    }

    request(page: Number , meta: Information): Promise<any> {
        console.log(meta.uri + meta.query.search + "=" + this.query + "&" + meta.query.page + "=" + page );  
        return axios.post(meta.uri + meta.query.search + "=" + this.query + "&" + meta.query.page + "=" + page)
    }

    filter(body: any ,roadmap: Template & RoadMap ): void {
        if (body == undefined) throw new Error(' the body of the request is empty ! ')
        roadmap.load(body)
        this.products = this.products.concat(roadmap.getProducts());
    }

    async paginate( website: Template & RoadMap ): Promise<any> {
        // TODO : get indexRange from first page 
        let pages = website.getPages()
        for(let page: number = pages.start  ; page <= pages.end; page ++ ) {
            this.promises.push(this.request(page,website.getInformation())
            .then( res => this.filter(res.body,website)).catch( e => this.onError(e,page)) )
        }
        
    }

    async search( website: string , query: string): Promise<any> {
        console.time('Timer')
        this.query = query 
        this.paginate( this.service.get(website) )
        await Promise.all(this.promises)
        console.log(this.products, this.products.length , this.products[0]);
        console.timeEnd('Timer')
    }

    onError( e: Error , page: Number ): void {
        console.error(e)
        console.log(` ${'Module'} - Error on page number ${page}`);
    }

}

