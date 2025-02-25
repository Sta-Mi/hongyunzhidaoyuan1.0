Page({  
    data: {  
      imageSrc: '',  
      timestamp: ''  
    },  
  
    onLoad: function(options) {  
      this.setData({  
        imageSrc: options.imageSrc,  
        timestamp: options.timestamp  
      });  
    },  
  
    clearPhoto: function() {  
      this.setData({  
        imageSrc: '',  
        timestamp: '' // 清除照片和时间戳  
      });  
      wx.showToast({  
        title: '照片已清除',  
        icon: 'success',  
        duration: 2000  
      });  
    },  
  
    goBack: function() {  
      wx.navigateBack();  
    }  
  });