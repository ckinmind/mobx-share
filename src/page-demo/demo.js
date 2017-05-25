import {Component} from 'react'
import {Button, Modal} from 'antd'
import {observable, action} from 'mobx'
import {observer} from 'mobx-react'
import Head from '../head'
import DemoStore from './demo-store'

const store1 = new DemoStore()
const store2 = new DemoStore()

@observer
export default class Home extends Component {
    @observable modalVisible = false
    @observable aaa = false
    constructor(props) {
        super(props)
    }
    render() {
        return <div>
            <Head/>
            <div className="demo-main">
                <div>Store示例：</div>
                <div>
                    {
                        store1.content ?
                            <div>
                                <div>{store1.content}</div>
                                <Button onClick={() => store1.clearContent()}>删除内容1</Button>
                            </div> :
                            <Button onClick={() => store1.getContent()}>加载内容1</Button>
                    }
                </div>
                <div>
                    {
                        store2.content ?
                            <div>
                                <div>{store2.content}</div>
                                <Button onClick={() => store2.clearContent()}>删除内容2</Button>
                            </div> :
                            <Button onClick={() => store2.getContent()}>加载内容2</Button>
                    }
                </div>

                <div>UI状态示例：</div>
                <Button onClick={() => this.openModal()}>打开浮层</Button>
                {
                  this.modalVisible ? 
                  1111
                  : null 
                }
                <Modal title="Basic Modal" visible={this.modalVisible} onOk={() => this.closeModal()} onCancel={() => this.closeModal()}>
                    <p>some contents...</p>
                    <p>some contents...</p>
                    <p>some contents...</p>
                </Modal>

                <div>环境变量</div>
                <div>__DEV__: {'' + __DEV__}</div>
                <div>__PRODUCTION__: {'' + __PRODUCTION__}</div>

                <div className="box"></div>
            </div>
        </div>
    }

    @action openModal() {
        this.modalVisible = true
    }

    @action closeModal() {
        this.modalVisible = false
    }
}
