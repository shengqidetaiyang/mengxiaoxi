/**
 * 小程序配置文件
 */

// 此处主机域名是腾讯云解决方案分配的域名
// 小程序后台服务解决方案：https://www.qcloud.com/solution/la

var host = "https://weixin.mengxiaoxi.cn";

var config = {
    // 下面的地址配合云端 Server 工作
    host,
    // 最新产品
    newProduceUrl: `${host}/wxnewProduce`,
    // 推荐产品
    recommendProduceUrl: `${host}/wxrecommendProduce`,
    // 最热产品
    hotProduceUrl: `${host}/wxhotProduce`,
    // 全部产品
    produceUrl: `${host}/wxproduce`,
    // 产品分类
    produceCategoryUrl: `${host}/wxproduceCategory`,
    //产品详情
    produceDetailsUUrl: `${host}/wxproduceDetails`,
    //登录
    loginUrl: `${host}/wxlogin`,
    //注册
    registerUrl: `${host}/wxregister`,
    //文章列表
    articleUrl: `${host}/wxArticle`,
    //文章详情
    articleDetailrUrl: `${host}/wxArticleDetail`,
    //商品收藏
    wxAddWishListUrl: `${host}/wxAddWishList`,
    //商品添加到购物车
    wxAddCartUrl: `${host}/wxAddCart`,
    //购物车列表
    wxCartListUrl: `${host}/wxCartList`,
    //添加到订单
    wxAddOrderUrl: `${host}/wxAddOrder`,
    //我的订单
    wxwxOrderListUrl: `${host}/wxOrderList`,
    //删除购物车里某样产品
     wxDelCartUrl: `${host}/wxDelCart`,
    //清空购物车
    wxDelAllListUrl: `${host}/wxDelAllList`,
    //购物车到下到订单
    wxCartToOrder: `${host}/wxCartToOrder`,
    //支付下单接口
    wxpayUrl:`${host}/wxPay`,
    //评论列表
    wxArticleCommentUrl:`${host}/wxArticleComment`,
    //添加文章评论
    wxAddArticleCommentUrl:`${host}/wxAddArticleComment`,
    //添加文章点赞
    wxArticleZanUrl:`${host}/wxArticleZan`,
    //取消用户订单
    wxCancelOrderUrl:`${host}/wxCancelOrder`,
    //联动查询地址
    wxGetAreaUrl:`${host}/wxGetArea`,
    //添加地址
    wxAddAddresUrl:`${host}/wxAddAddres`,
    //我的地址列表
    wxMyAddresListUrl:`${host}/wxMyAddresList`,
    //物流信息接口
    wxLogisticsUrl:`${host}/wxLogistics`,
    //删除地址
    wxDelAddresUrl:`${host}/wxDelAddres`,
    //设置默认地址
    wxDefaultAddresUrl:`${host}/wxDefaultAddres`,
    //banner图地址
    wxBannerImgUrl:`${host}/wxBannerImg`,
    //确认到货
    wxPorduceSureGetUrl:`${host}/wxPorduceSureGet`,
    //文章栏目
    wxArticleCategoryUrl:`${host}/wxArticleCategory`,
};
module.exports = config
