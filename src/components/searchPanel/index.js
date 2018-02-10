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
import Results from './Results';

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
            searchDisabled: true,
            results: []
        };
        
        this.onSearchUpdate = this.onSearchUpdate.bind(this);
        this.onSearchExecute = this.onSearchExecute.bind(this);
        this.onSearchItemClick = this.onSearchItemClick.bind(this);
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
    
    onSearchItemClick(e, props) {
        console.log(e);
        console.log(props)
    }
    
    componentWillReceiveProps(nextProps) {
        console.log(`${this.constructor.name}`);
        console.log(nextProps);
        
        this.setState({
            results: nextProps.results
        });
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
                <Row>
                    <Results results={this.state.results}
                             onClick={this.onSearchItemClick}
                    />
                </Row>
            </SearchContainer>
        )
    }
    
}

SidePanel.propTypes = {
    results: PropTypes.array
};

const mapStateToProps = (state, ownProps) => ({
    results: state.results
});

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators({onSearchExecute}, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SidePanel);