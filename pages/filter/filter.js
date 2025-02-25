const app = getApp()

Page({
  data: {
    filterOptions: {
      historical: [
        { id: 'revolution', name: '大革命时期' },
        { id: 'land', name: '土地革命' },
        { id: 'war', name: '抗日战争' },
        { id: 'modern', name: '现代' }
      ],
      exhibition: [
        { id: 'memorial', name: '纪念馆' },
        { id: 'cemetery', name: '陵园' },
        { id: 'museum', name: '博物馆' },
        { id: 'exhibition', name: '展览馆' },
        { id: 'art', name: '艺术馆' }
      ],
      region: [
        { id: 'wuhan', name: '武汉市' },
        { id: 'hongan', name: '红安县' },
        { id: 'macheng', name: '麻城市' },
        { id: 'yichang', name: '宜昌市' },
        { id: 'jingzhou', name: '荆州市' }
      ]
    },
    currentType: '',
    selectedItems: [],
    animatingItem: '',
    filterTitle: '',
    filterDesc: '',
    scenicList: []
  },

  onLoad(options) {
    const { type } = options
    let title = ''
    let desc = ''
    
    switch (type) {
      case 'historical':
        title = '历史时期'
        desc = '选择您感兴趣的历史时期，查看相关红色景点'
        break
      case 'exhibition':
        title = '展厅性质'
        desc = '根据展厅类型筛选，找到适合参观的场馆'
        break
      case 'region':
        title = '省份地区'
        desc = '选择地区，浏览当地特色红色景点'
        break
    }

    this.setData({ 
      currentType: type,
      filterTitle: title,
      filterDesc: desc,
      scenicList: app.globalData.scenicList
    })
  },

  handleSelect(e) {
    const item = e.currentTarget.dataset.item
    this.setData({
      selectedItems: [item]
    })
    this.filterScenic()
  },

  isSelected(item) {
    return this.data.selectedItems.findIndex(i => i.id === item.id) > -1
  },

  filterScenic() {
    try {
      let filteredList = []
      
      if (this.data.selectedItems.length > 0) {
        const selectedItem = this.data.selectedItems[0]
        
        filteredList = app.globalData.scenicList.filter(scenic => {
          switch (this.data.currentType) {
            case 'exhibition':
              return scenic.type === selectedItem.name
            case 'historical':
              return scenic.period === selectedItem.name
            case 'region':
              return scenic.region === selectedItem.name
            default:
              return false
          }
        })
      } else {
        filteredList = app.globalData.scenicList
      }

      console.log('Filtered list:', filteredList)

      this.setData({
        scenicList: filteredList
      })

    } catch (error) {
      console.error('Filter error:', error)
    }
  },

  resetFilter() {
    this.setData({ 
      selectedItems: [],
      scenicList: app.globalData.scenicList
    })
    app.globalData.filterActive = false
    app.globalData.filteredList = []
  },

  // 跳转到景点详情
  goToScenicDetail(e) {
    const { id } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/scenic-detail/scenic-detail?id=${id}`
    })
  }
}) 