import React from 'react'
import {observable, action, computed, extendObservable, toJS, isObservable} from 'mobx'
import {observer} from 'mobx-react'
import Markdown from '../markdown'
import { Table, Button, notification} from 'antd';


const columns = [{
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    width: '40%',
}, {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
    width: '30%',
}, {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
}];



let info = `

\`\`\`js
@observable isLoading = false;

    @observable isLoading = false;

    @observable  data = [
    {
        key: 1,
        name: 'John Brown sr.',
        age: 60,
        address: 'New York No. 1 Lake Park',
        children: [
            {
                key: 11,
                name: 'John Brown',
                age: 42,
                address: 'New York No. 2 Lake Park',
            }, {
                key: 12,
                name: 'John Brown jr.',
                age: 30,
                address: 'New York No. 3 Lake Park'
            }
        ]
    }, 
    { key: 2, name: 'Joe Black', age: 32, address: 'Sidney No. 1 Lake Park'},
    { key: 3, name: 'Jack Rose', age: 55, address: 'test', children: null}, 
    { key: 4, name: ' CKTest', age: 55, address: 'test'}
    ];


    handleClick1 = () => {
        setTimeout(()=>{
            let key = Math.random();
            this.data.push({
                key: key,
                name: 'CK-' + key,
                age: 26,
                address: 'Hang Zhou'
            });

            if(isObservable(this.data[this.data.length-1])){
                notification.success({message: '消息提示', description: '新增的数据是observable的'});
            }

        },200);
    };


    handleClick2 = () => {
        setTimeout(() => {
            let key = Math.random();
            // push 操作
        }, 200);
    };


    handleClick3 = () => {
        setTimeout(()=>{
            if(!Object.keys(this.data[1]).includes('children')){
                this.data[1].children = [];
            }else{
                let key = Math.random();
                // push操作
            }

        },200);
    };

    handleClick4 = () => {

        setTimeout(()=>{
            if (!Array.isArray(toJS(this.data[2].children))) {
                this.data[2].children = [];
            }else{
                let key = Math.random();
                // push操作
            }

        },200);
    };

    handleClick5 = () => {
        this.isLoading = true;
        setTimeout(()=>{
            if(!Object.keys(this.data[3]).includes('children')){
                this.data[3].children = [];
                this.isLoading = false;

            }else{
                let key = Math.random();
                // push操作
                this.isLoading = false;
            }

        },200);
    };




    render() {

        return (
          <div>
              <Table columns={columns}  dataSource={toJS(this.data)} loading={this.isLoading}/>
          </div>
        );
    }
\`\`\`

`;


@observer
class P5 extends React.Component {


    @observable isLoading = false;

    @observable  data = [{
        key: 1,
        name: 'John Brown sr.',
        age: 60,
        address: 'New York No. 1 Lake Park',
        children: [
            {
                key: 11,
                name: 'John Brown',
                age: 42,
                address: 'New York No. 2 Lake Park',
            }, {
                key: 12,
                name: 'John Brown jr.',
                age: 30,
                address: 'New York No. 3 Lake Park'
            }
        ]
    }, {
        key: 2,
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park'
    },{
        key: 3,
        name: 'Jack Rose',
        age: 55,
        address: 'test',
        children: null
    }, {
        key: 4,
        name: ' CKTest',
        age: 55,
        address: 'test'
    }];


    handleClick1 = () => {
        setTimeout(()=>{
            let key = Math.random();
            this.data.push({
                key: key,
                name: 'CK-' + key,
                age: 26,
                address: 'Hang Zhou'
            });

            if(isObservable(this.data[this.data.length-1])){
                notification.success({message: '消息提示', description: '新增的数据是observable的'});
            }

        },200);
    };


    handleClick2 = () => {
        setTimeout(() => {
            let key = Math.random();
            this.data[0].children.push({
                key: key,
                name: 'John Brown jr.' + key,
                age: 60,
                address: 'New York No. 3 Lake Park'
            });
            if (isObservable(this.data[0].children[this.data[0].children.length-1])) {
                notification.success({message: '消息提示', description: '新增的数据是observable的'});
            }

        }, 200);
    };


    handleClick3 = () => {
        setTimeout(()=>{
            if(!Object.keys(this.data[1]).includes('children')){
                this.data[1].children = [];

                if (isObservable(this.data[1].children)) {
                    notification.success({message: '消息提示', description: '新增的children属性是observable的'});
                }else{
                    notification.error({message: '消息提示', description: '新增的children属性不是observable的'});
                }

            }else{
                let key = Math.random();
                this.data[1].children.push({
                    key: key,
                    name: 'Joe Black-' + key,
                    age: 30,
                    address: 'New York No. 3 Lake Park'
                });

                if (isObservable(this.data[1].children[this.data[1].children.length-1])) {
                    notification.success({message: '消息提示', description: '新增的数据是observable的'});
                }else{
                    notification.error({message: '消息提示', description: '新增的数据不是observable的'});
                }

            }

        },200);
    };

    handleClick4 = () => {

        setTimeout(()=>{
            if (!Array.isArray(toJS(this.data[2].children))) {
                this.data[2].children = [];

                if (isObservable(this.data[2].children)) {
                    notification.success({message: '消息提示', description: '新增的children属性是observable的'});
                }else{
                    notification.error({message: '消息提示', description: '新增的children属性不是observable的'});
                }

            }else{
                let key = Math.random();
                this.data[2].children.push({
                    key: key,
                    name: 'Jack Rose-' + key,
                    age: 55,
                    address: 'test'
                });

                if (isObservable(this.data[2].children[this.data[2].children.length-1])) {
                    notification.success({message: '消息提示', description: '新增的数据是observable的'});
                }else{
                    notification.error({message: '消息提示', description: '新增的数据不是observable的'});
                }

            }

        },200);
    };

    handleClick5 = () => {
        this.isLoading = true;
        setTimeout(()=>{
            if(!Object.keys(this.data[3]).includes('children')){
                this.data[3].children = [];

                if (isObservable(this.data[3].children)) {
                    notification.success({message: '消息提示', description: '新增的children属性是observable的'});
                }else{
                    notification.error({message: '消息提示', description: '新增的children属性不是observable的'});
                }
                this.isLoading = false;

            }else{
                let key = Math.random();
                this.data[3].children.push({
                    key: key,
                    name: 'Joe Black-' + key,
                    age: 30,
                    address: 'New York No. 3 Lake Park'
                });

                if (isObservable(this.data[3].children[this.data[3].children.length-1])) {
                    notification.success({message: '消息提示', description: '新增的数据是observable的'});
                }else{
                    notification.error({message: '消息提示', description: '新增的数据不是observable的'});
                }

                this.isLoading = false;

            }

        },200);
    };




    render() {

        return (
          <div>
              <h1 style={{textAlign: 'center'}}>arrays</h1>
              <div id="p4">
              </div>
              <div style={{marginBottom: '20px'}}>
                  <Button onClick={this.handleClick1}>改变data</Button>
                  <Button onClick={this.handleClick2}>改变data[0].children</Button>
                  <Button onClick={this.handleClick3}>改变data[1]</Button>
                  <Button onClick={this.handleClick4}>改变data[2]</Button>
                  <Button onClick={this.handleClick4}>改变data[2]</Button>
                  <Button onClick={this.handleClick5}>改变data[3]</Button>
              </div>

              <Table columns={columns}  dataSource={toJS(this.data)} loading={this.isLoading}/>
              <Markdown source={info} />
          </div>
        );
    }
}

export default P5;