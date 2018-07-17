import React, {Component} from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter';
import {docco} from 'react-syntax-highlighter/styles/hljs';
import $ from 'jquery';
import config from '../../../config';
import './index.css';

require('bootstrap');

export default class ComponentViewer extends Component {
    constructor(props) {
        super(props);
        const {params} = this.props;
        this.state = {
            error: '',
            filename: params.filename,
            content: '',
            componentName: '',
            componentProps: {}
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
                    self.setState({content: result.content, componentName: result.componentName, componentProps: result.properties});
                }
            },
            error(error) {
                console.log('error result:', error);
                let message = error.responseJSON && error.responseJSON.error ? error.responseJSON.error.message : error.responseText;
                self.setState({error: 'Error loading file! ' + message});
            }
        })
    }

    render() {
        return (
          <div style={{padding: '30px'}}>
            <div id="error-message" className={'error'}
                 style={{
                   paddingBottom: '30px',
                   display: this.state.error ? 'block' : 'none'
                 }}>{this.state.error}</div>
            <div className={'text-align-left'} style={{paddingBottom: '10px'}}>
              <a href={'/components/edit/' + this.state.filename}>Edit Component &rarr;</a>
              <a className="ml-30" href={'/components/list'}>List Components &rarr;</a>
            </div>

            <div className="panel-group" id="accordion">
              <div className="panel panel-default">
                <div className="panel-heading accordion-toggle" data-toggle="collapse" data-parent="#accordion" data-target="#componentName">
                  <h4 className="panel-title">Component Name</h4>
                </div>
                <div id="componentName" className="panel-collapse collapse show">
                  <div className="panel-body">
                    <p>{this.state.componentName}</p>
                  </div>
                </div>
              </div>

              <div className="panel panel-default">
                <div className="panel-heading accordion-toggle" data-toggle="collapse" data-parent="#accordion" data-target="#componentProps">
                  <h4 className="panel-title">Component Props</h4>
                </div>
                <div id="componentProps" className="panel-collapse collapse show">
                  <div className="panel-body">
                    {Object.keys(this.state.componentProps).map(name => {
                      return <span>
                        <p><strong title="Props Name">{name}</strong> => <span title="Prop Value">{this.state.componentProps[name]}</span></p>
                         </span>
                    })}
                  </div>
                </div>
              </div>

              <div className="panel panel-default">
                <div className="panel-heading accordion-toggle collapsed" data-toggle="collapse" data-parent="#accordion" data-target="#codeViewer">
                  <h4 className="panel-title">Component Code</h4>
                </div>
                <div id="codeViewer" className="panel-collapse collapse">
                  <div className="panel-body">
                    <SyntaxHighlighter language='javascript' style={docco}>{this.state.content}</SyntaxHighlighter>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )
    }
}