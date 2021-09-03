function my$(id) {
    return document.getElementById(id);
}

// 获取鼠标在页面的位置，处理浏览器兼容性
function getPage(e) {
    var pageX = e.pageX || e.clientX + getScroll().scrollLeft;
    var pageY = e.pageY || e.clientY + getScroll().scrollTop;
    return {
        pageX: pageX,
        pageY: pageY
    }
}
var open = my$('open');
var box = my$('box');
var hidden = my$('hidden');
var close = my$('close');
open.onclick = function () {
    box.style.display = 'flex';
    hidden.style.display = 'block';
}
close.onclick = function () {
    box.style.display = 'none';
    hidden.style.display = 'none';
    // 关闭后恢复box到原来的默认位置
    box.style.top = '200px';
    box.style.left = '';
}
box.onmousedown = function (e) {
    e = e || window.event;
    // 盒子的位置
    var x = getPage(e).pageX - box.offsetLeft;
    var y = getPage(e).pageY - box.offsetTop;
    document.onmousemove = function (e) {
        e = e || window.event;
        box.style.left = getPage(e).pageX - x + 'px';
        box.style.top = getPage(e).pageY - y + 'px';
    }
}
document.onmouseup = function () {
    document.onmousemove = null;
}