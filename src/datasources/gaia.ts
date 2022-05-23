import { RESTDataSource } from 'apollo-datasource-rest';


export class GaiaAPI extends RESTDataSource {
    constructor () {
        super();
        this.baseURL = 'https://www.gaiagps.com/api/search/discover'
    }

    async getNearbyHikes({}){
        
    }

}