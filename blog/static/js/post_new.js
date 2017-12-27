var modified = {
    rename: function () {
        var label = document.getElementsByTagName('label');
        var len = label.length;
        label[0].innerHTML = '1. 오늘 가장 안 좋았던 일'
        label[1].innerHTML = '2. 오늘 가장 좋았던 일'
        label[2].innerHTML = '3. 내일 할 일'
    },
    titleDate: function () {
        var title = document.getElementsByTagName('h1')[1];
        var date = new Date();
        var time;
        if (date.getHours() > 12) { time = (date.getHours() - 12) }
        else { time = date.getHours() }
        title.innerHTML = date.getFullYear() + '년 ' + date.getMonth() + '월 ' + date.getDay() + '일 ' + date.getDate() + '일 | ' + time + '시 ' + date.getMinutes() + '분 ' + date.getSeconds() + '초';
    }
}


var autoSave = {
    getEditer: function () {
        return document.getElementsByTagName('textarea');
    },
    save: function () {
        var i = 0;
        var len = autoSave.getEditer().length;
        var date = new Date();
        var now = date.getFullYear() + '' + date.getMonth() + '' + date.getDate();
        for (i; i < len; i++) {
            localStorage.setItem(now + '/' + i, autoSave.getEditer()[i].value)
        }
    },
    restore: function () {
        var i = 0;
        var len = autoSave.getEditer().length;
        var date = new Date();
        var now = date.getFullYear() + '' + date.getMonth() + '' + date.getDate();
        var editer = autoSave.getEditer();
        for (i; i < len; i++) {
            var localKey = localStorage.key(i);
            if (localKey && now + '/' + i) { editer[i].value = localStorage.getItem(localKey) };
        }
    },
    delete: function () {
        var i = 0;
        var len = autoSave.getEditer().length;
        var date = new Date();
        var now = date.getFullYear() + '' + date.getMonth() + '' + date.getDate();
        for (i; i < len; i++) {
            var localKey = localStorage.key(i);
            if (localKey < now + '/' + i) { localStorage.removeItem(localKey); };
        }
    }
}


if (window.location.pathname === '/post/new/') {
    modified.rename();
    modified.titleDate();
    autoSave.restore();
    autoSave.delete();
    setInterval(function () { modified.titleDate() }, 1000);
    setInterval(function () { autoSave.save() }, 5000)
}