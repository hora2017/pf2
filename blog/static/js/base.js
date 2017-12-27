var cssBl = {
    theme: '',
    boolean: function () {
        if (localStorage['theme'] === undefined) {
            cssBl.theme = 'false';
            localStorage.setItem('theme', 'false');
        } else { cssBl.theme = 'true'; }
    },
    css: function () {
        if (localStorage['theme'] === 'false') {
            var head = document.getElementsByTagName('head')[0];
            var link = document.createElement('link');
            link.id = 'cssId';
            link.rel = 'stylesheet';
            link.href = '/static/css/blog.css';
            head.appendChild(link);
        } else {
            var head = document.getElementsByTagName('head')[0];
            var link = document.createElement('link');
            link.id = 'cssId';
            link.rel = 'stylesheet';
            link.href = '/static/css/blog.1.css';
            head.appendChild(link);
        }
    }
}

window.onload = function () {
    var btn = document.getElementById('cssBtn');
    btn.onclick = function () {
        localStorage['theme'] === 'false' ? localStorage['theme'] = 'true' : localStorage['theme'] = 'false';
        cssBl.css();
    }
}

cssBl.boolean();
cssBl.css();