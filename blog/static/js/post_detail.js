var naming = {
    rename: function rename() {
        var label = document.getElementsByTagName('label');
        var len = label.length;
        label[0].innerHTML = '1. 오늘 가장 안 좋았던 일'
        label[1].innerHTML = '2. 오늘 가장 좋았던 일'
        label[2].innerHTML = '3. 내일 할 일'
    }
}
if (window.location.pathname === '/post/new/') {
    naming.rename();
}