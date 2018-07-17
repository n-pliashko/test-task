import React, {Component} from 'react'
import {browserHistory} from 'react-router'
import MonacoEditor from 'react-monaco-editor';
import $ from 'jquery';
import config from '../../../config';
import './editor.css';

require('bootstrap');

export default class ComponentsEditor extends Component {
    constructor(props) {
        super(props);
        const {params} = this.props;
        this.state = {
            error: '',
            filename: params.filename,
            componentName: '',
            content: ''
        };
    }

    componentDidMount() {
        let self = this;
        $.ajax({
            url: config.apiHost + '/file',
            method: 'GET',
            data: {filename: this.state.filename},
            success: function (result) {
                if (result.error) {
                    self.setState({error: result.error.message});
                } else if (result.content) {
                    self.setState({content: result.content});
                }
            },
            error(error) {
                console.log('error result:', error);
                let message = error.responseJSON && error.responseJSON.error ? error.responseJSON.error.message : error.responseText;
                self.setState({error: 'Error loading file! ' + message});
            }
        })
    }

    saveComponent = () => {
        let self = this;
        $.ajax({
            url: config.apiHost + '/save_file',
            method: 'POST',
            contentType: "application/json",
            data: JSON.stringify({filename: this.state.filename, content: this.state.content}),
            success: function (result) {
                console.log('result::', result);
                if (result.error) {
                    self.setState({error: result.error.message});
                } else {
                    browserHistory.push('/components/view/' + self.state.filename)
                }
            },
            error(error) {
                console.log('error result:', error);
                let message = error.responseJSON && error.responseJSON.error ? error.responseJSON.error.message : error.responseText;
                self.setState({error: 'Error saving file! ' + message});
            }
        })
    };
    onChange = (newValue, e) => {
        console.log('onChange', newValue, e);
        this.setState({content: newValue});
    };

    render() {
        return (
            <div style={{padding: '30px'}}>
                <h2>Edit File {this.state.filename}</h2>
                <div id="error-message" className={'error'}
                     style={{
                         paddingBottom: '30px',
                         display: this.state.error ? 'block' : 'none'
                     }}>{this.state.error}</div>

                <div className={'text-align-left'} style={{paddingBottom: '10px'}}>
                    <a href={'/components/view/' + this.state.filename}>&larr; View Component</a>
                </div>

                <div id="editor">
                    <MonacoEditor
                        width="100%"
                        height="600"
                        language="javascript"
                        theme="vs"
                        value={this.state.content}
                        options={{
                            selectOnLineNumbers: true
                        }}
                        onChange={this.onChange}
                    />
                </div>
                <div className="form-group">
                    <button className={"btn"} onClick={this.saveComponent}>Save</button>
                </div>
            </div>
        )
    }
}