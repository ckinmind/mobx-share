import {observable, action} from 'mobx'
import NattyFetch from 'natty-fetch'

export default class DemoStore {
    // 被观察的属性
    @observable content = ''

    // 异步action示例
    @action getContent = () => {
        setTimeout(action(() => {
            this.content = '考研成绩出来，很多群里炸开了锅，都在谈这事。结果有三种：毫无悬念地进复试、等待被调剂、没考上'
        }), 1000)
    }

    // 同步action示例
    @action clearContent() {
        this.content = ''
    }
}
