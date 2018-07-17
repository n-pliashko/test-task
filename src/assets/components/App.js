import React, { Component } from 'react'
import PropTypes from 'prop-types'

class AppMain extends Component {
  static propTypes = {
    appTitle: PropTypes.string
  }

  static defaultProps = {
    appTitle: 'Welcome to React',
    appIntro: 'To get started, edit <code>src/App.js</code> and save to reload.'
  }

  render () {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
            {this.props.appIntro}
        </p>
      </div>
    )
  }
}

export default AppMain
