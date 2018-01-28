import React, {Component} from 'react';
import PropTypes from 'prop-types';
import PDFContainer from './PDFContainer';

import pdfjslib from 'pdfjs-dist/webpack';

/**
 * Primary component of the PDF viewer.  Responsible for loading the document content
 * and handling zoom and scale changes
 */
class PDF extends Component {
    
    constructor (props, context) {
        super(props, context);
        
        this.state = {
            pageCount: 0,
            document: {}
        };
        
        this.onScaleChanged = this.onScaleChanged.bind(this);
        this.onPageNumberChanged = this.onPageNumberChanged.bind(this);
        
    }
    
    componentDidMount() {
        /*
        For some reason I'm not entirely clear on why, PDFJS with React requires a reference in this parent
        component and inject the document content directly via the ref.
         */
    
        const loadingTask = pdfjslib.getDocument(this.props.url);
        loadingTask.promise
                   .then(document => {
                       this.container.setState({
                           document: document
                       }, () => {
                           this.setState({
                               pageCount: document.numPages,
                               page: 0,
                               scale: undefined
                           });
                       });
                   }, err => {
                       console.error('Error loading document');
                       console.error(err);
                   });
    }
    
    onScaleChanged(e) {
        this.setState({
            scale: e.scale
        });
    }
    
    onPageNumberChanged(e) {
        this.setState({
            page: e.page
        });
    }
    
    render () {
        return(
            <PDFContainer onScaleChange={this.onScaleChanged}
                          onPageChange={this.onPageNumberChanged}
                          ref={ref => this.container = ref}
            />
        )
    }
    
}

PDF.propTypes = {
    url: PropTypes.string.isRequired
};

export default PDF;