Page({  
  data: {  
    imageSrc: null,  
    timestamp: null  
  },  
  
  takePhoto: function() {  
    const that = this;  

    wx.chooseImage({  
      count: 1,  
      sizeType: ['original', 'compressed'],  
      sourceType: ['camera'],  
      success: function(res) {  
        const tempFilePath = res.tempFilePaths[0];  
        const currentTime = new Date().toLocaleString(); // 获取当前时间  

        that.setData({  
          imageSrc: tempFilePath,  
          timestamp: currentTime // 设置时间戳  
        });  
      },  
      fail: function(err) {  
        console.error('选择图片失败', err);  
      }  
    });  
  },  

  uploadPhoto: function() {  
    wx.navigateTo({  
      url: '/pages/result-photo/result-photo?imageSrc=' + this.data.imageSrc + '&timestamp=' + this.data.timestamp  
    });  
  },  

  clearPhoto: function() {  
    this.setData({  
      imageSrc: null,  
      timestamp: null // 清除照片和时间戳  
    });  
    wx.showToast({  
      title: '照片已清除',  
      icon: 'success',  
      duration: 2000  
    });  
  }  
});