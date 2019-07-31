// pages/projectCount/projectCount.js
let selectToggle = require('../../utils/animate');
let mySelect = require('../../utils/animate');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        startIndex: "19",
        allIndex: "19",
        selectShow: false, //初始option不显示
        nowText: "", //初始内容
        animationData: {}, //右边箭头的动画
        errIndex: 1,
        error: false,
        err1: "请完整填写计算所需参数",
        err2: "请填写正确的计算参数",
        errValue: false,
        showdrxxName: '',
        hlc: "0.85",
        index: "", //下拉框选中的是第几个
        form: {
            et: "",
            ply: "",
            windSpeed: "",
            maxHotLoss: "",
            hlc: "0.85",
            meanTemp: "",
            hotcft: "",
            int: ""
        },
        itemTxtStart: [
            ["环境温度（（摄氏度(℃））", "et"],
            ["介质温度 (（摄氏度(℃）)", "ply"],
            ["风速 (米（m/s）)", "windSpeed"],
        ],
        itemTxt: [
            ["最大散热损失 (w/m2)", "maxHotLoss"],
            ["热损系数 ", "hlc"],
            ["平均温度 (摄氏度(℃）)", "meanTemp"],
            ["于大气的换热系数 (W/(m2.K))", "hotcft"],
        ],
        select: [
            ["../../image/select_two.png", "CAS-A0高性能铝镁质纤维保温毡", ""],
            ["../../image/select_two.png", "CAS-AIS高性能铝镁质纤维保温毡", ""],
            ["../../image/logo4_03_03.png", "ZYS-H0纳米孔复合绝热毡", ""],
            ["../../image/logo4_03_03.png", "ZYS-HI纳米孔复合绝热毡", ""],
            ["../../image/logo4_03_03.png", "硅酸铝棉毡", ""],
            ["../../image/logo4_03_03.png", "气凝胶毡", ""],
            ["../../image/logo4_03_03.png", "玻璃棉", ""],
            ["../../image/logo-txt_07.png", "岩棉", ""],
            ["../../image/logo-txt_07.png", "硅酸钙", ""]
        ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        console.log(Math.pow(3, 5));
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
    // 带星号的input框聚焦事件
    startFocus(e) {
        console.log("1index", e.currentTarget.dataset.index)
        this.setData({
            startIndex: e.currentTarget.dataset.index
        })
    },
    startBlur(e) {
        this.setData({
            startIndex: "19"
        })
    },
    test(value) {
        if (/^(\-|\+)?\d+(\.\d+)?$/.test(value)) {
            this.setData({
                errIndex: 1,
                error: false
            })
        } else {
            this.setData({
                errIndex: 0,
                error: true
            });
            wx.pageScrollTo({
                scrollTop: 0,
                duration: 300
            })
        }
    },
    startInput(e) {
        let value = parseFloat(e.detail.value);
        let index = e.currentTarget.dataset.index;
        if (index == 0) {
            this.test(value);
            this.setData({
                form: {
                    ...this.data.form,
                    et: value,
                }
            })
        } else if (index == 1) {
            this.test(value);
            this.setData({
                form: {
                    ...this.data.form,
                    ply: value
                }
            })
        } else if (index == 2) {
            this.test(value);
            this.setData({
                form: {
                    ...this.data.form,
                    windSpeed: value
                }
            })
        }
        let et = this.data.form.et;
        let ply = this.data.form.ply;
        let windSpeed = (this.data.form.windSpeed).toString();
        if (et && ply && windSpeed) {
            let windSpeed2 = parseFloat(this.data.form.windSpeed);
            let maxHotLoss = (3.8742 * (Math.pow(ply, 0.6614))).toFixed(0);
            let meanTemp = (0.514 * ply + et).toFixed(2);
            let hotcft = (11.63 + 7 * (Math.pow(windSpeed2, 0.5))).toFixed(3); //于大气的换热系数
            //导热系数
            let heatcc1Small = (0.056 + (0.0002 * (meanTemp - 70))).toFixed(4); //平均温度小于400的硅酸铝制品导热系数
            let heatcc1Big = (0.122 + (0.00036 * (meanTemp - 400))).toFixed(4); //平均温度大于400的硅酸铝制品导热系数
            let heatcc1 = (0.0000003 * Math.pow(meanTemp, 2) + 0.00003 * meanTemp + 0.0303).toFixed(4);
            let heatcc2 = (0.0000003 * Math.pow(meanTemp, 2) + 0.00004 * meanTemp + 0.0332).toFixed(4);
            let heatcc3 = (0.0000003 * Math.pow(meanTemp, 2) + 0.00003 * meanTemp + 0.0321).toFixed(4);
            let heatcc4 = (0.0000003 * Math.pow(meanTemp, 2) + 0.00004 * meanTemp + 0.0355).toFixed(4);
            let heatcc6 = (2 * Math.pow(10, -7) * Math.pow(meanTemp, 2) + 3 * Math.pow(10, -5) * meanTemp + 0.0217).toFixed(4);
            let heatcc7 = (0.033 + (0.00023 * meanTemp)).toFixed(4);
            let heatcc8 = (0.033 + (0.00018 * meanTemp)).toFixed(4);
            let heatcc9 = (0.0475 + (0.000102 * meanTemp)).toFixed(4);
            if (meanTemp < 400) {
                this.setData({
                    'select[4][2]': heatcc1Small
                })
            } else if (meanTemp > 400) {
                this.setData({
                    'select[4][2]': heatcc1Big
                })
            }
            this.setData({
                form: {
                    ...this.data.form,
                    maxHotLoss,
                    meanTemp,
                    hotcft,
                },
                'select[0][2]': heatcc1,
                'select[1][2]': heatcc2,
                'select[2][2]': heatcc3,
                'select[3][2]': heatcc4,
                'select[5][2]': heatcc6,
                'select[6][2]': heatcc7,
                'select[7][2]': heatcc8,
                'select[8][2]': heatcc9
            })
        } else {
            this.setData({
                form: {
                    ...this.data.form,
                    maxHotLoss: "",
                    meanTemp: "",
                    hotcft: ""
                }
            })
        }
    },
    // 普通文本框聚焦事件
    focus(e) {
        this.setData({
            allIndex: e.currentTarget.dataset.index
        })
    },
    blur(e) {
        this.setData({
            allIndex: "19"
        })
    },
    bindInput(e) {
        let value = parseFloat(e.detail.value);
        let index = e.currentTarget.dataset.index;
        if (index == 1) {
            this.test(value);
            if (value >= 0.5 && value <= 0.9) {
                this.setData({
                    errValue: false,
                    form: {
                        ...this.data.form,
                        hlc: value
                    }
                })
            } else {
                this.setData({
                    errValue: true,
                })
            }
        }
        let hlc = this.data.form.hlc;

    },
    selectInput(e) {
        let value = e.detail.value;
        if (value) {
            this.test(value);
            this.setData({
                nowText: e.detail.value
            });
        } else {
            this.setData({
                error: true,
            });
            wx.pageScrollTo({
                scrollTop: 0,
                duration: 300
            })
        }
    },
    //option的显示与否
    selectToggle: function() {
        let that = this;
        selectToggle.selectToggle(this.data.selectShow, that)
    },
    // var nowShow = this.data.selectShow; //获取当前option显示的状态
    // //创建动画
    // var animation = wx.createAnimation({
    //     timingFunction: "ease"
    // })
    // this.animation = animation;
    // if (nowShow) {
    //     animation.rotate(0).step();
    //     this.setData({
    //         animationData: animation.export()
    //     })
    // } else {
    //     animation.rotate(180).step();
    //     this.setData({
    //         animationData: animation.export()
    //     })
    // }
    // this.setData({
    //     selectShow: !this.data.selectShow
    // })
    //设置内容
    mySelect(e) {
        let that = this;
        mySelect.mySelect(e, that)
    },
    // var index = e.currentTarget.dataset.index;
    // let select = this.data.select;
    // this.animation.rotate(0).step(); //再次执行动画
    // this.setData({
    //     index: index,
    //     nowText: select[index][2],
    //     selectShow: false,
    //     animationData: this.animation.export(),
    //     showdrxxName: select[index][1]
    // });
    submit(e) {
        let et = this.data.form.et; //3
        let ply = this.data.form.ply; //44
        let maxHotLoss = parseInt(this.data.form.maxHotLoss); //6
        let hlc = this.data.form.hlc; //7
        let hotcft = parseFloat(this.data.form.hotcft); //9
        let nowText = parseFloat(this.data.nowText);
        if (maxHotLoss && hlc && hotcft && nowText) {
            let int = (1000 * (nowText * ((ply - et) / (maxHotLoss * hlc) - 1 / hotcft))).toFixed(0);
            this.setData({
                error: false,
                form: {
                    ...this.data.form,
                    int
                }
            })

        } else {
            this.setData({
                error: true,
                form: {
                    ...this.data.form,
                    int: ""
                }
            });
            wx.pageScrollTo({
                scrollTop: 0,
                duration: 300
            })

        }
    },
    give() {
        wx.navigateTo({
            url: '../playTour/playTour'
        })
    },
    close() {
        this.setData({
            error: false
        })
    },
    detail() {
        wx.navigateTo({
            url: '../navigate/navigate?index=' + this.data.index
        })
    }
})