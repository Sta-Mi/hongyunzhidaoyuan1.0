Page({
  data: {
    locations: [
      { id: 1, name: ' <  武汉-', storyName: '"江城"的故事  > ' },
      { id: 2, name: ' <  南昌-', storyName: '"洪都"的故事  > ' },
      { id: 3, name: ' <  荆州-', storyName: '"江陵"的故事  > ' },
      // 添加更多地点和故事名称
    ],currentindex:0
  },

  navigateToStory1: function() {
    wx.navigateTo({
      url: '/pages/story1/story1' // 假设 story1 页面的路径是 /pages/story1/story1
    });
  },

  navigateToStory2: function() {
    wx.navigateTo({
      url: '/pages/南昌/story2-1/story2-1' // 跳转页面 /pages/story2/story2
    });
  },
  navigateToStory3: function() {
    wx.navigateTo({
      url: '/pages/荆州/story3-1/story3-1' // 跳转story1 页面/pages/story1/story1
    });
  }
});
