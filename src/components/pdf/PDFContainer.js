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
     *
     * DOM events are available at https://github.com/yurydelendik/pdf.js/blob/master/web/dom_events.js
     *
     */
    initEventBus() {
        const eventBus = new PDFJSViewer.EventBus();
        eventBus.on('pagesinit', () => {
            this.pdfViewer.currentScale = 1.0;
        });
        
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
    
    render () {
        return(
            <PDFContainer id='viewer-container'>
                <div className="pdfViewer"></div>
            </PDFContainer>
        );
    }
}

Container.propTypes = {
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
//  Don't use this.  In parent component, we need to use `this.container` reference to inject state property updates
//  to stick with PDFJS.  Adding `connect` here, even with the `withRef` option blows that connection up and the document
//  will not be rendered.
// export default connect(mapStateToProps, mapDispatchToProps, null,  {withRef: true})(Container);

export default Container;