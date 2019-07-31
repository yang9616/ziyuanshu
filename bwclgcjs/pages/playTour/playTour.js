let pay = require('../../utils/pay');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        showModalStatus: false,
        // value: "",
        hint: "",
        price: [1, 5, 10, 20, 66, 88, 188, 288, 666],
        key: "10",
        checkedPrice: "",
        code: "",
        userInfo: {},
        url: 'https://api.isourcetree.com/prepay'
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        //获取用户的code，和在本地取到用户的登录信息
        var that = this;
        wx.login({
            success: res => {
                // 获取到用户的 code 之后：res.code
                let code = res.code;
                wx.setStorage({
                    key: 'code',
                    data: code
                });
                wx.getStorage({
                    key: 'userInfo',
                    success: function(res) {
                        that.setData({
                            userInfo: res.data,
                            code: code
                        })
                    }
                });
            }
        });
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    },
    money(e) {
        this.setData({
            checkedPrice: e.detail.value
        })

    },
    powerDrawer: function(e) {
        var currentStatu = e.currentTarget.dataset.statu;
        this.setData({
            checkedPrice: ""
        })
        this.util(currentStatu)
    },
    sure(e) {
        let checkedPrice = this.data.checkedPrice;
        var currentStatu = e.currentTarget.dataset.statu;
        if (checkedPrice >= 0.01 && checkedPrice <= 1000) {
            this.paySure(checkedPrice).then(res => {
                if (res) {
                    this.util(currentStatu);
                    wx.showToast({
                        title: '支付成功',
                        duration: 2000,
                    });
                    setTimeout(function() {
                        wx.redirectTo({
                            url: '../honePage/honePage'
                        })
                    }, 2000);
                    //这里完成跳转
                }
            });
        } else {
            this.setData({
                hint: "请输入正确的金额！"
            });
        }
    },
    close(e) {
        var currentStatu = e.currentTarget.dataset.statu;
        this.util(currentStatu)
    },
    active(e, index) {
        let numIndex = e.currentTarget.dataset.index;
        let checkedPrice = this.data.price[numIndex];
        this.setData({
            key: numIndex,
            checkedPrice
        })
    },
    util: function(currentStatu) {
        /* 动画部分 */
        // 第1步：创建动画实例 
        var animation = wx.createAnimation({
            duration: 200, //动画时长
            timingFunction: "linear", //线性
            delay: 0 //0则不延迟
        });

        // 第2步：这个动画实例赋给当前的动画实例
        this.animation = animation;

        // 第3步：执行第一组动画
        animation.opacity(0).rotateX(-100).step();

        // 第4步：导出动画对象赋给数据对象储存
        this.setData({
            animationData: animation.export()
        })

        // 第5步：设置定时器到指定时候后，执行第二组动画
        setTimeout(function() {
            // 执行第二组动画
            animation.opacity(1).rotateX(0).step();
            // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象
            this.setData({
                    animationData: animation
                })
                //关闭
            if (currentStatu == "close") {
                this.setData({
                    showModalStatus: false
                });
            }
        }.bind(this), 200)

        // 显示
        if (currentStatu == "open") {
            this.setData({
                showModalStatus: true,
                hint: ""
            });
        }
    },
    paySure: function(price) {
        return new Promise((resolve, reject) => {
            wx.login({
                success: res => {
                    let userInfo = this.data.userInfo; //用户登录的所有信息
                    let nick_name = userInfo.nickName;
                    let avatar_url = userInfo.avatarUrl;
                    pay.pay(this.data.url, res.code, price, nick_name, avatar_url).then(res => {
                        resolve(res);
                    })
                }
            })

        })
    },
    submit(e) {
        var that = this;
        if (this.data.checkedPrice) {
            this.paySure(this.data.checkedPrice).then(res => {
                if (res) {
                    wx.showToast({
                        title: '支付成功',
                        duration: 2000,
                    });
                    setTimeout(function() {
                        wx.redirectTo({
                            url: '../honePage/honePage'
                        })
                    }, 2000);
                }
            })
        } else {
            wx.showModal({
                showCancel: false,
                title: "提示",
                content: "请选择打赏金额！"
            })
        }

    }
})