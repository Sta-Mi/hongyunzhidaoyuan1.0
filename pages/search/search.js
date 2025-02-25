const app = getApp()

Page({
  data: {
    keyword: '',
    searchHistory: [],
    searchResults: [],
    showHistory: true,
    loading: false
  },

  onLoad() {
    // 从本地存储获取搜索历史
    const history = wx.getStorageSync('searchHistory') || []
    this.setData({ searchHistory: history })
  },

  // 输入关键词
  onInput(e) {
    const keyword = e.detail.value.trim()
    this.setData({ 
      keyword,
      showHistory: !keyword
    })
    
    if (keyword) {
      this.search(keyword)
    } else {
      this.setData({ searchResults: [] })
    }
  },

  // 搜索功能
  search(keyword) {
    this.setData({ loading: true })
    
    // 从全局数据中搜索景点
    const results = app.globalData.scenicList.filter(scenic => {
      return (
        // 搜索名称
        scenic.name.includes(keyword) ||
        // 搜索类型
        scenic.type.includes(keyword) ||
        // 搜索地区
        scenic.region.includes(keyword) ||
        // 搜索时期
        scenic.period.includes(keyword) ||
        // 搜索描述
        scenic.description.includes(keyword)
      )
    })

    this.setData({ 
      searchResults: results,
      loading: false
    })
  },

  // 点击搜索历史
  onHistoryTap(e) {
    const keyword = e.currentTarget.dataset.keyword
    this.setData({ 
      keyword,
      showHistory: false
    })
    this.search(keyword)
  },

  // 清空搜索历史
  clearHistory() {
    wx.showModal({
      title: '提示',
      content: '确定要清空搜索历史吗？',
      success: (res) => {
        if (res.confirm) {
          wx.removeStorageSync('searchHistory')
          this.setData({ searchHistory: [] })
        }
      }
    })
  },

  // 保存搜索历史
  saveHistory(keyword) {
    let history = this.data.searchHistory
    // 去重
    history = history.filter(item => item !== keyword)
    // 新关键词放到最前面
    history.unshift(keyword)
    // 最多保存10条
    history = history.slice(0, 10)
    
    this.setData({ searchHistory: history })
    wx.setStorageSync('searchHistory', history)
  },

  // 确认搜索
  onSearch() {
    const keyword = this.data.keyword.trim()
    if (!keyword) {
      wx.showToast({
        title: '请输入搜索关键词',
        icon: 'none'
      })
      return
    }
    
    this.search(keyword)
    this.saveHistory(keyword)
  },

  // 点击搜索结果
  onResultTap(e) {
    const { id } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/scenic-detail/scenic-detail?id=${id}`
    })
  }
}) 