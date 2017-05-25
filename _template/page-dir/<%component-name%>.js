import {Component} from 'react'
import {Button, Modal} from 'antd'
import {observable, action} from 'mobx'
import {observer} from 'mobx-react'
import <%ComponentName%>Store from './<%component-name%>-store'

const store = new <%ComponentName%>Store()

@observer
export default class <%ComponentName%> extends Component {
  @observable modalVisible = false
  constructor(props) {
    super(props)
  }
  render() {
    return <div className="<%component-name%>-page">

      {/* 通用头部 */}
      {/* ... */}

      {/* 页面主体区域 */}
      <div className="main">
        <div>Store示例：</div>
        <div>
          {
            store.content ?
            <div>
              <div>{store.content}</div>
              <Button onClick={() => store.clearContent()}>删除内容</Button>
            </div> :
            <Button onClick={() => store.getContent()}>加载内容</Button>
          }
        </div>

        <div>UI状态示例：</div>
        <Button onClick={() => this.openModal()}>打开浮层</Button>
        <Modal title="Basic Modal" visible={this.modalVisible} onOk={() => this.closeModal()} onCancel={() => this.closeModal()}>
          <p>some contents...</p>
          <p>some contents...</p>
          <p>some contents...</p>
        </Modal>

        <div>环境变量</div>
        <div>__DEV__: {'' + __DEV__}</div>
        <div>__PRODUCTION__: {'' + __PRODUCTION__}</div>
      </div>

      {/* 通用底部 */}
      {/* ... */}
    </div>
  }

  @action openModal() {
    this.modalVisible = true
  }

  @action closeModal() {
    this.modalVisible = false
  }
}
