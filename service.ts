import { Template } from "utils/helpers"
import { Tunisiatech } from "modules/tunisiatech"

// TODO : load all modules in this service 
export class WebsitesProvider {

    modules : Collection = {}

    constructor () {
        this.modules["tech"] = new Tunisiatech()
    }

    get( name: string ) : Template {
        return this.modules[name]
    }

}

interface Collection {
    [key: string]: Template ;
}