var modified = {
    rename: function rename() {
        var label = document.getElementsByTagName('label');
        var len = label.length;
        label[0].innerHTML = '1. 오늘 가장 안 좋았던 일'
        label[1].innerHTML = '2. 오늘 가장 좋았던 일'
        label[2].innerHTML = '3. 내일 할 일'
    },
    titleDate: function titleDate() {
        var title = document.getElementsByTagName('h1')[1];
        var date = new Date();
        var time;
        if (date.getHours() > 12) { time = (date.getHours() - 12) }
        else { time = date.getHours() }
        title.innerHTML = date.getFullYear() + '년 ' + date.getMonth() + '월 ' + date.getDay() + '일 ' + date.getDate() + '일 ' + time + '시 ' + date.getMinutes() + '분 ' + date.getSeconds() + '초';
    }
}
if (window.location.pathname === '/post/new/') {
    modified.rename();
    modified.titleDate();
    setInterval(function () { modified.titleDate() }, 1000)
}