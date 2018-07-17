import React, {Component} from 'react';
import PropTypes from 'prop-types';
import logo from '../../../assets/image/logo.svg';
import './index.css';

export default class Layout extends Component {
    static propTypes = {
        appTitle: PropTypes.string
    };

    static defaultProps = {
        appTitle: 'Welcome to React'
    };

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">{this.props.appTitle}</h1>
                </header>
                {this.props.children}
            </div>
        )
    }
}