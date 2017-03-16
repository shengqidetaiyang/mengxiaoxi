var tabData = [
    {
      produce_img:'../../resources/example.png',
      name:'洗衣机1',
      price_true:'￥122',
      price_original:'￥200',
      produce_des:'好品质，值得信赖tabaaaaaaaaaaaaaaa',
      id:0,
      heart:false
    },
    {
      produce_img:'../../resources/example.png',
      name:'洗衣机2',
      price_true:'￥122',
      price_original:'￥200',
      produce_des:'好品质，值得信赖bbbbbbbbbbbbbbbbbbbbbbbbb',
      id:1,
      heart:false
    },
    {
      produce_img:'../../resources/example.png',
      name:'洗衣机3',
      price_true:'￥122',
      price_original:'￥200',
      produce_des:'好品质，值得信赖cccccccccccccccccccc',
      id:2,
      heart:false
    }    
]
var goodsListData = [
    {
       produce_img: "http://www.baby-elephant.cn/images/product//47e331e2-03be-466f-be77-325d76e622d5.png",
       name: "励志loz积木大小颗粒拼装网具塑料智力益智1",
       price_true: "￥98.00",
       price_original:"￥120",
       produce_des:'好品质，值得信赖1111111111111111111111111111111111',
       id:0,
       heart:false
    }, {
       produce_img: "http://www.baby-elephant.cn/images/product//78abdb90-3967-4ce0-a232-43af5a3c6b99.png",
       name: "励志loz积木大小颗粒拼装网具塑料智力益智2",
       price_true: "￥99.00",
       price_original:"￥120",
       produce_des:'好品质，值得信赖2222222222222222222',
       id:1,
       heart:false
    }, {
       produce_img: "http://www.baby-elephant.cn/images/product//43fa93f6-cb5f-47d8-9755-abce92d1ab8e.png",
       name: "励志loz积木大小颗粒拼装网具塑料智力益智3",
       price_true: "￥100.00",
       price_original:"￥120",
       produce_des:'好品质，值得信赖33333333',
       id:2,
       heart:false
    }
]
var goodsClassData = [
    {
      category_img:'http://www.baby-elephant.cn/images/product//8f81b700-c45a-4092-9fa5-87db115c805c.png',
      category_name: '新品',
      id: '0',
      reid:1,
      category_des:"这是一项分类"
    }, {
      category_img:'http://www.baby-elephant.cn/images/product//56e074ad-c4c6-430e-b2b8-9d3d212dcbcc.png',
      category_name: '热卖',
      id: '1',
      reid:1,
      category_des:"这是一项分类"
    }, {
      category_img:'http://www.baby-elephant.cn/images/product//bad0a7fd-8bc5-4cc0-b447-aa6353dc9c13.png',
      category_name: '经济之选',
      id: '2',
      reid:1,
      category_des:"这是一项分类"
    }, {
      category_img:'http://www.baby-elephant.cn/images/product//40e09c61-bf6b-4e3e-9a44-59ce8881cfd3.png',
      category_name: '新奇数码',
      id: '3',
      reid:1,
      category_des:"这是一项分类"
    }, {
      category_img:'http://www.baby-elephant.cn/images/product//a69b971b-dcdf-4a22-bbd1-6310852188aa.png',
      category_name: '生活改良',
      id: '4',
      reid:1,
      category_des:"这是一项分类"
    }, {
      category_img:'http://www.baby-elephant.cn/images/product//d4869c1e-a70d-4505-9040-32cf990aa086.png',
      category_name: '远动户外',
      id: '5',
      reid:1,
      category_des:"这是一项分类"
    }, {
      category_img:'http://www.baby-elephant.cn/images/product//301666ad-03e8-4734-9093-281a4ef887c9.png',
      category_name: '妙女败物',
      id: '6',
      reid:1,
      category_des:"这是一项分类"
    }, {
      category_img:'http://www.baby-elephant.cn/images/product//43fa93f6-cb5f-47d8-9755-abce92d1ab8e.png',
      category_name: '创意礼品',
      id: '7',
      reid:1,
      category_des:"这是一项分类"
    }, {
      category_img:'http://www.baby-elephant.cn/images/product//8cc445ed-2781-45ad-b95e-953243adab76.png',
      category_name: '本期推荐',
      id: '8',
      reid:1,
      category_des:"这是一项分类"
    }, {
      category_img:'http://www.baby-elephant.cn/images/product//78abdb90-3967-4ce0-a232-43af5a3c6b99.png',
      category_name: '所有商品',
      id: '9',
      reid:1,
      category_des:"这是一项分类"
    }
]

var goodsClaData = [
    {
      category_img:'../../resources/bodyWash.png',
      category_name: '沐浴乳',
      id: '0',
      reid:1,
      category_des:"这是一项分类",
      clickAction:'newProduceUrl'
    }, {
      category_img:'../../resources/skinWash.png',
      category_name: '洗衣液',
      id: '1',
      reid:1,
      category_des:"这是一项分类",
      clickAction:'hotProduceUrl'
    }, {
      category_img:'../../resources/clothWash.png',
      category_name: '润肤乳',
      id: '2',
      reid:1,
      category_des:"这是一项分类",
      clickAction:'recommendProduceUrl'
    }, {
      category_img:'../../resources/third.png',
      category_name: '洗发香波',
      id: '3',
      reid:1,
      category_des:"这是一项分类",
      clickAction:'produceUrl'
    }
    // {
    //   category_img:'../../resources/travel.png',
    //   category_name: '出游装',
    //   id: '4',
    //   reid:1,
    //   category_des:"这是一项分类",
    //   clickAction:'produceUrl'
    // },{
    //   category_img:'../../resources/two.png',
    //   category_name: '两件装',
    //   id: '3',
    //   reid:1,
    //   category_des:"这是一项分类",
    //   clickAction:'recommendProduceUrl'
    // },{
    //   category_img:'../../resources/third.png',
    //   category_name: '三件装',
    //   id: '3',
    //   reid:1,
    //   category_des:"这是一项分类",
    //   clickAction:'recommendProduceUrl'
    // },{
    //   category_img:'../../resources/all.png',
    //   category_name: '全部分类',
    //   id: '3',
    //   reid:1,
    //   category_des:"这是一项分类",
    //   clickAction:'recommendProduceUrl'
    // }
]
module.exports = {
    tabData: tabData,
    goodsListData:goodsListData,
    goodsClassData:goodsClassData,
    goodsClaData:goodsClaData
}