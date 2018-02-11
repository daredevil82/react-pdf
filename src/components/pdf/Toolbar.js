import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {
    Nav,
    Navbar,
    NavItem,
} from 'react-bootstrap';
import styled from 'styled-components';

import {onZoomIn, onZoomOut} from "../../actions/pdfActions";

const ZoomItem = styled.div`
  display: inline-block;
  float: left;
  
  :not(:first-child) {
    margin-left: 10px;
  }
`;

const Toolbar = props => {
    return (
            <Navbar>
                <Nav pullLeft>
                    <NavItem>
                        <ZoomItem onClick={e => props.actions.onZoomIn(e)}>
                            <i className="fa fa-plus-circle"></i>
                        </ZoomItem>
                        <ZoomItem>Zoom: {(props.scale * 100).toFixed(0)}%</ZoomItem>
                        <ZoomItem onClick={e => props.actions.onZoomOut(e)}>
                            <i className="fa fa-minus-circle"></i>
                        </ZoomItem>
                    </NavItem>
                </Nav>
                <Nav>
                    <NavItem>
                        <div className="page-number">Page {props.page} of {props.pageCount}</div>
                    </NavItem>
                </Nav>
            </Navbar>
            
    );
};

Toolbar.propTypes = {
    page: PropTypes.number,
    pageCount: PropTypes.number,
    scale: PropTypes.number,
    actions: PropTypes.object.isRequired
    
};

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators({onZoomIn, onZoomOut}, dispatch)
    }
};

export default connect(null,  mapDispatchToProps)(Toolbar);