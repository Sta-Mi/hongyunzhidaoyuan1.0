Page({
  data: {
    content: '',
    contact: '',
    submitting: false,  // 添加提交状态
    contentCount: 0,    // 添加字数统计
    maxContent: 500     // 最大字数限制
  },

  // 输入内容
  onContentInput(e) {
    const content = e.detail.value
    this.setData({
      content,
      contentCount: content.length
    })
  },

  // 输入联系方式
  onContactInput(e) {
    this.setData({
      contact: e.detail.value
    })
  },

  // 表单验证
  validateForm() {
    if (!this.data.content.trim()) {
      wx.showToast({
        title: '请输入反馈内容',
        icon: 'none'
      })
      return false
    }
    if (this.data.content.length > this.data.maxContent) {
      wx.showToast({
        title: '反馈内容过长',
        icon: 'none'
      })
      return false
    }
    return true
  },

  // 提交反馈
  async submitFeedback() {
    if (this.data.submitting) return
    if (!this.validateForm()) return

    this.setData({ submitting: true })
    
    try {
      await new Promise(resolve => {
        setTimeout(resolve, 1500) // 模拟提交过程
      })

      wx.showToast({
        title: '提交成功',
        icon: 'success'
      })

      // 延迟返回上一页
      setTimeout(() => {
        wx.navigateBack()
      }, 1500)

    } catch (error) {
      wx.showToast({
        title: '提交失败，请重试',
        icon: 'none'
      })
    } finally {
      this.setData({ submitting: false })
    }
  }
}) 