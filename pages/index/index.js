const app = getApp()

Page({
  data: {
    filterTypes: [
      { id: 'historical', name: '历史时期' },
      { id: 'exhibition', name: '展厅性质' },
      { id: 'region', name: '省份地区' }
    ],
    loading: false,
    pageNum: 1,
    hasMore: true
  },

  onLoad() {
    this.getScenicList()
  },

  onShow() {
    // 从全局数据更新本地数据
    this.setData({
      scenicList: app.globalData.scenicList,
      filteredList: app.globalData.filteredList,
      filterActive: app.globalData.filterActive
    })
  },

  // 下拉刷新
  onPullDownRefresh() {
    this.setData({
      pageNum: 1,
      scenicList: [],
      hasMore: true
    })
    this.getScenicList().then(() => {
      wx.stopPullDownRefresh()
    })
  },

  // 上拉加载更多
  onReachBottom() {
    if (this.data.hasMore && !this.data.loading) {
      this.setData({
        pageNum: this.data.pageNum + 1
      })
      this.getScenicList()
    }
  },

  async getScenicList() {
    if (this.data.loading) return
    
    this.setData({ loading: true })
    try {
      const res = await new Promise(resolve => {
        setTimeout(() => {
          resolve({
            list: [
              // 红色旅游景点
              {
                id: '1',
                name: '武汉八七会议会址纪念馆',
                description: '中国共产党历史上具有重要转折意义的八七会议旧址，是全国重点文物保护单位',
                fullDescription: `1927年8月7日，中共中央在此召开紧急会议，确定了"土地革命和武装反抗国民党反动派的总方针"。会址位于武汉市江岸区中山大道，原建筑为汉口商业储蓄银行旧址。
                \n主要展区包括：八七会议史实陈列、馆藏文物展示、多媒体互动体验区等。`,
                imageUrl: '/images/scenic/bq.jpg',
                period: '大革命时期',
                type: '纪念馆',
                region: '武汉市',
                address: '湖北省武汉市江岸区中山大道1277号',
                openTime: '9:00-17:00（16:30停止入场）',
                ticket: '免费开放，需要提前预约',
                traffic: '公交：1路、10路、25路等到八七会议会址站\n地铁：1号线到黄浦路站D出口步行300米',
                facilities: ['讲解服务', '无障碍设施', '休息区', '纪念品商店']
              },
              {
                id: '2',
                name: '红安革命烈士陵园',
                description: '鄂豫皖苏区革命烈士陵园，是全国爱国主义教育示范基地',
                fullDescription: `红安革命烈士陵园是全国重点烈士纪念建筑物保护单位，位于红安县城北郊。这里长眠着包括许继慎、李德生等在内的128位革命烈士。
                \n陵园内设有纪念馆、烈士事迹展览馆、革命历史陈列馆等，全面展示了鄂豫皖革命根据地的光辉历史。`,
                imageUrl: '/images/scenic/ha.jpg',
                period: '土地革命',
                type: '陵园',
                region: '红安县',
                address: '湖北省红安县城关镇陵园大道特1号',
                openTime: '8:00-18:00',
                ticket: '免费开放',
                traffic: '可在红安汽车站乘坐公交车或出租车前往',
                facilities: ['免费讲解', '停车场', '休息区']
              },
              {
                id: '3',
                name: '黄麻起义和鄂豫皖苏区革命历史纪念馆',
                description: '展示黄麻起义和鄂豫皖苏区革命历史，是重要的革命教育基地',
                fullDescription: `黄麻起义是土地革命战争时期湖北地区最大规模的武装起义。纪念馆位于麻城市黄土岗镇，占地面积约50亩。
                \n馆内设有"星火燎原"、"浴血奋战"、"光辉历程"等主题展区，通过文物、图片、场景还原等多种形式，生动展现了鄂豫皖革命根据地的斗争历史。`,
                imageUrl: '/images/scenic/hm.jpg',
                period: '土地革命',
                type: '纪念馆',
                region: '麻城市',
                address: '湖北省麻城市黄土岗镇将军大道特1号',
                openTime: '9:00-17:00（16:30停止入场）',
                ticket: '免费开放',
                traffic: '在麻城市区可乘坐公交车或包车前往',
                facilities: ['专业讲解', '多媒体展示', '文创商店']
              },
              {
                id: '4',
                name: '大别山红色文化展览馆',
                description: '全面展示大别山革命根据地的光辉历史，是著名的红色文化教育基地',
                fullDescription: `大别山红色文化展览馆是全国爱国主义教育示范基地，位于红安县七里坪镇。馆内珍藏了大量珍贵的革命文物和历史资料。
                \n主要展区包括：大别山革命根据地历史陈列、革命英烈事迹展、革命文物陈列等。通过实物、图片、文献、场景复原等多种形式，全面展示了大别山革命根据地28年浴血奋战的光辉历史。同时设有红色文化体验区，让参观者更深入地了解革命历史。`,
                imageUrl: '/images/scenic/dbs.jpg',
                period: '土地革命',
                type: '展览馆',
                region: '红安县',
                address: '湖北省红安县七里坪镇将军路1号',
                openTime: '8:30-17:00',
                ticket: '免费开放，需要提前预约',
                traffic: '可在红安县城乘坐专线车前往',
                facilities: ['讲解服务', '影视厅', '资料查询', '休息区', '文化体验区']
              },
              {
                id: '5',
                name: '宜昌革命烈士陵园',
                description: '纪念在宜昌地区革命斗争中牺牲的革命烈士，是爱国主义教育基地',
                fullDescription: `宜昌革命烈士陵园始建于1954年，位于宜昌市西陵区，是湖北省重点烈士纪念建筑物保护单位。
                \n陵园内设有纪念碑、纪念堂、事迹陈列馆等，收集整理了大量革命历史文物和烈士事迹资料。陵园环境庄严肃穆，是开展爱国主义教育的重要场所。`,
                imageUrl: '/images/scenic/yc.jpg',
                period: '抗日战争',
                type: '陵园',
                region: '宜昌市',
                address: '湖北省宜昌市西陵区珍珠路18号',
                openTime: '8:00-18:00（17:30停止入场）',
                ticket: '免费开放',
                traffic: '公交：10路、14路到烈士陵园站\n的士：市区打车约15分钟',
                facilities: ['免费讲解', '停车场', '纪念堂', '献花处']
              },

              // 文化场馆
              {
                id: '6',
                name: '湖北省博物馆',
                description: '国家一级博物馆，珍藏曾侯乙编钟等重要文物，是湖北历史文化的重要展示窗口',
                fullDescription: `湖北省博物馆是国家一级博物馆，成立于1953年，位于武汉市武昌区东湖风景区内，是中国重要的历史艺术类博物馆之一。
                \n馆内最著名的镇馆之宝是曾侯乙编钟，此外还收藏有大量楚文化文物、青铜器等珍贵文物。主要展区包括：编钟馆、楚文化馆、青铜器馆、书画馆等。`,
                imageUrl: '/images/scenic/hbsbwg.jpg',
                period: '现代',
                type: '博物馆',
                region: '武汉市',
                address: '湖北省武汉市武昌区东湖路160号',
                openTime: '9:00-17:00（16:30停止入场）',
                ticket: '免费开放，需要提前预约',
                traffic: '公交：402路、411路到省博物馆站\n地铁：2号线东湖站D出口步行10分钟',
                facilities: ['讲解服务', '文创商店', '咖啡厅', '停车场', '无障碍设施']
              },
              {
                id: '7',
                name: '武汉美术馆',
                description: '华中地区重要的美术展览场馆，常年举办各类艺术展览，是市民艺术欣赏的重要场所',
                fullDescription: `武汉美术馆创建于1973年，是华中地区最重要的美术展览场馆之一。场馆位于武汉市江岸区，建筑风格现代简约。
                \n美术馆定期举办国内外重要艺术展览，设有常设展厅和临时展厅，展示内容包括中国画、油画、版画、雕塑等多种艺术形式。同时开展艺术教育活动，推广美术普及。`,
                imageUrl: '/images/scenic/whms.jpg',
                period: '现代',
                type: '艺术馆',
                region: '武汉市',
                address: '湖北省武汉市江岸区解放大道1号',
                openTime: '9:00-17:00（周一闭馆）',
                ticket: '免费开放',
                traffic: '公交：1路、25路到美术馆站\n地铁：3号线范湖站A出口步行5分钟',
                facilities: ['讲解服务', '艺术商店', '艺术图书馆', '休息区']
              },
              {
                id: '8',
                name: '湖北省图书馆',
                description: '湖北省最大的公共图书馆，是重要的文化教育和学习交流场所',
                fullDescription: `湖北省图书馆始建于1904年，是湖北省最大的公共图书馆。现馆址位于武汉市武昌区，建筑面积达8.8万平方米。
                \n图书馆藏书丰富，设有普通阅览室、古籍阅览室、数字阅览室等多个功能区。定期举办读书会、讲座、展览等文化活动，是市民终身学习的重要场所。`,
                imageUrl: '/images/scenic/hbstsg.jpg',
                period: '现代',
                type: '文化馆',
                region: '武汉市',
                address: '湖北省武汉市武昌区珞瑜路56号',
                openTime: '9:00-21:00（周五闭馆）',
                ticket: '免费开放，需要办理读者证',
                traffic: '公交：513路、518路到省图书馆站\n地铁：2号线中南路站D出口步行10分钟',
                facilities: ['阅览室', '自习室', '报告厅', '咖啡厅', 'WiFi']
              },
              {
                id: '9',
                name: '荆州博物馆',
                description: '以展示楚文化为特色的重要历史博物馆，珍藏大量楚国文物',
                fullDescription: `荆州博物馆创建于1958年，是国家一级博物馆，以收藏和展示楚文化文物为特色。馆内保存有大量出土自荆州地区的楚国文物。
                \n主要展区包括：楚文化陈列、荆州古城历史陈列、出土文物精品展等。其中漆木器、丝织品、青铜器等文物举世闻名。博物馆还原了楚国贵族生活场景，生动展现了楚文化的特色。`,
                imageUrl: '/images/scenic/jzbwg.jpg',
                period: '现代',
                type: '博物馆',
                region: '荆州市',
                address: '湖北省荆州市荆州区荆中路166号',
                openTime: '8:30-17:00（16:30停止入场）',
                ticket: '免费开放',
                traffic: '公交：1路、2路到博物馆站',
                facilities: ['专业讲解', '文创商店', '休息区', '停车场']
              },
              {
                id: '10',
                name: '武汉群众艺术馆',
                description: '武汉市重要的群众文化活动中心，常年开展各类文化艺术活动',
                fullDescription: `武汉群众艺术馆是武汉市重要的公共文化设施，致力于普及艺术教育和开展群众文化活动。
                \n场馆设有音乐厅、舞蹈室、美术室、非遗展示厅等多功能场所。定期举办各类艺术培训、展演活动，是市民参与文化活动的重要场所。同时也是武汉市非物质文化遗产的展示和传承基地。`,
                imageUrl: '/images/scenic/whqzysg.jpg',
                period: '现代',
                type: '艺术馆',
                region: '武汉市',
                address: '湖北省武汉市江汉区解放大道1277号',
                openTime: '9:00-17:30（周一闭馆）',
                ticket: '免费开放，部分活动需要报名',
                traffic: '公交：592路、593路到群艺馆站\n地铁：1号线循礼门站B出口步行8分钟',
                facilities: ['排练厅', '展览厅', '培训教室', '非遗工作室']
              }
            ],
            hasMore: false
          })
        }, 1000)
      })
      
      // 更新全局数据和本地数据
      app.globalData.scenicList = this.data.pageNum === 1 ? res.list : [...app.globalData.scenicList, ...res.list]
      this.setData({
        scenicList: app.globalData.scenicList,
        hasMore: res.hasMore
      })
    } catch (error) {
      wx.showToast({
        title: '加载失败',
        icon: 'none'
      })
    } finally {
      this.setData({ loading: false })
    }
  },

  // 跳转到筛选页面
  goToFilter(e) {
    const { type } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/filter/filter?type=${type}`
    })
  },

  // 跳转到搜索页面
  goToSearch() {
    wx.navigateTo({
      url: '/pages/search/search'
    });
  },

  // 跳转到反馈页面
  goToFeedback() {
    wx.navigateTo({
      url: '/pages/feedback/feedback'
    });
  },

  // 跳转到景区详情页面
  goToScenicDetail(e) {
    const scenicId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/scenic-detail/scenic-detail?id=${scenicId}`
    });
  },

  clearFilter() {
    // 清除全局和本地的筛选状态
    app.globalData.filteredList = []
    app.globalData.filterActive = false
    this.setData({
      filterActive: false,
      filteredList: []
    })
  }
}) 