import React, {Component} from 'react'
import './index.css'
import Layout from '../../components/layout'

export default class Welcome extends Component {
    render() {
        return (
            <Layout>
                <p className="App-intro">
                    <nav>
                        <ul>
                            <li>
                                <a href="/components/list" title="View list of components" className="text-align-center">
                                    List of components
                                </a>
                            </li>
                        </ul>
                    </nav>
                </p>
            </Layout>
        )
    }
}