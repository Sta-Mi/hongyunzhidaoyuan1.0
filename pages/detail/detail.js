Page({
    data: {
      name: '',
      city: '',
      longitude: 0,
      latitude: 0,
      attractions: [], // 存储城市中的所有景点
      markers: [], // markers 数组
      currentAttraction: null // 新增：当前选中的景点
    },
  
    onLoad: function (options) {
      const longitude = this.getLongitude(options.city);
      const latitude = this.getLatitude(options.city);
      const attractions = this.getAttractions(options.city);
      
      // 找到当前选中的景点
      const current = attractions.find(item => item.name === options.name);
      
      // 过滤掉当前景点，确保其他景点列表不包含当前景点
      const otherAttractions = attractions.filter(item => item.name !== options.name);
      
      this.setData({
        name: options.name,
        city: options.city,
        longitude: longitude,
        latitude: latitude,
        attractions: otherAttractions,  // 使用过滤后的景点列表
        currentAttraction: current,     // 设置当前景点
        markers: [{
          latitude: latitude,
          longitude: longitude,
          name: options.name,
          id: 1
        }]
      });

      // 调试用：打印当前景点信息
      console.log('Current Attraction:', current);
      console.log('Other Attractions:', otherAttractions);
    },
  
    getLongitude(city) {
      // 根据城市名称返回对应的经度
      const locations = {
        "武汉": 114.3055,
        "黄冈": 114.8738,
        "六安": 116.5051,
        "宜昌": 111.2862,
        "荆州": 112.2390
      };
      return locations[city] || 0; // 如果城市不存在，返回0
    },
  
    getLatitude(city) {
      // 根据城市名称返回对应的纬度
      const locations = {
        "武汉": 30.5931,
        "黄冈": 30.4460,
        "六安": 31.7572,
        "宜昌": 30.6973,
        "荆州": 30.3465
      };
      return locations[city] || 0; // 如果城市不存在，返回0
    },
  
    getAttractions(city) {
      // 根据城市名称返回该城市的所有景点
      const attractionsData = {
        "武汉": [
          { 
            name: "武汉八七会议纪念馆", 
            longitude: 114.3055, 
            latitude: 30.5931,
            imageUrl: "/images/attractions/武汉.png"
          },
          { 
            name: "湖北省博物馆", 
            longitude: 114.3650, 
            latitude: 30.5702,
            imageUrl: "/images/attractions/武汉.png"
          },
          { 
            name: "武汉美术馆", 
            longitude: 114.3050, 
            latitude: 30.5411,
            imageUrl: "/images/attractions/武汉.png"
          },
          { 
            name: "湖北省图书馆", 
            longitude: 114.3033, 
            latitude: 30.5931,
            imageUrl: "/images/attractions/武汉.png"
          },
          { 
            name: "武汉群众艺术馆", 
            longitude: 114.3070, 
            latitude: 30.5405,
            imageUrl: "/images/attractions/武汉.png"
          }
        ],
        "黄冈": [
          { 
            name: "黄麻起义和鄂豫皖苏区革命烈士纪念馆", 
            longitude: 114.8738, 
            latitude: 30.4460,
            imageUrl: "/images/attractions/黄冈.png"
          },
          { 
            name: "红安革命烈士陵园", 
            longitude: 114.2985, 
            latitude: 31.0574,
            imageUrl: "/images/attractions/黄冈.png"
          }
        ],
        "六安": [
          { 
            name: "大别山红色文化展览馆", 
            longitude: 116.5051, 
            latitude: 31.7572,
            imageUrl: "/images/attractions/六安.png"
          }
        ],
        "宜昌": [
          { 
            name: "宜昌革命烈士陵园", 
            longitude: 111.2862, 
            latitude: 30.6973,
            imageUrl: "/images/attractions/宜昌.png"
          }
        ],
        "荆州": [
          { 
            name: "荆州博物馆", 
            longitude: 112.2390, 
            latitude: 30.3465,
            imageUrl: "/images/attractions/荆州.png"
          }
        ]
      };
      return attractionsData[city] || []; // 如果城市不存在，返回空数组
    },
  
    imageError: function(e) {
      console.error('Image loading error:', e);
      wx.showToast({
        title: '图片加载失败',
        icon: 'none'
      });
    }
  });
  