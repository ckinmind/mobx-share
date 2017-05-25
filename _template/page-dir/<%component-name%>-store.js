import {observable, action} from 'mobx'

export default class <%ComponentName%>Store {
  // 被观察的属性
  @observable content = ''

  // 异步action示例
  @action getContent = () => {
    setTimeout(action('test action', () => {
      this.content = '从前有座山，山里有个庙，庙里有个缸，缸里有个盆，盆里有个碗，碗里有个豆，我吃了，你馋了，我的故事讲完了。'
    }), 1000)
  }

  // 同步action示例
  @action clearContent() {
    this.content = ''
  }
}
