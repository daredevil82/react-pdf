import React from 'react';
import PropTypes from 'prop-types';
import {
    Nav,
    Navbar,
    NavItem
} from 'react-bootstrap';
import styled from 'styled-components';

const PdfNavbar = styled.div`
  .container {
    width: 900px
  }
  
  position: absolute;
  top: 0;
  left: 0;
`;

const ZoomItem = styled.div`
  display: inline-block;
  float: left;
  
  :not(:first-child) {
    margin-left: 10px;
  }
`;

const Toolbar = props => {
    return (
        <PdfNavbar>
            <Navbar>
                <Nav pullLeft>
                    <NavItem>
                        <ZoomItem onClick={e => props.onZoomIn(e)}>
                            <i className="fa fa-plus-circle"></i>
                        </ZoomItem>
                        <ZoomItem>Zoom: {(props.scale * 100).toFixed(0)}%</ZoomItem>
                        <ZoomItem onClick={e => props.onZoomOut(e)}>
                            <i className="fa fa-minus-circle"></i>
                        </ZoomItem>
                    </NavItem>
                </Nav>
                <Nav pullRight>
                    <NavItem>
                        <div className="page-number">Page {props.page} of {props.pageCount}</div>
                    </NavItem>
                </Nav>
            </Navbar>
            
        </PdfNavbar>
    );
};

Toolbar.propTypes = {
    onZoomIn: PropTypes.func.isRequired,
    onZoomOut: PropTypes.func.isRequired,
    page: PropTypes.number,
    pageCount: PropTypes.number,
    scale: PropTypes.number
};

export default Toolbar