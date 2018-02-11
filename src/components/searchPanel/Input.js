import React from 'react';
import PropTypes from 'prop-types';

import {
    Button,
    Form,
    FormControl,
    FormGroup,
    Row
} from 'react-bootstrap';

const Input = props => {

    return (
        <Row>
            <Row>
                <Form onSubmit={props.onSearchExecute}>
                    <FormGroup>
                        <FormControl type='text'
                                     placeholder='Keyword Search'
                                     onChange={e => props.onSearchUpdate(e)}
                                     value={props.currentSearch}
                        />
                    </FormGroup>
                    <Row>
                        <Button bsStyle='primary'
                                type='submit'
                                disabled={props.searchDisabled}
                                active={false}
                        >
                            Search
                        </Button>
                    </Row>
                </Form>
            </Row>
        </Row>
    );
    
};

Input.propTypes = {
    onSearchUpdate: PropTypes.func.isRequired,
    searchDisabled: PropTypes.bool.isRequired,
    currentSearch: PropTypes.string.isRequired,
    onSearchExecute: PropTypes.func.isRequired
};

export default Input;