import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {PDFJS as PDFJSViewer} from 'pdfjs-dist/web/pdf_viewer';

import styled from 'styled-components';
import 'pdfjs-dist/web/pdf_viewer.css';

const PDFContainer = styled.div`
  overflow: auto;
  position: absolute;
  top: 52px;
  bottom: 0;
  width: 100%;
  
  > .pdfViewer {
    > .page {
      border: none;
      
      > .canvasWrapper {
        border-top: 1px solid black;
      }
      
      > .textLayer .selected {
        background-color: rgb(180, 0, 170);
      }
    }
  }
`;


/**
 * The container of the PDF viewer, which holds the rendered content from the PDFJS lib as
 * well as responsible for setting up the various event listeners.
 */
class Container extends Component {
    
    constructor (props, context) {
        super(props, context);
        
        this.state = {
            document: null,
            scale: 1.0,
            page: undefined
        };
        
        // Sometimes, its necessary to keep component level variables outside of React's state
        // because of the asynchronous batch updates of state changes.
        this.pdfViewer = null;
        this.eventBus = this.initEventBus();
        //this._pageLoadHandler = this._pageLoadHandler.bind(this);
        
    }
    
    /**
     * Load all the pages into a text array, to be used as source for custom search.
     * @private
     */
    _pageLoadHandler() {
    
    }
    
    /**
     * Define event listeners for specific events on this application.
     */
    initEventBus() {
        const eventBus = new PDFJSViewer.EventBus();
        eventBus.on('pagesinit', () => {
            this.pdfViewer.currentScale = 1.0;
            this.setState({
                scale: this.pdfViewer.currentScale,
                page: this.pdfViewer.currentPageNumber
            }, () => {
                this.props.onScaleChange({scale: this.state.scale});
                this.props.onPageChange({page: this.state.page});
            });
        });
        
        //eventBus.on('pagesloaded', this._pageLoadHandler);
        eventBus.on('scalechange', e => this.props.onScaleChange(e.scale));
        eventBus.on('pagechange', e => this.props.onPageChange(e.pageNumber));
        eventBus.on('textlayerrendered', e => {});
        
        return eventBus;
    }
    
    componentDidMount() {
        let viewerContainer = document.getElementById('viewer-container');
        this.pdfViewer = new PDFJSViewer.PDFViewer({
            container: viewerContainer,
            eventBus: this.eventBus
        });
    }
    
    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
    }
    
    // TODO is this really necessary?  Can we use componentWillRecieveProps instead?
    componentWillUpdate(nextProps, nextState) {
        if (this.state.document !== nextState.document){
            this.setState({
                document: nextState.document
            }, () => this.pdfViewer.setDocument(nextState.document));
        }

        if (this.state.scale !== nextState.scale) {
            this.setState({
                scale: nextState.scale
            }, () => this.pdfViewer.currentScale = nextState.scale);
        }

        if (this.state.page !== nextState.page) {
            this.setState({
                page: nextState.page
            }, () => this.pdfViewer.pageNumber = nextState.page);
        }
    }
    //
    // Updates and re-renders are particularly expensive with PDF documents, so we want
    // to limit only in specific changes, specifically document, page and scale changes
    shouldComponentUpdate(nextProps, nextState) {
        return this.state.document !== nextState.document ||
            this.state.scale !== nextState.scale ||
            this.state.page !== nextState.page;
    }
    
    render () {
        return(
            <PDFContainer id='viewer-container'>
                <div className="pdfViewer"></div>
            </PDFContainer>
        );
    }
}

Container.propTypes = {
    onScaleChange: PropTypes.func.isRequired,
    onPageChange: PropTypes.func.isRequired,
};

// const mapStateToProps = (state, ownProps) => {
//     return {state};
// };
//
// const mapDispatchToProps = dispatch => {
//     return {
//         actions: bindActionCreators({onScaleChanged, onPageChange}, dispatch)
//     };
// };
//
// export default connect(mapStateToProps, mapDispatchToProps, null,  {withRef: true})(Container);

export default Container;