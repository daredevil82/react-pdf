import React, {Component} from 'react';
import {parse} from "query-string";
import PDF from './components/pdf'

class App extends Component {
    constructor (props, context) {
        super(props, context);
        
        this.state = {
            url: 'tracemonkey.pdf'
        };
        
        this.parseUrl();
    }
    
    /**
     * Check if a valid URL path is included with the `?file=` query parameter.  If exists,
     * attempt to create a valid URL object from it and load it with the viewer.
     *
     * Invalid URLs will throw a TypeError or SyntaxError, which will result in applicatio
     * load failing and an error in the console.
     */
    parseUrl() {
        const queryParams = parse(window.location.search);
        if ('file' in queryParams && queryParams.file !== '') {
            try{
                const url = new URL(queryParams.file).toString();
                this.setState(url);
            }
            catch (e) {
                if (e instanceof TypeError || e instanceof SyntaxError) {
                    console.error('File url provided is not valid, proceeding with default PDF file');
                }
            }
        }
    }
    
    render () {
        return(
            <PDF url={this.state.url}/>
        );
    }
}

export default App;
