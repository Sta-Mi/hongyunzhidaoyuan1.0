Page({
  data: {
    comments: [],
    showDelete: false,
    deleteIndex: null,
    isAdmin: false, // 假设这个值从某个地方获取，比如用户信息中
    nickname: '' ,// 新增一个数据字段来存储昵称
    array: ['黄鹤楼', '二七烈士纪念碑', '辛亥革命纪念馆'],
    index: null,
    currentTime: '',
    comment: '',
  },

  onLoad() {
    const comments = wx.getStorageSync('comments') || [];
    const nickname = wx.getStorageSync('nickname') || ''; // 从缓存中读取昵称
    this.setData({
      comments: comments,
      isAdmin: this.checkIfAdmin(nickname), // 检查是否是管理员的方法
      nickname: nickname // 设置昵称到data中
    });
  },

  checkIfAdmin(nickname) {
    // 这里只需要判断昵称是否为"管理员"
    return nickname === '管理员';
  },

  clearComments() {
    wx.showModal({
      title: '确认清空',
      content: '确定要清空所有评论和照片吗？',
      success: (res) => {
        if (res.confirm) {
          wx.setStorageSync('comments', []);
          this.setData({
            comments: []
          });
        }
      }
    });
  },

  showDeleteOptions(e) {
    const index = e.currentTarget.dataset.index;
    const commentToShow = this.data.comments[index];
    const currentUserNickname = this.data.nickname; // 从data中获取当前用户的昵称
    
    let options = [];
    
    if (this.data.isAdmin) {
      // 管理员只能删除
      options = [{ text: '删除', type: 'delete' }];
    } else if (commentToShow.nickname === currentUserNickname) {
      // 当前用户是评论的作者，可以删除和评论
      options = [
        { text: '删除', type: 'delete' },
        { text: '评论', type: 'comment' }
      ];
    } else {
      // 当前用户不是评论的作者，只能评论
      options = [{ text: '评论', type: 'comment' }];
    }
    
    this.setData({
      showDelete: true,
      deleteIndex: index,
      options: options // 将选项添加到data中
    });
  },

  hideDeleteOptions() {
    this.setData({
      showDelete: false,
      deleteIndex: null,
      options: [] // 清空选项
    });
  },

  deleteComment(e) {
    const index = e.currentTarget.dataset.index;
    const comments = this.data.comments;
    const currentUserNickname = this.data.nickname; // 从data中获取当前用户的昵称
    const commentToDelete = comments[index];
    
    if (this.data.isAdmin || commentToDelete.nickname === currentUserNickname) {
      comments.splice(index, 1);
      wx.setStorageSync('comments', comments);
      this.setData({
        comments: comments,
        showDelete: false,
        deleteIndex: null,
        options: [] // 清空选项
      });//只有评论的发布者和管理员可以删除这条评论
    } else {
      wx.showToast({
        title: '没有权限删除这条评论',
        icon: 'none'
      });
    }
  },

  addComment(e) {
    if (this.data.isAdmin) {
      wx.showToast({
        title: '管理员没有评论权限',
        icon: 'none'
      });
      return;
    }
    
    const index = e.currentTarget.dataset.index;
    const comments = this.data.comments;
    const currentUserNickname = this.data.nickname; // 从data中获取当前用户的昵称
    
    wx.showModal({
      title: '请输入您的评论',
      editable: true, // 允许输入框可编辑
      success: (res) => {
        if (res.confirm && res.content) {
          const newComment = {
            nickname: currentUserNickname, // 从data中获取当前用户的昵称
            comment: res.content, // 用户输入的评论内容
            currentTime: new Date().toLocaleString(),
            imagePath: "" ,// 如果需要添加图片路径，可以在这里处理
            scenery: this.data.array[this.data.index] // 获取选中的景点信息
          };
          comments.splice(index + 1, 0, newComment);
          wx.setStorageSync('comments', comments);
          this.setData({
            comments: comments
          });
        } else {
          wx.navigateBack(); // 如果用户取消输入，则返回上个页面
        }
      }
    });
  }
});
