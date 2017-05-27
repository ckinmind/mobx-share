import {observable, action,computed} from 'mobx'

class store3 {

    @observable num = 8;

    num2 = 9;

    @computed get price(){
        return this.num * 100;
    }

    @computed get test(){
        return this.num2*100;
    }


}

export default new store3();
