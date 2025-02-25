import attractionsData from '../sceneTotalData'
import loginUser from '../loginUser'
import commentTotalData from '../commentTotalData'

const app = getApp()

Page({
  data: {
    loginUserNickName:'',
    scenicId: '',
    scenicDetail: null,
    loading: true,
    currentTab: 'intro', // intro, guide
    trackRecImageUrl:'',
    longitude:0,
    latitude:0,
    attractions:[],//存储当前city中的所有景点
    markers: [], // markers 数组
    currentAttraction: null, // 新增：当前选中的景点
    imagePath:'',
    commentImage:'/images/icons/commentImage.png', //默认图标
    comment:'',//评论的内容
    currentTime:'',
    commentTotalData:commentTotalData, //全部评论
    loginUserRole:'user',
    maskDisplay:'none',
    commentIndex:-1,
    commentIndexPath: '', // 用于存储当前点击回复的评论路径
  },

  onLoad(options) {
    // console.log(attractionsData)
    const { id } = options;
    this.setData({ 
      scenicId: id,
    });
    this.getScenicDetail();
  },

  async getScenicDetail() {
    this.setData({ loading: true });
    try {
      // 从全局数据中获取景点详情
      const scenic = app.globalData.scenicList.find(item => item.id === this.data.scenicId);
      console.log(scenic)
      if (!scenic) {
        throw new Error('景点不存在');
      }

      // 找到当前选中的景点
      const current = attractionsData.find(item => item.name === scenic.name);
      //获取当前展馆所在的经纬度
      const longitude = current.longitude
      const latitude = current.latitude

      //过滤掉当前景点，确保其他景点列表不包含当前景点
      const otherAttractions = attractionsData.filter(item=>item.city === current.city && item.name !== scenic.name)

      this.setData({
        scenicDetail: scenic,
        loading: false,
        longitude: longitude,
        latitude: latitude,
        attractions: otherAttractions,  // 使用过滤后的景点列表
        currentAttraction: current,     // 设置当前景点
        trackRecImageUrl:'/images/attractions/'+scenic.region+'.png',
        markers: [{
          latitude: latitude,
          longitude: longitude,
          name: scenic.name,
          id: 1,
          scale:16
        }]
      });
    } catch (error) {
      console.error('Get scenic detail error:', error);
      wx.showToast({
        title: '加载失败',
        icon: 'none'
      });
    }
  },

  switchTab(e) {
    const { tab } = e.currentTarget.dataset;
    this.setData({ currentTab: tab });
  },


  //tab3-路径推荐
  getLongitude(city) {
    // 根据城市名称返回对应的经度
    const locations = {
      "武汉市": 114.3055,
      "黄冈市": 114.8738,
      "六安市": 116.5051,
      "宜昌市": 111.2862,
      "荆州市": 112.2390
    };
    return locations[city] || 0; // 如果城市不存在，返回0
  },
  getLatitude(city) {
    // 根据城市名称返回对应的纬度
    const locations = {
      "武汉市": 30.5931,
      "黄冈市": 30.4460,
      "六安市": 31.7572,
      "宜昌市": 30.6973,
      "荆州市": 30.3465
    };
    return locations[city] || 0; // 如果城市不存在，返回0
  },
  getAttractions(city) {
    return attractionsData[city] || []; // 如果城市不存在，返回空数组
  },

  //tab4评论
  //选择评论要上传的照片
  chooseImage() {
    console.log("进来了")
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const tempFilePaths = res.tempFilePaths;
        this.setData({
          imagePath: tempFilePaths[0]
        });
      }
    });
  },

  //输入框内容变化时触发
  inputComment: function (e) {
    this.setData({
      comment: e.detail.value
    });
  },

  addComment(){
    let { commentIndexPath, commentTotalData, comment, imagePath, scenicId } = this.data;
    console.log('addComment中的commentIndexPath：',commentIndexPath)
    if(!loginUser){
      wx.showToast({
        title: '请先登录！',
        icon: 'error'
      });
      wx.navigateTo({
        url: '/pages/my/my'
      });
      return;
    }
    //下面的一定有登录的用户
    this.setData({
      loginUserNickName:loginUser[0].nickname,
      loginUserRole:loginUser[0].role,
    })
    //获取input框中的内容
    if (comment.trim() === '') {
      wx.showToast({
        title: '评论不能为空',
        icon: 'none'
      });
      return;
    }

    //获取图片路径
    //当前用户的昵称，头像
    //当前时间
    const date = new Date();
    const formattedTime = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;

    //后端评论的接口
    //⭐点击回复按钮的commentIndex不为-1，此时应该为children赋值
    
    const newComment = {
      comment,
      imagePath,
      avatarPath: loginUser[0].avatarPath,
      currentTime: formattedTime,
      nickname: loginUser[0].nickname,
      sceneryId:scenicId,
      children: []
    };
    console.log('newComment是：',newComment);
    
    //⭐？？？？
    function findTarget(data,pathArray){
      console.log('findTarget中的',data,pathArray)
      if(pathArray.length === 0){
        return data;
      }
      const index = parseInt(pathArray.shift())
      // return findTarget(data[index].children);
      return findTarget(data[index].children,pathArray);
    }
    //⭐？？？？
    const targetData = commentIndexPath || commentIndexPath===0  ? findTarget(commentTotalData, commentIndexPath.toString().split('-')) : commentTotalData;
    targetData.push(newComment);

    console.log('此时：',commentTotalData)
    wx.showToast({
      title: '评论提交成功',
      icon: 'success'
    });
    // 清空输入框和图片
    this.setData({
      comment: '',
      imagePath: '',
      commentIndexPath:'',
      commentTotalData:commentTotalData,
      maskDisplay:'none', //不展示
    });
    
  },

  // 更多(删除)
  deleteComment(e){
    console.log('点击删除时index：',e.currentTarget.dataset)
    const { path } = e.currentTarget.dataset;
    function findAndDelete(data, pathArray) {
      if (pathArray.length === 1) {
        data.splice(parseInt(pathArray[0]), 1);
        return;
      }
      const index = parseInt(pathArray.shift());
      findAndDelete(data[index].children, pathArray);
    }

    findAndDelete(this.data.commentTotalData, path.toString().split('-'));
    this.setData({
      commentTotalData: this.data.commentTotalData
    });
  },
  //回复某一条评论
  replayComment(e){
    console.log('点击回复时index：',e.currentTarget.dataset)
    const {path} = e.currentTarget.dataset
    this.setData({
      maskDisplay:'block',
      commentIndexPath:path,
    })
  },
  hideMask(){
    this.setData({
      maskDisplay:'none' //不展示
    })
  },
}); 


//todo 评论展示