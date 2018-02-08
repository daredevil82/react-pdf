import React, {Component} from 'react';
import PropTypes from 'prop-types';
import PDFContainer from './PDFContainer';
import Toolbar from './Toolbar';

import pdfjslib from 'pdfjs-dist/webpack';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {onZoomIn, onZoomOut, onScaleChanged, onPageChange} from "../../actions/pdfActions";
import configureStore from './../../store';

const store = configureStore();

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
    
        this.onScaleChanged = this.onPageNumberChanged.bind(this);
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
                           document: document,
                       }, () => {
                           this.setState({
                               pageCount: document.numPages,
                               page: 0,
                               scale: undefined,
                               document: document
                           });
                       });
                   }, err => {
                       console.error('Error loading document');
                       console.error(err);
                   });
    }
    
    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        
        const {state:{scale}} = nextProps;
        
        if (scale !== this.container.state.scale) {
            this.container.setState({scale});
        }
    }
    
    onScaleChanged(e) {
        store.dispatch(onScaleChanged(e));
    }
    
    onPageNumberChanged(e) {
        store.dispatch(onPageChange(e));
    }
    
    render () {
        return(
            <div>
                <Toolbar
                         page={this.state.page}
                         pageCount={this.state.pageCount}
                         scale={this.props.state.scale}
                />
                <PDFContainer onScaleChange={this.onScaleChanged}
                              onPageChange={this.onPageNumberChanged}
                              ref={ref => this.container = ref}
                />
            </div>
        )
    }
    
}

PDF.propTypes = {
    url: PropTypes.string.isRequired
};

const mapStateToProps = (state, ownProps) => {
    return {state};
};

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators({onZoomIn, onZoomOut, onScaleChanged}, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps, null, {withRef: true})(PDF);