    //option的显示与否
    function selectToggle(selectShow, that) {
        var nowShow = selectShow; //获取当前option显示的状态
        //创建动画
        var animation = wx.createAnimation({
            timingFunction: "ease"
        })
        this.animation = animation;
        if (nowShow) {
            animation.rotate(0).step();
            that.setData({
                animationData: animation.export()
            })
        } else {
            animation.rotate(180).step();
            that.setData({
                animationData: animation.export()
            })
        }
        that.setData({
            selectShow: !that.data.selectShow
        })
    }

    function mySelect(e, that) {
        var index = e.currentTarget.dataset.index;
        let select = that.data.select;
        this.animation.rotate(0).step(); //再次执行动画
        that.setData({
            index,
            nowText: select[index][2],
            selectShow: false,
            animationData: this.animation.export(),
            showdrxxName: select[index][1]
        });
    }
    module.exports = {
        selectToggle: selectToggle,
        mySelect: mySelect
    }