import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import config from '../../../config';

$.DataTable = require('datatables.net');
$.fn.button = require('datatables.net-buttons');
require('datatables.net-responsive');
require('../../../../assets/css/datatable/datatables.css');

export default class ListComponents extends Component {
    componentDidMount() {
        let ajax_options = {
            url: config.apiHost + '/files',
            type: 'GET',
            method: 'GET',
            processData: true,
            dataSrc: 'recordsData',
            error: function (xhr, error, thrown) {
            }
        };

        let options = {
            dom: "lfBr" +
            "t" +
            "<'col-sm-6 col-xs-12 hidden-xs'i><'col-xs-12 col-sm-6'p>",
            retrieve: true,
            autoWidth: false,
            processing: true,
            serverSide: false,
            responsive: true,
            ajax: ajax_options,
            order: [[0, 'asc']],
            autoFill: true,
            columns: [
                {
                    data: "componentName",
                    responsivePriority: 1
                },
                {
                    data: "path",

                    responsivePriority: 2
                },
                {
                    data: "size",
                    responsivePriority: 4
                },
                {
                    data: "lastUpdated",
                    responsivePriority: 3
                },
                {
                    orderable: false,
                    data: null,
                    targets: -1,
                    responsivePriority: 5,
                    createdCell: function (cell, cellData) {
                        let name = cellData['filename'].replace(cellData['extname'], '');
                        const buttons = <div>
                            <button className={'btn btn-default btn-xs'}
                                    onClick={() => (document.location.href = '/components/view/' + name)}>View</button>
                            <button className={'btn btn-default btn-xs'} style={{marginLeft:'5px'}}
                                    onClick={() => (document.location.href = '/components/edit/' + name)}>Edit</button>
                        </div>
                        ReactDOM.render(buttons, cell);
                    },
                    render: function (data, type, full, meta) {
                      let name = data['filename'].replace(data['extname'], '');
                      return '<div>' +
                        '<a href ="/components/view/' + name + '">View</a>' +
                        '<a style="margin-left: 5px" href="/components/edit/' + name +'">Edit</a>' +
                        '</div>';
                    }
                }
            ],
            buttons: [
                {
                    text: 'Refresh',
                    titleAttr: 'Refresh all data',
                    action: function (e, dt, node, config) {
                        this.ajax.reload(null, false);
                    }
                }
            ]
        };
        $('#listComponent').DataTable(options);
    }

    render() {
        return (
            <div style={{padding: '30px'}}>
                <h3>List of Components</h3>
                <div style={{padding: '30px'}}>
                    <table id="listComponent" className="table display"  width="100%">
                        <thead>
                        <tr>
                            <th>Component Name</th>
                            <th>Path</th>
                            <th>Size</th>
                            <th>Last Updated</th>
                            <th></th>
                        </tr>
                        </thead>
                    </table>
                </div>
            </div>
        )
    }
}