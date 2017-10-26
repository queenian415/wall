import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Form extends Component {
    constructor(props) {
        super(props);

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(e) {
        this.props.onInputChange(e);
    }

    handleSubmit(e) {
        this.props.onSubmit(this.props.postTitle, this.props.postContent);
    }

    render() {
        return (
            <div>
            <h1>Post your event</h1>
            <fieldset name="newPost">
                <label>
                    Title:
                    <input type="text" name="postTitle" value={this.props.postTitle} onChange={this.handleInputChange} />
                </label><br/>
                <label>
                    Content:
                    <textarea name="postContent" value={this.props.postContent} onChange={this.handleInputChange}/>
                </label><br/>
                <button type="button" onClick={this.handleSubmit}>Post</button>
            </fieldset>
            </div>
        );
    }
}

Form.propTypes = {
    postTitle: PropTypes.string,
    postContent: PropTypes.string,
    onInputChange: PropTypes.func,
    onSubmit: PropTypes.func
}

export default Form;