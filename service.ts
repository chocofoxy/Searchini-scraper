import { Template, RoadMap } from "./utils/helpers"
import { Tunisiatech } from "./modules/tunisiatech"

// TODO : load all modules in this service 
export class WebsitesProvider {

    modules : Collection = {}

    constructor () {
        this.modules["Tunisiatech"] = new Tunisiatech()
    }

    get( name: string ) : Template & RoadMap {
        return this.modules[name]
    }

}

interface Collection {
    [key: string]: Template & RoadMap;
}