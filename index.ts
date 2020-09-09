import axios from 'axios';
import { Product , indexRange, Information, RoadMap, Template } from './utils/helpers';
import { Tunisiatech } from './modules/tunisiatech'
import querystring from 'querystring';
import { WebsitesProvider } from 'service';

export class Scraper {

    products: Product[] = []
    pages: indexRange = { start: 0 , end: 0 }
    promises: Promise<any>[] = []

    constructor( private service = new WebsitesProvider()) {
        console.time('Timer')
    }

    request(page: Number , meta: Information): Promise<any> {
        return axios.post(meta.uri, querystring.stringify(meta.query))
    }

    filter(body: string,roadmap: Template): void {
        this.products.push(roadmap.getProducts());
    }

    async paginate( website: Template ): Promise<any> {
        // TODO : get indexRange from first page 
        for(let page = 0  ; page <= this.pages.end; page++ ) {
            this.promises.push(this.request(page,website.getInformation())
            .then( body => this.filter(body,website)).catch( e => this.onError(e,page)) )
        }
        
    }

    async search( website: string , query: String): Promise<any> {
        this.paginate( this.service.get(website) )
        await Promise.all(this.promises)
        console.log(this.products, this.products.length);
        console.timeEnd('Timer')
    }

    onError( e: Error ,page: Number ): void {
        console.log(` ${'Module'} - Error on page number ${page}`);
    }

}

