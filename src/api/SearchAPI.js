const singleton = Symbol();
const singletonEnforcer = Symbol();

/**
 * Singleton API object interface with PDF.js FindController class.  Implementation of
 * SO answer at // http://stackoverflow.com/a/26227662/1527470
 */
class SearchAPI {
    constructor(enforcer, controller) {
        if (enforcer !== singletonEnforcer)
            throw new Error('Cannot instantiate singleton');
        
        this['controller'] = controller;
    }
    
    static set instance(controller) {
        if (!this[singleton])
            this[singleton] = new SearchAPI(singletonEnforcer, controller);
    }
    
    static get instance() {
        if (!this[singleton])
            throw new Error('SearchAPI not instantiated with search controller');
        
        return this[singleton];
    }
    
    static query(query) {
        return SearchAPI.instance.controller.queryDocument(query);
    }
    
}

export default SearchAPI;