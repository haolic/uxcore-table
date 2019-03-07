/**
 * Table Component Demo for uxcore
 * @author zhouquan.yezq
 *
 * Copyright 2014-2015, Uxcore Team, Alinw.
 * All rights reserved.
 */

import React from 'react';
import Table from '../src';
import Constants from 'uxcore-const';

import NattyFetch from 'natty-fetch';

const urlPrefix = window.urlPrefix || 'http://30.9.174.1:3000/';

function loadTreeData(rowData) {
  // const request = NattyFetch.create({
  //   method: 'GET',
  //   url: `${urlPrefix}demo/rowData.json`,
  //   data: '',
  //   Promise,
  // });
  // return request();
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        data: [
          {
            "id": `${setTimeout(0)}`,
            "radio": true,
            "grade": "2grade2",
            "email": "2email2",
            "firstName": "2firstName2",
            "lastName": "2lastName2",
            "birthDate": "2birthDate2",
            "country": "2country2",
            "city": "2city2",
            "data": []
          },
          {
            "id": `${setTimeout(0)}`,
            "check": true,
            "grade": "2grade3",
            "email": "2email3",
            "firstName": "2firstName3",
            "lastName": "2lastName3",
            "birthDate": "2birthDate3",
            "country": "2country3",
            "city": "2city3"
          }
        ]
      })
    }, 500)
  })
}

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    const columns = [
      {
        dataKey: 'id',
        title: 'ID',
        width: '50px',
        hidden: true,
      },
      {
        dataKey: 'country',
        title: '国家',
        width: '200px',
        ordered: true,
        align: 'left',
        type: 'money',
        delimiter: ',',
      },
      {
        dataKey: 'city',
        title: '城市',
        width: '150px',
      },
      {
        dataKey: 'firstName',
        title: 'FristName',
      },
      {
        dataKey: 'lastName',
        title: 'LastName',
      },
      {
        dataKey: 'email',
        title: 'Email',
        width: '200px',
        ordered: true,
      },
      {
        title: '操作',
        type: 'action',
        fixedRight: true,
        width: '300px',
        collapseNum: 5,
        actions: [
          {
            title: '新增',
            callback: (rowData) => {
              this.table.addSubRow({
                "id": `${setTimeout(0)}`,
                "check": true,
                "grade": "2grade3",
                "email": "2email",
                "firstName": "2firstName3",
                "lastName": "2lastName3",
                "birthDate": "2birthDate3",
                "country": `country_${setTimeout(0)}`,
                "city": "2city3"
              }, rowData.jsxid, () => {
                console.log(this.table.getData())
              })
            }
          },
          {
            title: '上移',
            callback: (rowData) => {
              this.table.moveRowUp(rowData);
            },
          },
          {
            title: '编辑',
            callback: (rowData) => {
              this.table.editRow(rowData);
            },
            mode: Constants.MODE.VIEW,
          },
          {
            title: '删除',
            callback: (rowData) => {
              this.table.delRow(rowData);
            },
          },
          {
            title: '下移',
            callback: (rowData) => { this.table.moveRowDown(rowData); },
          },
        ],
      },
    ];
    const renderProps = {
      height: '800px',
      width: '1000px',
      showSearch: true,
      levels: 0,
      fetchUrl: `${urlPrefix}demo/data.json`,
      loadTreeData,
      processData(data) {
        data.data.map(item => {
          item.data = []
        });
        return data
      },
      useListActionBar:true,
      actionBar: {
        buttons: [
          {
            title: '新增一行',
            callback: () => {
              this.table.addRowFromTop(
                {
                  "id": `${setTimeout(0)}`,
                  "check": true,
                  "grade": "2grade3",
                  "email": "2email",
                  "firstName": "2firstName3",
                  "lastName": "2lastName3",
                  "birthDate": "2birthDate3",
                  "country": `country_${setTimeout(0)}`,
                  "city": "2city3"
                }
              )
            }
          }
        ]
      },
      jsxcolumns: columns,
      renderModel: 'tree',
      toggleTreeExpandOnRowClick: true,
      rowSelection: {
        onSelect: (checked, selectedRow, selectedRows) => {
          console.log(checked, selectedRow, selectedRows);
        },
        onSelectAll: () => {},
      },
      ref: (c) => {
        this.table = c;
      },
    };
    return (<Table ref={c => {this.table = c}} {...renderProps} />);
  }
}

export default Demo;
