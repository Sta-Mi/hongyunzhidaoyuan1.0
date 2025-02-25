Component({
  properties: {
    scenic: {
      type: Object,
      value: {}
    }
  },

  methods: {
    goToDetail() {
      const { id } = this.properties.scenic
      wx.navigateTo({
        url: `/pages/scenic-detail/scenic-detail?id=${id}`
      })
    }
  }
}) 