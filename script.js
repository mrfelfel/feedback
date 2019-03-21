
let loveIndex = 0;


document.addEventListener("DOMContentLoaded", function(){
    // Handler when the DOM is fully loaded

    if(!localStorage.UVOTE_TOKEN){
        localStorage.UVOTE_TOKEN = 'new'
    }

    var head  = document.getElementsByTagName('head')[0];
    var body  = document.querySelector('body');
    var link  = document.createElement('link');
    head.insertAdjacentHTML('beforeend',`<style>:root{
        --body-color: #f8f8f8;
    
        --feedback-bg-color: #fff;
        --button-color:#212121;
    }
    
   
    
    div#feedback{
        z-index: 2;
        position: fixed;
        bottom: 20px;
        right: 30px;
    }
    
    div#feedback div.button{
        position: absolute;
        bottom: 0;
        right: 0;
        color : #fff;
        font-size : 11px;
        text-align: center;
        background-color: var(--button-color);
        width: 45px;
        height: 45px;
        line-height: 45px;
        border-radius: 50%;
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
        cursor: pointer;
        transition: transform .3s;
    }
  
    
    div#feedback div.button:hover{
        transform: scale(1.1);
        transition: transform .3s;
    }
    
    div#feedback:not(.enable) div.content,
    div#feedback.enable div.button{
        display: none;
    }
    
    div#feedback.enable{
        width: 350px;
        height: 180px;
        background-color: var(--feedback-bg-color);
        border-radius: .5rem;
        direction: rtl;
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
        display: flex;
        flex-direction: column;
        animation: ShowFeedBack .3s;
    }
    
    div#feedback.enable:not(.content) div.content{
        opacity: 0;
        transition: opacity .3s;
    }
    
    
    div#feedback.enable.content div.content{
        opacity: 1;
        transition: opacity .3s;
    }
    
    div#feedback.message{
        height: 220px;
    }
    
    div#feedback div.content div.head{
        position: absolute;
        top: 10px;
        right: 10px;
        cursor: pointer;
    }
    
    div#feedback div.content div.head svg{
        width: 20px;
        height: 20px;
    }
    
    div#feedback p.title{
        user-select: none;
        margin: 10px 20px;
        margin-top: 50px;
    }
    
    div#feedback.message p.title,
    div#feedback.message div.content div.head{
        display: none;
    }
    
    div#feedback div.emojis{
        display: flex;
        flex-wrap: nowrap;
        justify-content: center;
        margin-top: 20px;
    }
    
    div#feedback div.emojis div.emoji{
        margin: 0 6px;
        width: 40px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        text-align: center;
    }
    
    div#feedback div.emojis div.emoji svg{
        width: 35px;
        height: 35px;
        cursor: pointer;
        transition: all .3s;
    }
    
    div#feedback div.emojis div.emoji:hover svg{
        transform: scale(1.2);
        transition: all .1s;
    }
    
    div#feedback div.emojis div.emoji span{
        font-size: .7rem;
        margin-top: -10px;
        opacity: 0;
        transition: margin-top .3s, opacity .3s;
    }
    
    div#feedback div.emojis div.emoji:hover span{
        opacity: 1;
        margin-top: 10px;
        transition: margin-top .3s, opacity .3s;
    }
    
    div#feedback.message div.emojis div.emoji span{
        display: none;
    }
    
    div#feedback.message div.emojis div.emoji svg{
        filter: grayscale(30%);
    }
    
    div#feedback.message div.emojis div.emoji:hover svg,
    div#feedback.message div.emojis div.emoji.focus svg{
        filter: grayscale(0%);
    }
    
    div#feedback.message div.emojis div.emoji.focus svg{
        transform: scale(1.1);
    }
    
    div#feedback div.input textarea{
        margin-right: 15px;
        width: calc(100% - 50px);
        height: 65px;
        resize: none;
        outline: none;
        padding: 10px;
        border-radius: .5rem;
        border: 1px solid rgb(158, 158, 158);
        margin-top: 20px;
    }
    
    div#feedback div.content button{
        border: none;
        outline: none;
        float: left;
        margin-left: 5px;
        margin-top: 5px;
        margin-bottom: 5حx;
        cursor: pointer;
        height: 35px;
        width: 70px;
        border-radius: .3rem;
        background-color: transparent;
        transition: background-color .3s;
    }
    
    div#feedback div.content button:hover{
        background-color: rgba(0, 0, 0, .1);
        transition: background-color .3s;
    }
    
    div#feedback div.content button.send{
        margin-left: 20px !important;
    }
    
    div#feedback:not(.message) div.input{
        opacity: 0;
        pointer-events: none;
        height: 0;
        transition: all .3s;
    }
    
    div#feedback.message div.input{
        opacity: 1;
        pointer-events: all;
        height: auto;
        transition: all .3s;
    }
    
    div#feedback div.content div.done {
        display:none;
    }
    @keyframes ShowFeedBack{
        0%{
            width: 45px;
            height: 45px;
        }
        100%{
            width: 350px;
            height: 180px;
        }
    }</style>`);
    var xtag = ` <div id="feedback">
    <div class="button" onclick="ShowFeedBack()">
    فیدبک
    </div>
   
    <div class="content">
   
        <div class="head" onclick="HideFeedBack()">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path d="M38 12.83L35.17 10 24 21.17 12.83 10 10 12.83 21.17 24 10 35.17 12.83 38 24 26.83 35.17 38 38 35.17 26.83 24z"/></svg>
        </div>
        <p class="title">چقدر طراحی ظاهری ${siteName} برای شما رضایت بخش بوده ؟</p>
        <div class="emojis">
            <div class="emoji" onclick="SelectEmoji(this, 5)">
                    <?xml version="1.0" encoding="iso-8859-1"?> <!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0) --> <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 473.931 473.931" style="enable-background:new 0 0 473.931 473.931;" xml:space="preserve"> <circle style="fill:#FFC10E;" cx="236.966" cy="236.966" r="236.966"/> <g> <path style="fill:#ED3533;" d="M182.13,109.97c-14.133,0-27.262,6.892-35.154,18.432l-1.628,2.069l-1.089-1.388 c-7.802-11.962-20.954-19.109-35.232-19.109c-24.363,0-42.042,17.684-42.042,42.039c0,35.962,65.107,88.968,69.855,92.784 c2.241,2.144,5.175,3.323,8.288,3.323s6.047-1.175,8.288-3.326c4.763-3.847,70.753-57.683,70.753-92.781 C224.169,127.654,206.489,109.97,182.13,109.97z"/> <path style="fill:#ED3533;" d="M366.696,109.97c-14.133,0-27.262,6.892-35.154,18.432l-1.628,2.069l-1.089-1.388 c-7.802-11.962-20.954-19.109-35.232-19.109c-24.363,0-42.042,17.684-42.042,42.039c0,35.962,65.107,88.968,69.855,92.784 c2.241,2.144,5.175,3.323,8.288,3.323c3.109,0,6.043-1.175,8.288-3.326c4.76-3.843,70.749-57.683,70.749-92.781 C408.735,127.654,391.055,109.97,366.696,109.97z"/> </g> <path style="fill:#333333;" d="M343.254,316.86c-59.281,60.325-154.662,59.853-213.449-0.898c-8.4-8.681-21.616,4.561-13.227,13.227 c65.769,67.969,173.644,68.332,239.903,0.898C364.941,321.481,351.718,308.246,343.254,316.86L343.254,316.86z"/> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> </svg>
                <span>عاشقشم</span>
            </div>
            <div class="emoji" onclick="SelectEmoji(this, 4)">
                    <?xml version="1.0" encoding="iso-8859-1"?> <!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0) --> <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 473.931 473.931" style="enable-background:new 0 0 473.931 473.931;" xml:space="preserve"> <circle style="fill:#FFC10E;" cx="236.966" cy="236.966" r="236.966"/> <g> <path style="fill:#333333;" d="M72.036,237.123c1.04,62.895,35.64,119.175,91.782,147.826 c61.17,31.218,135.455,17.766,185.685-27.304c8.999-8.071-4.277-21.261-13.227-13.227c-46.2,41.455-112.081,50.372-167.399,22.14 c-48.385-24.692-77.249-75.92-78.132-129.435C90.547,225.074,71.838,225.052,72.036,237.123L72.036,237.123z"/> <ellipse style="fill:#333333;" cx="164.937" cy="155.231" rx="37.216" ry="18.709"/> <circle style="fill:#333333;" cx="305.664" cy="155.231" r="37.216"/> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> </svg>
                <span>دوستش دارم</span>
            </div>
            <div class="emoji" onclick="SelectEmoji(this, 3)">
                    <?xml version="1.0" encoding="iso-8859-1"?> <!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0) --> <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 473.931 473.931" style="enable-background:new 0 0 473.931 473.931;" xml:space="preserve"> <circle style="fill:#FFC10E;" cx="236.966" cy="236.966" r="236.966"/> <g> <circle style="fill:#333333;" cx="164.937" cy="155.231" r="37.216"/> <circle style="fill:#333333;" cx="305.664" cy="155.231" r="37.216"/> <path style="fill:#333333;" d="M105.278,326.581c86.386,0,172.776,0,259.162,0c12.067,0,12.067-18.709,0-18.709 c-86.386,0-172.776,0-259.162,0C93.211,307.872,93.211,326.581,105.278,326.581L105.278,326.581z"/> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> </svg>
                <span>معمولی</span>
            </div>
            <div class="emoji" onclick="SelectEmoji(this, 2)">
                    <?xml version="1.0" encoding="iso-8859-1"?> <!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0) --> <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 473.935 473.935" style="enable-background:new 0 0 473.935 473.935;" xml:space="preserve"> <circle style="fill:#FFC10E;" cx="236.967" cy="236.967" r="236.967"/> <g> <path style="fill:#333333;" d="M356.671,354.1c-66.226-67.618-174.255-67.337-240.096,0.703 c-8.389,8.666,4.827,21.912,13.227,13.227c58.87-60.83,154.386-61.204,213.641-0.703C351.896,375.96,365.116,362.721,356.671,354.1 L356.671,354.1z"/> <circle style="fill:#333333;" cx="164.938" cy="155.232" r="37.216"/> <circle style="fill:#333333;" cx="305.667" cy="155.232" r="37.216"/> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> </svg>
                <span>داغون</span>
            </div>
            <div class="emoji" onclick="SelectEmoji(this, 1)">
                    <?xml version="1.0" encoding="iso-8859-1"?> <!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0) --> <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 473.935 473.935" style="enable-background:new 0 0 473.935 473.935;" xml:space="preserve"> <circle style="fill:#FFC10E;" cx="236.967" cy="236.967" r="236.967"/> <g> <path style="fill:#333333;" d="M356.671,354.1c-66.23-67.618-174.251-67.337-240.096,0.703 c-8.389,8.666,4.827,21.908,13.227,13.227c58.87-60.834,154.379-61.204,213.641-0.703 C351.896,375.96,365.116,362.721,356.671,354.1L356.671,354.1z"/> <circle style="fill:#333333;" cx="164.938" cy="155.232" r="37.216"/> <circle style="fill:#333333;" cx="305.667" cy="155.232" r="37.216"/> </g> <path style="fill:#A2D4DE;" d="M343.167,188.612c0,0-27.517,33.874-27.517,68.819c0,15.203,12.31,27.521,27.513,27.525 c15.218-0.007,27.532-12.325,27.532-27.528C370.695,240.507,343.167,188.612,343.167,188.612z"/> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> </svg>
                <span>مزخرف</span>
            </div>
        </div>
        <div class="input">
            <textarea placeholder="تجربه خود را در میان بذارید"></textarea>
            <button class="send" onclick="SendToServer()">بفرست</button>
            <button class="cancel" onclick="HideFeedBack()">بیخیال</button>
        </div>
    </div>
</div>`

    // body.innerHTML = xtag;

    body.insertAdjacentHTML('beforeend', xtag);

    if(localStorage.feedback_exist_data){
        document.getElementById('feedback').remove()

    }
  });

  function SelectEmoji(self, index){
    document.querySelectorAll("div#feedback div.emojis div.emoji").forEach(emoji=>emoji.classList.remove('focus'))
    self.classList.add('focus');
    loveIndex = index;
    document.getElementById('feedback').classList.add('message');
    document.querySelector('div#feedback div.input textarea').focus();
}

function ShowFeedBack(){
    loveIndex = 0;
    document.querySelectorAll("div#feedback div.emojis div.emoji").forEach(emoji=>emoji.classList.remove('focus'))
    document.getElementById('feedback').classList.remove('message')
    document.getElementById('feedback').classList.add('enable');
    setTimeout(() => {
        document.getElementById('feedback').classList.add('content');
    }, 300);
}

function HideFeedBack(){
    document.getElementById('feedback').classList.remove('content');
    setTimeout(() => {
        document.getElementById('feedback').classList.add('disable');
        document.getElementById('feedback').classList.remove('message');
        document.getElementById('feedback').classList.remove('enable');
    }, 200);
}

function SendToServer(){
    let message = document.querySelector('div#feedback div.input textarea').value

    console.log(loveIndex);
    localStorage.setItem('feedback_exist_data', JSON.stringify({
        loveIndex : loveIndex,
        message : message
    }))
     // HideFeedBack()
     document.getElementById('feedback').remove()

}
