import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Grid, Row, Col} from 'react-bootstrap';

import pdfjslib from 'pdfjs-dist/webpack';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import PDFContainer from './PDFContainer';
import Toolbar from './Toolbar';
import SearchPanel from './../searchPanel';
import {onZoomIn, onZoomOut, onPageChange} from "../../actions/pdfActions";

import styled from 'styled-components';

const RowWrapper = styled.div`
  .row {
    height: 100vh;
    overflow: scroll;
  }
`;

/**
 * Primary component of the PDF viewer.  Responsible for loading the document content
 * and handling zoom and scale changes
 *
 * Because react and pdfjs are very different libraries, the best way to interact with PDFs
 * is to actually inject the value changes and properties on the referenced `pdfViewer` object
 * inside the child component.
 */
class PDF extends Component {
    
    constructor (props, context) {
        super(props, context);
        
        this.state = {
            page: 0,
            pageCount: 0
        };
    
        this.onPageNumberChanged = this.onPageNumberChanged.bind(this);
    }
    
    componentDidMount() {
        const loadingTask = pdfjslib.getDocument(this.props.url);
        loadingTask.promise
                   .then(document => {
                       
                       this.container.pdfViewer.setDocument(document);
                       
                       this.setState({
                           pageCount: document.numPages,
                           page: this.container.pdfViewer.currentPageNumber,
                           scale: this.container.pdfViewer.currentScaleValue
                       });
                       
                   }, err => {
                       console.error('Error loading document');
                       console.error(err);
                   });
    }
    
    componentWillReceiveProps(nextProps) {
        const {scale} = nextProps;
        
        if (scale !== this.container.pdfViewer.currentScale) {
            this.container.pdfViewer.currentScale = scale;
        }
    }
    
    onPageNumberChanged(e) {
        this.props.actions.onPageChange(e);
    }
    
    render () {
        return(
            <Grid>
                <Row>
                    <Col md={10} sm={10} xs={10} lg={10}>
                        <Row>
                            <Toolbar page={this.props.page}
                                     pageCount={this.state.pageCount}
                                     scale={this.props.scale}
                            />
                        </Row>
                        <RowWrapper>
                            <Row>
                                <PDFContainer onPageChange={this.onPageNumberChanged}
                                              ref={ref => this.container = ref}
                                />
                            </Row>
                        </RowWrapper>
                    </Col>
                    <Col md={2} sm={2} xs={2} lg={2}>
                        <SearchPanel/>
                    </Col>
                </Row>
            </Grid>
        )
    }
}

PDF.propTypes = {
    url: PropTypes.string.isRequired
};

const mapStateToProps = (state, ownProps) => ({
    page: state.page === 0 ? 1 : state.page,
    scale: state.scale
});

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators({onZoomIn, onZoomOut, onPageChange}, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps, null, {withRef: true})(PDF);