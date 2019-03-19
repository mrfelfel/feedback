let loveIndex = 0;
function SelectEmoji(self, index){
    document.querySelectorAll("div#feedback div.emojis div.emoji").forEach(emoji=>emoji.classList.remove('focus'))
    self.classList.add('focus');
    loveIndex = index;
    document.getElementById('feedback').classList.add('message');
    document.querySelector('div#feedback div.input textarea').focus();
}

function ShowFeedBack(){
    document.getElementById('feedback').classList.add('enable');
    setTimeout(() => {
        document.getElementById('feedback').classList.add('content');
    }, 300);
}

function HideFeedBack(){
    document.getElementById('feedback').classList.remove('content');
    setTimeout(() => {
        document.getElementById('feedback').classList.add('disable');
        document.getElementById('feedback').classList.remove('enable');
    }, 200);
}