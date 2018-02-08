import React, {Component} from 'react';
import PDF from './components/pdf'

import {parseUrl} from "./utils/url";

class App extends Component {
    constructor (props) {
        super(props);
    
        const url = parseUrl();
    
        this.state = {
            url: url === null ? 'tracemonkey.pdf' : url
        };
    }
    
    render () {
        return(
            <PDF url={this.state.url}/>
        );
    }
}

export default App;
