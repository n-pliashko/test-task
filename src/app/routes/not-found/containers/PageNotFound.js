import React, {Component} from 'react'
import Layout from '../../../components/layout'

export default class PageNotFound extends Component {
    render() {
        return (
            <Layout appTitle="Sorry, Page Not Found">
                <div style={{paddingTop: '10%'}}>
                    <a href="/">Go Home >></a>
                </div>
            </Layout>
        )
    }
}