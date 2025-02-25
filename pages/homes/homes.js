Page({
  data: {
    nickname: '',
    comment: '',
    imagePath: '',
    avatarPath: '/pages/assets/16.png', // 默认头像路径
    currentTime: '',
    array: ['黄鹤楼', '二七烈士纪念碑', '辛亥革命纪念馆'],
    index: null
  },
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  onLoad() {
    const date = new Date();
    const formattedTime = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
    this.setData({
      currentTime: formattedTime
    });

    // 获取昵称（从缓存中获取）
    const storedNickname = wx.getStorageSync('nickname');
    if (storedNickname) {
      this.setData({
        nickname: storedNickname
      });
    }
  },
  chooseImage() {//选择评论要上传的照片
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const tempFilePaths = res.tempFilePaths;
        this.setData({
          imagePath: tempFilePaths[0]
        });
      }
    });
  },
  onCommentInput(e) {
    this.setData({//输入评论
      comment: e.detail.value
    });
  },
  submitComment() {
    const comments = wx.getStorageSync('comments') || [];
    const selectedScenery = this.data.array[this.data.index];
    console.log(selectedScenery)
    comments.push({
      comment: this.data.comment,
      imagePath: this.data.imagePath,
      avatarPath: this.data.avatarPath,
      currentTime: this.data.currentTime,
      nickname: this.data.nickname, // 添加昵称到评论数据中
      scenery: selectedScenery // 添加景点信息到评论数据中
    });
    wx.setStorageSync('comments', comments);
    // 清空输入框和图片路径
    this.setData({
      comment: '',
      imagePath: '',
      index: null
    });
    wx.navigateTo({
      url: '/pages/comment/comment'
    });
  },
 goBack() {
    window.location.href = 'https://example.com/target-page';
}
});
