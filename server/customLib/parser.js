module.exports = {
    markdownParser: function(str) {
        var html = [];
        var lines = str.split('\n'); //Convert string to array
        //Remove empty lines
        for (var index = lines.length - 1; index >= 0; index--) {
            if (lines[index] == '') lines.splice(index, 1);
        }
        //Parse line by line
        for (var index = 0; index <= lines.length - 1; index++) {
            var str = lines[index];
            if (str.match(/^#[^#]/)) {
                //Header
                str = str.replace(/#(.*?)$/g, '<h1>$1</h1>');
            } else if (str.match(/^##[^#]/)) {
                //Header 2
                str = str.replace(/##(.*?)$/g, '<h2>$1</h2>');
            } else if (str.match(/^###[^#]/)) {
                //Header 3
                str = str.replace(/###(.*?)$/g, '<h3>$1</h3>');
            } else if (str.match(/^[0-9a-zA-Z]/)) {
                //Paragraph
                str = str.replace(/^([0-9a-zA-Z].*?)$/g, '<p>$1</p>');
            }
            //Inline formatting
            str = str.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'); //Bold
            str = str.replace(/\_\_(.*?)\_\_/g, '<strong>$1</strong>'); //Another bold
            str = str.replace(/\*(.*?)\*/g, '<em>$1</em>'); //Italics
            str = str.replace(/\_(.*?)\_/g, '<em>$1</em>'); //Another italics
            str = str.replace(/\[(.*?)\]\((.*?)\)/gi, '<a href="$2">$1</a>');
            //Append formatted to return string
            html.push(str);
        }
        return html;
    }
};