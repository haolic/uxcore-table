import expect from 'expect.js';
import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
// import sinon from 'sinon';

import Table from '../src';
import { promise } from 'when';

Enzyme.configure({ adapter: new Adapter() });

const common = {
  jsxcolumns: [
    { dataKey: 'id', title: 'ID', width: 50, hidden: true },
    { dataKey: 'country', title: '国家', width: 200, ordered: true },
    { dataKey: 'city', title: '城市', width: 150, ordered: true },
    { dataKey: 'firstName', title: 'FristName' },
  ],
  jsxdata: {
    data: [
      {
        check: true,
        id: '1',
        grade: 'grade1',
        email: 'email',
        firstName: 'firstName1',
        lastName: 'lastName1',
        birthDate: 'birthDate1',
        country: '086156529655931.121(xsxs)',
        city: '87181',
        data: [
          {
            id: '11',
            radio: true,
            grade: '2grade2',
            email: '2email2',
            firstName: '2firstName2',
            lastName: '2lastName2',
            birthDate: '2birthDate2',
            country: '2country2',
            city: '2city2',
            data: [
              {
                id: '21',
                radio: true,
                grade: '3grade2',
                email: '3email2',
                firstName: '3firstName2',
                lastName: '3lastName2',
                birthDate: '3birthDate2',
                country: '3country2',
                city: '3city2',
                data: [
                  {
                    id: '31',
                    grade: '3grade2',
                    email: '3email2',
                    firstName: '3firstName2',
                    lastName: '3lastName2',
                    birthDate: '3birthDate2',
                    country: '3country2',
                    city: '3city2',
                  },
                ],
              },
            ],
          },
          {
            id: '12',
            check: true,
            grade: '2grade3',
            email: '2email3',
            firstName: '2firstName3',
            lastName: '2lastName3',
            birthDate: '2birthDate3',
            country: '2country3',
            city: '2city3',
          },
          {
            id: '13',
            check: true,
            grade: '2grade3',
            email: '2email3',
            firstName: '2firstName3',
            lastName: '2lastName3',
            birthDate: '2birthDate3',
            country: '2country3',
            city: '2city3',
            data: [
              {
                id: '21',
                radio: true,
                grade: '3grade2',
                email: '3email2',
                firstName: '3firstName2',
                lastName: '3lastName2',
                birthDate: '3birthDate2',
                country: '3country2',
                city: '3city2',
              },
              {
                id: '21',
                radio: true,
                grade: '3grade2',
                email: '3email2',
                firstName: '3firstName2',
                lastName: '3lastName2',
                birthDate: '3birthDate2',
                country: '3country2',
                city: '3city2',
              },
            ],
          },
        ],
      }, {
        check: false,
        id: '2',
        grade: 'grade2',
        email: 'email',
        firstName: 'firstName1',
        lastName: 'lastName1',
        birthDate: 'birthDate1',
        country: '086156529655931.121(xsxs)',
        city: '87181',
        data: [],
      },
    ],
    currentPage: 1,
    totalCount: 30,
  },
};

const addedContent = {
  data: [
    {
      id: '3',
      grade: 'grade2',
      email: 'email',
      firstName: 'firstName1',
      lastName: 'lastName1',
      birthDate: 'birthDate1',
      country: '086156529655931.121(xsxs)',
      city: '9527',
    },
  ],
};

function loadTreeDataWithSync() {
  return addedContent;
}

function loadTreeDataWithAsync() {
  return Promise.resolve(addedContent);
}

describe('Tree', () => {
  let wrapper;
  it('props renderModel', () => {
    wrapper = mount(
      <Table {...common} renderModel="tree" />
    );
    expect(wrapper.find('.kuma-uxtable-expand-icon').length).not.to.be(0);
  });

  it('props levels', () => {
    wrapper = mount(
      <Table {...common} renderModel="tree" levels={1} />
    );
    expect(wrapper.find('.kuma-uxtable-expand-icon .kuma-icon').at(0).hasClass('expanded')).to.be(true);
  });

  it('rowSelection onSelect', (done) => {
    wrapper = mount(
      <Table
        {...common}
        renderModel="tree"
        rowSelection={{
          onSelect: (record, selected, selectedRows) => {
            expect(record).to.be(true);
            expect(selected.id).to.be('1');
            expect(selectedRows).to.have.length(8);
            done();
          },
        }}
      />
    );
    wrapper.find('.kuma-uxtable-row .kuma-checkbox').at(0).instance().checked = true;
    wrapper.find('.kuma-uxtable-row .kuma-checkbox').at(0).simulate('change');
  });

  it('should be able to toggle tree', () => {
    wrapper = mount(
      <Table {...common} renderModel="tree" levels={1} />
    );
    wrapper.find('.kuma-uxtable-row .kuma-uxtable-expand-icon').at(0).simulate('change');
    expect(wrapper.find('.kuma-uxtable-row .kuma-uxtable-tree-row').length).not.to.be(0);
  });

  it('should asynchronous add remote row to toggle tree ', () => {
    wrapper = mount(
      <Table {...common} loadTreeData={loadTreeDataWithAsync} renderModel="tree" levels={0} />
    );
    const rowLength = wrapper.find('.kuma-uxtable-row').length;
    wrapper.find('.kuma-icon .kuma-icon-triangle-right').at(4).simulate('click');
    setTimeout(() => {
      expect(wrapper.find('.kuma-uxtable-row').length).to.be(rowLength + 1);
    });
  });

  it('should synchronous add remote row to toggle tree', () => {
    wrapper = mount(
      <Table {...common} loadTreeData={loadTreeDataWithSync} renderModel="tree" levels={0} />
    );
    const rowLength = wrapper.find('.kuma-uxtable-row').length;
    wrapper.find('.kuma-icon .kuma-icon-triangle-right').at(4).simulate('click');
    expect(wrapper.find('.kuma-uxtable-row').length).to.be(rowLength + 1);
  });
});

