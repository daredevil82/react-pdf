import React from 'react';
import PropTypes from 'prop-types';

import {
    ListGroup,
    ListGroupItem,
    Row
} from 'react-bootstrap';

import styled from 'styled-components';

const HighlightQuery = styled.div`
  .result {
    background-color: yellow;
    font-weight: bold;
  }
`;

const ResultItem = props => {
    return (
        <ListGroupItem onClick={e => props.onClick(e, props)}>
            <Row>
                <HighlightQuery>
                    <div dangerouslySetInnerHTML={{__html: props.item.content}}></div>
                </HighlightQuery>
            </Row>
        </ListGroupItem>
    );
};

ResultItem.propType = {
    onClick: PropTypes.func.isRequired,
    item: PropTypes.object
};

const MatchCountElement = props => {
    let matchCount = props.resultCount === 0 ? 'No' : props.resultCount;
    return (
        <Row>{matchCount} matches found</Row>
    )
};

MatchCountElement.propTypes = {
    resultCount: PropTypes.number.isRequired
};

const Results = props => {
    const resultItems = [];
    
    if (props.results.length > 0)
        props.results.map((item, idx) => {
            resultItems.push(<ResultItem key={idx}
                                         onClick={props.onClick}
                                         item={item}
            />)
        });
    
    return (
        <div>
            <MatchCountElement resultCount={props.results.length}/>
            <ListGroup>
                {resultItems}
            </ListGroup>
        </div>
    )
};

Results.propTypes = {
    results: PropTypes.array,
    onClick: PropTypes.func
};

export default Results