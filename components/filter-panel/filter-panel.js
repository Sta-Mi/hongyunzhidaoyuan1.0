Component({
  properties: {
    options: Array,
    selectedItems: Array,
    animatingItem: String
  },

  methods: {
    isSelected(item) {
      return this.data.selectedItems.findIndex(i => i.id === item.id) > -1
    },

    handleSelect(e) {
      const item = e.currentTarget.dataset.item
      // 直接触发选择事件，不需要确认按钮
      this.triggerEvent('select', { item })
    }
  }
}) 