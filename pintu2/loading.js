
//获取浏览器页面可见高度和宽度
var _PageHeight = document.documentElement.clientHeight,
  _PageWidth = document.documentElement.clientWidth;
//计算loading框距离顶部和左部的距离（loading框的宽度为215px，高度为61px）
var _LoadingTop = _PageHeight > 61 ? (_PageHeight - 61) / 2 : 0,
  _LoadingLeft = _PageWidth > 215 ? (_PageWidth - 215) / 2 : 0;
//在页面未加载完毕之前显示的loading Html自定义内容
var _LoadingHtml = '<div id="loadingDiv" style="position:absolute;left:0;width:100%;height:' + _PageHeight + 'px;top:0;background:#aa4f80;opacity:1;filter:alpha(opacity=80);z-index:10000;font-size:24px;"><img src="loading-spokes.svg"  style="position: absolute;  left: ' + (_LoadingLeft+86) + 'px; top:' + (_LoadingTop-160) + 'px;  width:64px;height:64px;"/><div style="position: absolute;  left: ' + (_LoadingLeft-60) + 'px; top:' + (_LoadingTop-90) + 'px; width: auto; height: 120px; line-height: 120px; padding-left: 40px; padding-right: 40px;  border: 2px solid #95B8E7; border-radius:50px; color: white;font-size:28px; font-family:\'Microsoft YaHei\';">页面加载中，请等待...</div></div>';


//呈现loading效果
document.write(_LoadingHtml);

//window.onload = function () {
//    var loadingMask = document.getElementById('loadingDiv');
//    loadingMask.parentNode.removeChild(loadingMask);
//};

//监听加载状态改变
document.onreadystatechange = completeLoading;

//加载状态为complete时移除loading效果
function completeLoading() {
  if (document.readyState == "complete") {
    var loadingMask = document.getElementById('loadingDiv');
    loadingMask.parentNode.removeChild(loadingMask);
  }
}
