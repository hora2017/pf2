var modified = {
    titleDate: function () { // 실시간 제목 반영
        var title = document.getElementsByTagName('h1')[0];
        var date = new Date();
        var time, day = date.getDate();
        if (day.toString().length < 2) { day = '0' + day; }
        if (date.getHours() > 12) { time = (date.getHours() - 12) }
        else { time = date.getHours() }
        title.innerHTML = date.getFullYear() + '년 ' + date.getMonth() + 1 + '월 ' + day + '일 | ' + time + '시 ' + date.getMinutes() + '분 ' + date.getSeconds() + '초';
    },
    autoFocus: function () { // 첫 질문칸에 자동으로 포커스주기
        var textarea = document.querySelector('#id_text1').setAttribute('autofocus', 'autofocus');
    },
    divToArea: function () { // div의 글을 textarea로 동기화
        var textarea = document.getElementsByTagName('textarea');
        var tags = document.getElementsByName('tags')[0];
        var divs = document.querySelectorAll('.textDiv');
        var list = []; len = textarea.length;
        //var regex = /(style="")|(font size=")([0-9])(")|(\/font)/g;

        // font 태그를 span 태그로 치환
        var regex = /(font size=")([0-9])/gi;
        var regex2 = /(\/font)/g;
        var regex3 = /(style="")/g;
        for (var i = 0; i < len; i++) { list.push(textarea[i]) }
        for (var i = 0; i < list.length; i++) {
            if (divs[i].innerHTML !== "<br>") { list[i].value = divs[i].innerHTML.replace(regex, '' + 'span style=' + '"font-size: ' + '1.$2em').replace(regex2, '/span').replace(regex3, '') }
            else { divs[i].innerHTML = "" } // divs의 innerHTML <br> 제거
        }
        tags.value = modified.divToTag();
    },
    allTag: function () { // 질문 칸에서 '#' 앞에 붙은 단어를 배열로 저장
        var post = []; tagList = []; tags = []; matches = []; regex = /(#)(\w+|[ㄱ-ㅎ가-힣]+)(,|)/gi;
        var divs = document.querySelectorAll('.textDiv');
        for (var i = 0; i < divs.length; i++) {
            post.push(divs[i].textContent);
        };

        for (var i = 0; i < post.length; i++) {
            if (regex.exec(post[i]) !== null) {
                for (var x = 0; x < post[i].match(regex).length; x++) {
                    var tags = post[i].match(regex)[x];
                    matches.push(tags)
                };
            };
        };
        return matches;
    },
    divToTag: function () { // allTag에서 만든 배열을 '#' 삭제 스페이스 추가하여 srting으로 변환
        var allTag = modified.allTag().toString();
        var regex = /(#)(\w+|[ㄱ-ㅎ가-힣]+)(,|)/gi;
        return allTag.replace(regex, "$2 ");
    }
}


var autoSave = {
    getEditer: function () { // 질문 칸 불러오기
        var textarea = document.getElementsByTagName('textarea');
        // var tags = document.getElementsByName('tags')[0];
        var i = 0; list = []; len = textarea.length
        for (i; i < len; i++) { list.push(textarea[i]) }
        return list
    },
    save: function () { // 날짜와 질문으로 구분해서 저장
        var i = 0;
        var len = autoSave.getEditer().length;
        var date = new Date();
        var now = date.getFullYear() + '' + date.getMonth() + 1 + '' + date.getDate();
        var editer = autoSave.getEditer();
        for (i; i < len; i++) {
            localStorage.setItem(now + '/' + i, editer[i].value)
        }
        localStorage.setItem(now + '/' + i, modified.divToTag()) // 태그 저장
    },
    restore: function () { // 저장 된 글 화면에 뿌리기
        var len = autoSave.getEditer().length;
        var date = new Date();
        var now = date.getFullYear() + '' + date.getMonth() + 1 + '' + date.getDate();
        var editer = autoSave.getEditer();
        var textarea = document.getElementsByTagName('textarea');
        var divs = document.querySelectorAll('.textDiv');
        var list = []; len = textarea.length

        for (var i = 0; i < len; i++) { // 눈에 보이는 div에 뿌리면 숨겨놓은 form에 modified.divToArea()로 자동 동기화
            var localKey = localStorage.key(i);
            if (localKey === now + '/' + i) { divs[i].innerHTML = localStorage.getItem(localKey) };
        }
    },
    delete: function () { // 저장소의 지나간 날 글 삭제
        var i = 0;
        var len = autoSave.getEditer().length;
        var date = new Date();
        var now = date.getFullYear() + '' + date.getMonth() + 1 + '' + date.getDate();
        for (i; i < len; i++) {
            var localKey = localStorage.key(i);
            if (localKey !== 'theme' && localKey < now + '/' + i) { localStorage.removeItem(localKey); };
        }
    },
    publish: function () { // 글 작성 완료시 저장소의 글 삭제
        for (var i = 0; i < len; i++) {
            var localKey = localStorage.key(i);
            if (localKey !== 'theme') { localStorage.removeItem(localKey); };
        }
    }
}


var btns = document.querySelectorAll('.rich-btn');

[].forEach.call(btns, function (col) {
    col.addEventListener("click", function () { click(this.id, this.value) }, false);
});

function click(id, value) {
    if (window.getSelection().toString() !== "") {
        document.execCommand(id, false, value);
    }
}



modified.titleDate();
modified.autoFocus();
autoSave.restore();
autoSave.delete();
setInterval(function () { modified.titleDate() }, 1000);
setInterval(function () { autoSave.save() }, 2000)
setInterval(function () { modified.divToArea() }, 0)