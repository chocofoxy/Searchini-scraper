import { Scraper } from './index' ;

const bootstrap : Function = async () => {
    // TODO : build fastify api and load it 
    console.time('Bootstrap')
    let scraper = new Scraper()
    console.timeEnd('Bootstrap')
}
bootstrap()

