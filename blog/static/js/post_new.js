var modified = {
    rename: function () {
        var label = document.getElementsByTagName('label');
        label[0].innerHTML = '1. 오늘 가장 안 좋았던 일'
        label[1].innerHTML = '2. 오늘 가장 좋았던 일'
        label[2].innerHTML = '3. 내일 할 일'
        label[3].innerHTML = '태그'
        label[3].nextElementSibling.nextElementSibling.innerText = '태그는 띄어쓰기로 구분합니다';
    },
    titleDate: function () {
        var title = document.getElementsByTagName('h1')[1];
        var date = new Date();
        var time, day = date.getDate();
        if (day.toString().length < 2) { day = '0' + day; }
        if (date.getHours() > 12) { time = (date.getHours() - 12) }
        else { time = date.getHours() }
        title.innerHTML = date.getFullYear() + '년 ' + date.getMonth() + 1 + '월 ' + day + '일 | ' + time + '시 ' + date.getMinutes() + '분 ' + date.getSeconds() + '초';
    },
    autoFocus: function () {
        var textarea = document.querySelector('#id_text1').setAttribute('autofocus', 'autofocus');
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
        var now = date.getFullYear() + '' + date.getMonth() + 1 + '' + date.getDate();
        var editer = autoSave.getEditer();
        for (i; i < len; i++) {
            localStorage.setItem(now + '/' + i, editer[i].value)
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
            if (localKey === now + '/' + i) { editer[i].value = localStorage.getItem(localKey) };
        }
    },
    delete: function () {
        var i = 0;
        var len = autoSave.getEditer().length;
        var date = new Date();
        var now = date.getFullYear() + '' + date.getMonth() + '' + date.getDate();
        for (i; i < len; i++) {
            var localKey = localStorage.key(i);
            if (localKey !== 'theme' && localKey < now + '/' + i) { localStorage.removeItem(localKey); };
        }
    }
}


modified.rename();
modified.titleDate();
modified.autoFocus();
autoSave.restore();
autoSave.delete();
setInterval(function () { modified.titleDate() }, 1000);
setInterval(function () { autoSave.save() }, 5000)