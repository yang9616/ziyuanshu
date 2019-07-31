// pages/projectCount/projectCount.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        startIndex: "19",
        allIndex: "19",
        errIndex: 1,
        error: false,
        err1: "请完整填写计算所需参数",
        err2: "请填写正确的计算参数",
        form: {
            diameter: "",
            ply: "",
            dosage: "",
            num: "",
            mtlOnePrice: "",
            mtlPrice: "",
            mDosage: "",
            mOnePrice: "",
            mPrice: "",
            allPrice: "",
        },
        itemTxtStart: [
            ["管道直径 (毫米（mm）)", "diameter"],
            ["保温材料厚度 (毫米（mm）)", "ply"],
            ["保温长度 (米（m）)", "dosage"],

        ],
        itemTxt: [
            ["管道保温材料用料（（立方米(m³））", "num"],
            ["保温用外护层用量 (平方米（m²）)", "mDosage"],
            ["保温材料单价（元/立方米（m³））", "mtlOnePrice"],
            ["外护层单价 (元/平方米（元/m²）)", "mOnePrice"],
            ["保温材料造价 (元（¥）)", "mtlPrice"],
            ["外护层造价 (元（¥）)", "mPrice"],
            ["总造价 (元（¥）)", "allPrice"]
        ],
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
    onShow: function() {},

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
        let value = e.detail.value;
        let index = e.currentTarget.dataset.index;
        if (index == 0) {
            this.test(value);
            this.setData({
                form: {
                    ...this.data.form,
                    diameter: value
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
                    dosage: value
                }
            })
        }
        let diameter = parseInt(this.data.form.diameter);
        let ply = parseInt(this.data.form.ply);
        let dosage = parseFloat(this.data.form.dosage);
        if (diameter && ply && dosage) {
            let all = ((diameter + ply) * ply * 3.1416 * 0.000001 * dosage * 1.05).toFixed(4);
            let mDosage = ((diameter + ply * 2) / 1000 * 3.1416 * dosage * 1.25).toFixed(4);
            this.setData({
                form: {
                    ...this.data.form,
                    num: all,
                    mDosage
                }
            })
        } else {
            this.setData({
                form: {
                    ...this.data.form,
                    num: "",
                    mDosage: "",
                }
            })
        };
        let mtlOnePrice = parseInt(this.data.form.mtlOnePrice)
        let num = this.data.form.num;
        let mDosage = this.data.form.mDosage;
        let mOnePrice = parseInt(this.data.form.mOnePrice);
        if (mtlOnePrice && num && mDosage && mOnePrice) {
            this.count()
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
        let index = e.currentTarget.dataset.index;
        let value = e.detail.value;
        if (index == 2) {
            this.test(value);
            this.setData({
                form: {
                    ...this.data.form,
                    mtlOnePrice: value
                }
            })
        } else if (index == 3) {
            this.test(value);
            this.setData({
                form: {
                    ...this.data.form,
                    mOnePrice: value
                }
            })
        }
        let mtlOnePrice = parseInt(this.data.form.mtlOnePrice)
        let num = this.data.form.num;
        let mDosage = this.data.form.mDosage;
        let mOnePrice = parseInt(this.data.form.mOnePrice);
        if (mtlOnePrice && num && mDosage && mOnePrice) {
            this.count()
        }
    },
    // 计算方法
    count() {
        let mtlOnePrice = parseInt(this.data.form.mtlOnePrice)
        let num = this.data.form.num;
        let mDosage = this.data.form.mDosage;
        let mOnePrice = parseInt(this.data.form.mOnePrice);
        if (mtlOnePrice && num) {
            let mtlPrice = (mtlOnePrice * num).toFixed(2);
            this.setData({
                form: {
                    ...this.data.form,
                    mtlPrice
                }
            });
        } else {
            this.setData({
                form: {
                    ...this.data.form,
                    mtlPrice: ""
                }
            })
        }
        if (mDosage && mOnePrice) {
            let mPrice = (mDosage * mOnePrice).toFixed(2);
            this.setData({
                form: {
                    ...this.data.form,
                    mPrice
                }
            })
        } else {
            this.setData({
                form: {
                    ...this.data.form,
                    mPrice: ""
                }
            })
        }
    },
    submit(e) {
        let diameter = this.data.form.diameter;
        let ply = this.data.form.ply;
        let dosage = this.data.form.dosage;
        let mtlPrice = parseFloat(this.data.form.mtlPrice);
        let mPrice = parseFloat(this.data.form.mPrice);
        if (diameter && ply && dosage && mtlPrice && mPrice) {
            let allPrice = (mtlPrice + mPrice).toFixed(2);
            this.setData({
                error: false,
                form: {
                    ...this.data.form,
                    allPrice
                }
            })
        } else {
            this.setData({
                error: true
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
    }
})