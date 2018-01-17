var modified = {
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
    },
    areaToDiv: function () {
        var textarea = document.getElementsByTagName('textarea');
        var tags = document.getElementsByName('tags')[0];
        var divs = document.querySelectorAll('.textDiv');
        var list = []; len = textarea.length
        for (var i = 0; i < divs.length; i++) {
            divs[i].setAttribute('contentEditable', 'true')
        }
        for (var i = 0; i < len; i++) { list.push(textarea[i]) }
        list.push(tags);
        for (var i = 0; i < list.length; i++) {
            list[i].value = divs[i].innerHTML
        }
    }
}


var autoSave = {
    getEditer: function () {
        var textarea = document.getElementsByTagName('textarea');
        var tags = document.getElementsByName('tags')[0];
        var i = 0; list = []; len = textarea.length
        for (i; i < len; i++) { list.push(textarea[i]) }
        list.push(tags);
        return list
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
        var now = date.getFullYear() + '' + date.getMonth() + 1 + '' + date.getDate();
        var editer = autoSave.getEditer();
        for (i; i < len; i++) {
            var localKey = localStorage.key(i);
            if (localKey === now + '/' + i) { editer[i].value = localStorage.getItem(localKey) };
        }

        var textarea = document.getElementsByTagName('textarea');
        var tags = document.getElementsByName('tags')[0];
        var divs = document.querySelectorAll('.textDiv');
        var list = []; len = textarea.length
        for (var i = 0; i < len; i++) { list.push(textarea[i]) }
        list.push(tags);
        for (var i = 0; i < list.length; i++) {
            divs[i].innerHTML = list[i].value
        }
    },
    delete: function () {
        var i = 0;
        var len = autoSave.getEditer().length;
        var date = new Date();
        var now = date.getFullYear() + '' + date.getMonth() + 1 + '' + date.getDate();
        for (i; i < len; i++) {
            var localKey = localStorage.key(i);
            if (localKey !== 'theme' && localKey < now + '/' + i) { localStorage.removeItem(localKey); };
        }
    },
    publish: function(){
        var i = 0;
        var len = autoSave.getEditer().length;
        var date = new Date();
        var now = date.getFullYear() + '' + date.getMonth() + 1 + '' + date.getDate();
        for (i; i < len; i++) {
            var localKey = localStorage.key(i);
            if (localKey !== 'theme' && localKey <= now + '/' + i) { localStorage.removeItem(localKey); };
        }
    }
}

modified.titleDate();
modified.autoFocus();
autoSave.restore();
autoSave.delete();
setInterval(function () { modified.titleDate() }, 1000);
setInterval(function () { autoSave.save() }, 2000)
setInterval(function () { modified.areaToDiv() }, 0)