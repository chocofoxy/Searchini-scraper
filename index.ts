import axios from 'axios';
import { Product , indexRange, Information } from './utils/helpers';
import { Tunisiatech } from './modules/tunisiatech'
import querystring from 'querystring';

export class Scraper {

    products: Product[] = []
    website: Information | undefined 
    pages: indexRange = { start: 0 , end: 0 }
    promises: Promise<any>[] = []

    // TODO : inject website service in the scraper 
    constructor( private roadmap = new Tunisiatech()) {
        console.time('Timer')
    }

    request(page: Number): Promise<any> {
        // TODO : load website information from service 
        return axios.post(this.website.uri, querystring.stringify(this.website.query))
    }

    filter(body: string): void {
        this.roadmap.load(body)
        this.products.push(this.roadmap.getProducts());
    }

    async paginate(): Promise<any> {
        // TODO : get indexRange from first page 
        for(let page = 0  ; page <= this.pages.end; page++ ) {
            this.promises.push(this.request(page).then(this.filter).catch( e => this.onError(e,page)) )
        }
        
    }

    async search( website: String , query: String): Promise<any> {
        // TODO : exist test mode 
        this.paginate()
        await Promise.all(this.promises)
        console.log(this.products, this.products.length);
        console.timeEnd('Timer')
    }

    onError( e: Error ,page: Number ): void {
        console.log(` ${'Module'} - Error on page number ${page}`);
    }

}

