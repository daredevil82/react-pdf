import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {onSearchExecute} from "../../actions/pdfActions";

import {
    Row,
    Panel
} from 'react-bootstrap';

import styled from 'styled-components';

import Input from './Input';

const SearchContainer = styled.div`
  .row {
    margin-left: 0;
    margin-right: 0;
  }
`;

/**
 * Sidepanel component for handling search input, rendering results and selections
 */
class SidePanel extends Component {
    
    constructor (props) {
        super(props);
        
        this.state = {
            currentSearch: '',
            searchDisabled: true
        };
        
        this.onSearchUpdate = this.onSearchUpdate.bind(this);
        this.onSearchExecute = this.onSearchExecute.bind(this);
    }
    
    onSearchUpdate(e) {
        e.stopPropagation();
        this.setState({
            currentSearch: e.target.value,
            searchDisabled: e.target.value.length < 1
        });
    }
    
    onSearchExecute(e) {
        e.stopPropagation();
        e.preventDefault();
    
        this.props.actions.onSearchExecute(this.state.currentSearch);
    }
    
    render () {
        return(
            <SearchContainer>
                <Row>
                    <Panel>
                        <Input currentSearch={this.state.currentSearch}
                               onSearchUpdate={this.onSearchUpdate}
                               searchDisabled={this.state.searchDisabled}
                               onSearchExecute={this.onSearchExecute}
                        />
                    </Panel>
                </Row>
            </SearchContainer>
        )
    }
    
}

SidePanel.propTypes = {};

const mapStateToProps = (state, ownProps) => ({
    results: state.results
});

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators({onSearchExecute}, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SidePanel);