var modified = {
    titleDate: function () { // 실시간 제목 반영
        var title = document.getElementsByTagName('h1')[1];
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
        var list = []; len = textarea.length
        for (var i = 0; i < len; i++) { list.push(textarea[i]) }
        for (var i = 0; i < list.length; i++) {
            if (divs[i].innerHTML !== "<br>") { list[i].value = divs[i].innerHTML }
            else { divs[i].innerHTML = "" } // divs의 innerHTML <br> 제거
        }
        tags.value = modified.divToTag();
    },
    allTag: function () { // 질문 칸에서 '#' 앞에 붙은 단어를 배열로 저장
        var post = []; tagList = []; tags = []; matches = []; regex = /(#)(\w+|[가-힣]+)(,|)/g;
        var divs = document.querySelectorAll('.textDiv');
        for (var i = 0; i < divs.length; i++) {
            post.push(divs[i].innerHTML);
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
        var regex = /(#)(\w+|[가-힣]+)(,|)/g;
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

function rich(value) {
    var selected = window.getSelection().getRangeAt(0);
    if (selected.toString() !== "" && selected.toString() !== " ") {
        var node = window.getSelection();
        var parentStyle = node.baseNode.parentNode.style
        if (node.baseNode.parentNode !== 'span') { // 해당 Selection에 처음으로 스타일 적용할때
            var style = document.createElement('span');
            switch (value) {
                case 'bold':
                    style.style.cssText = "font-weight:bold";
                    break;
                case 'italic':
                    style.style.cssText = "font-style:italic";
                    break;
                case '1.4em':
                    style.style.cssText = "font-size:1.4em";
                    break;
                case '0.8em':
                    style.style.cssText = "font-size:0.8em";
                    break;
            }
            // 셀렉션의 글자를 찾아 노드 위치 지정 삭제 삽입
            if (selected.commonAncestorContainer.innerHTML !== undefined ? style.innerHTML = selected.commonAncestorContainer.innerHTML : style.innerHTML = selected)


            selected.deleteContents();
            selected.insertNode(style);
        } else { // 해당 Selection에 중복으로 스타일 적용할때
            var len = parentStyle.length;
            switch (value) {
                case 'bold':
                    parentStyle[len + 1] = "font-weight";
                    parentStyle['fontWeight'] = value;
                    break;
                case 'italic':
                    parentStyle[len + 1] = "font-style";
                    parentStyle['fontStyle'] = value;
                    break;
                case '1.4em':
                    parentStyle[len + 1] = "font-size";
                    parentStyle['fontSize'] = value;
                    break;
                case '0.8em':
                    parentStyle[len + 1] = "font-size";
                    parentStyle['fontSize'] = value;
                    break;
            }
        }
    }
}

modified.titleDate();
modified.autoFocus();
autoSave.restore();
autoSave.delete();
setInterval(function () { modified.titleDate() }, 1000);
setInterval(function () { autoSave.save() }, 2000)
setInterval(function () { modified.divToArea() }, 0)