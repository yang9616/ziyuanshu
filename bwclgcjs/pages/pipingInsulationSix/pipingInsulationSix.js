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
        nowText: "", //初始内容  86
        animationData: {}, //右边箭头的动画
        errIndex: 1,
        error: false,
        index: null,
        showdrxxName: '',
        err1: "请完整填写计算所需参数",
        err2: "请填写正确的计算参数",
        form: {
            et: "",
            ply: "",
            windSpeed: "",
            int: "",
            pipelineOuter: "",
            length: "",
            flow: "",
            heatcpt: "",
            crtFactor: "",

            meanTemp: "",

            terminalT1: "",
            terminalT2: ""

        },
        itemTxtStart: [
            ["环境温度（（摄氏度(℃））", "et"],
            ["介质温度 (（摄氏度(℃）)", "ply"],
            ["风速 (米（m/s）)", "windSpeed"],
            ["保温层厚度 (mm)", "int"],
            ["管道外径 (mm)", "pipelineOuter"],
            ["管线长度 (m)", " length"],
            ["介质流量 (kg/h)", "flow"],
            ["介质热容 (kj/kg.℃)", "heatcpt"],
            ["支吊架修正系数", "crtFactor"],
        ],
        itemTxt: [
            ["平均温度 (摄氏度(℃)", "meanTemp"], //85
        ],
        result: ["终端温度法一 （℃）", "终端温度法二 （℃）"],
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
        this.setData({
            startIndex: e.currentTarget.dataset.index
        })
    },
    startBlur(e) {
        this.setData({
            startIndex: "19"
        })
    },
    // 判断输入的值是否为数字
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
                    et: value
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
        } else if (index == 3) {
            this.test(value);
            this.setData({
                form: {
                    ...this.data.form,
                    int: value
                }
            })

        } else if (index == 4) {
            this.test(value);
            this.setData({
                form: {
                    ...this.data.form,
                    pipelineOuter: value
                }
            })
        } else if (index == 5) {
            this.test(value);
            this.setData({
                form: {
                    ...this.data.form,
                    length: value
                }
            })
        } else if (index == 6) {
            this.test(value);
            this.setData({
                form: {
                    ...this.data.form,
                    flow: value
                }
            })
        } else if (index == 7) {
            this.test(value);
            this.setData({
                form: {
                    ...this.data.form,
                    heatcpt: value
                }
            })
        } else if (index == 8) {
            this.test(value);
            this.setData({
                form: {
                    ...this.data.form,
                    crtFactor: value
                }
            })
        }

        let et = this.data.form.et;
        let ply = this.data.form.ply;
        let windSpeed = (this.data.form.windSpeed).toString();
        let int = this.data.form.int;
        let pipelineOuter = this.data.form.pipelineOuter;
        let length = this.data.form.length;
        let flow = this.data.form.flow;
        let heatcpt = this.data.form.heatcpt;
        let crtFactor = this.data.form.crtFactor;
        if (et && ply && windSpeed && int && pipelineOuter && flow && length && heatcpt && crtFactor) {
            let meanTemp = (0.514 * ply + et).toFixed(2);
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
                    meanTemp
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
                    meanTemp: "",
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
            this.setData({
                form: {
                    ...this.data.form,
                    crtFactor: value
                }
            })
        }
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
    //设置内容
    mySelect(e) {
        let that = this;
        mySelect.mySelect(e, that)
    },
    submit(e) {


        let et = this.data.form.et;
        let ply = this.data.form.ply;
        let int = this.data.form.int;
        let pipelineOuter = this.data.form.pipelineOuter;
        let length = this.data.form.length;
        let flow = this.data.form.flow;
        let heatcpt = this.data.form.heatcpt;
        let crtFactor = this.data.form.crtFactor;

        let nowText = parseFloat(this.data.nowText);
        let meanTemp = this.data.form.meanTemp;
        if (nowText && meanTemp) {
            let a = parseFloat((flow * heatcpt * Math.log((pipelineOuter + 2 * int) / pipelineOuter)).toFixed(5));
            let b = 11.3 * nowText * length * crtFactor;
            let n = 3.6 * length * 2 * 3.1416 * nowText;
            let m = flow * heatcpt * Math.log((pipelineOuter + int * 2) / pipelineOuter);
            let x = Math.log(ply - et) - n / m;
            let terminalT1 = (((a - b) * ply + 2 * b * et) / (b + a)).toFixed(1)
            let terminalT2 = (Math.exp(x) + et).toFixed(1);
            this.setData({
                error: false,
                form: {
                    ...this.data.form,
                    terminalT1,
                    terminalT2
                }
            })
        } else {
            this.setData({
                error: true,
                form: {
                    ...this.data.form,
                    terminalT1: "",
                    terminalT2: ""
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