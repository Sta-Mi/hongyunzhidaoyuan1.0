Page({
  data: {
    locations: [
      { name: "黄麻起义和鄂豫皖苏区革命烈士纪念馆", city: "黄冈" },
      { name: "大别山红色文化展览馆", city: "六安" },
      { name: "武汉八七会议纪念馆", city: "武汉" },
      { name: "宜昌革命烈士陵园", city: "宜昌" },
      { name: "红安革命烈士陵园", city: "黄冈" },
      { name: "武汉群众艺术馆", city: "武汉" },
      { name: "湖北省博物馆", city: "武汉" },
      { name: "湖北省图书馆", city: "武汉" },
      { name: "荆州博物馆", city: "荆州" },
      { name: "武汉美术馆", city: "武汉" },
    ]
  },

  goToDetail: function (event) {
    const location = event.currentTarget.dataset.location;
    wx.navigateTo({
      url: `/pages/detail/detail?name=${location.name}&city=${location.city}`
    });
  },

  onLoad: function() {
    // 页面加载时执行
  }
});
