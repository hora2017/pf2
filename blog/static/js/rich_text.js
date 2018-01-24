function rich(value) {
    var selected = window.getSelection().getRangeAt(0);
    if (selected.toString() !== "" && selected.toString() !== " ") {
        var node = window.getSelection();
        var parentStyle = node.focusNode.parentNode.style
        if (node.focusNode.parentNode.nodeName !== 'SPAN' || node.anchorNode.nodeName === '#text') { // 해당 Selection에 처음으로 스타일 적용할때
            var span = document.createElement('span');
            switch (value) {
                case 'bold':
                    span.style.cssText = "font-weight:bold";
                    break;
                case 'italic':
                    span.style.cssText = "font-style:italic";
                    break;
                case '1.4em':
                    span.style.cssText = "font-size:1.4em";
                    break;
                case '0.8em':
                    span.style.cssText = "font-size:0.8em";
                    break;
            }
            if (selected.commonAncestorContainer.innerHTML !== undefined ? span.innerHTML = selected.commonAncestorContainer.innerHTML : span.innerHTML = selected)


            node.deleteFromDocument();
            //selected.insertNode(span);
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