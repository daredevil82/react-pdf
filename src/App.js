import React, {Component} from 'react';
import {parse} from "query-string";
import PDF from './components/pdf'

class App extends Component {
    constructor (props, context) {
        super(props, context);
    
        const url = App.parseUrl();
    
        this.state = {
            url: url === null ? 'tracemonkey.pdf' : url
        };
    }
    
    /**
     * Check if a valid URL path is included with the `?file=` query parameter.  If exists,
     * attempt to create a valid URL object from it and load it with the viewer.
     *
     * Invalid URLs will throw a TypeError or SyntaxError, which will result in applicatio
     * load failing and an error in the console.
     */
    static parseUrl() {
        const queryParams = parse(window.location.search);
        if ('file' in queryParams && queryParams.file !== '') {
            try{
                if (typeof queryParams.file !== 'string')
                    throw new TypeError();
                
                queryParams.file = queryParams.file.replace(/^[a-zA-Z]*?:(?=\/\/)/, '');
                return new URL(`${window.location.protocol}//${queryParams.file}`).href;
            }
            catch (e) {
                if (e instanceof TypeError || e instanceof SyntaxError) {
                    console.error('File url provided is not valid, proceeding with default PDF file');
                }
                return null;
            }
        }
        return null;
    }
    
    render () {
        return(
            <PDF url={this.state.url}/>
        );
    }
}

export default App;
