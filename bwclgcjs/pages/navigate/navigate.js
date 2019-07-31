Page({

    /**
     * 页面的初始数据
     */
    data: {
        index: 0,
        url: 'https://www.isourcetree.com',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        let index = options.index;
        if (index == 3) {
            this.setData({
                url: 'https://wap.isourcetree.com/product?id=13'
            })
        } else if (index == 5) {
            this.setData({
                url: 'https://wap.isourcetree.com/product?id=1'
            })
        } else if (index == 1) {
            this.setData({
                url: 'https://www.cdshuowu.com/Mobile/Show/index.html?e=CASnamiqiningjiao&id=22'

            })
        } else if (index == 0) {
            this.setData({
              url: 'https://www.cdshuowu.com/Mobile/Show/index.html?e=CASnamiqiningjiao&id=177'

            })
        } else if (index == 2) {
            this.setData({
                url: 'https://wap.isourcetree.com/product?id=47'
            })
        } else {
            this.setData({
                url: 'https://www.isourcetree.com'
            })
        }
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

    }
})