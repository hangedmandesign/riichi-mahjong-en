function f(Y, X, who, how){
    var ans="", ron=0, tsumo1=0, tsumo2=0;
    var arr=[2000,3000,3000,4000,4000,4000,6000,6000,8000];
    Y=Number(Y);
    X=Number(X);
    if (X!==25 && X%10!==0){
        X-=X%10;
        X+=10;
    }
    if ((Y===3 && X>=70) || (Y===4 && X>=40))
        Y=5;
    if (Y<1 || X<20 || X>110 || (Y===1 && X<=25))
        alert('불가능한 계산입니다.');
    else if (5<=Y){
        if (Y>13)
            Y=13;
        ron=tsumo1=tsumo2=arr[Y-5];
    }
    else
        ron=tsumo1=tsumo2=X*Math.pow(2,Y+2);
    if (how==='ron'){
        if (who==='chin')
            ron*=6;
        else
            ron*=4;
        ron=Math.ceil(ron/100)*100;
        ans=String(ron);
    }
    else{
        tsumo1*=2;
        tsumo1=Math.ceil(tsumo1/100)*100;
        tsumo2=Math.ceil(tsumo2/100)*100;
        if (who==='chin')
            ans=String(tsumo1)+' ALL';
        else
            ans=String(tsumo1)+'/'+String(tsumo2)+' ALL';
    }
    return ans;
}

function openFullScreenMode() {
        var docV = document.documentElement;
        if (docV.requestFullscreen)
            docV.requestFullscreen();
        else if (docV.webkitRequestFullscreen)
            docV.webkitRequestFullscreen();
        else if (docV.mozRequestFullScreen)
            docV.mozRequestFullScreen();
        else if (docV.msRequestFullscreen)
            docV.msRequestFullscreen();
    
    // document.querySelector('body').onclick='null';
}
function ChangeSeat(){
    var winds=['#DownPerson_Wind', '#RightPerson_Wind', '#UpPerson_Wind', '#LeftPerson_Wind'];
    var tmp=document.querySelector(winds[3]).innerText;
    for (var i=3;i>0;i--){
        document.querySelector(winds[i]).innerText=document.querySelector(winds[i-1]).innerText;
    }
    document.querySelector(winds[0]).innerText=tmp;
    for (var i=0;i<winds.length;i++){
        if (document.querySelector(winds[i]).innerText==='東')
            document.querySelector(winds[i]).style.color='red';
        else
            document.querySelector(winds[i]).style.color='';
    }
}
function ChangeScore(Y, X, who1, who2, how, plus){
    var Allstick=document.querySelector('#richii_count');
    var renjang=document.querySelector('#renjang_count');
    var ret=0, ron=0, tsumo1=0, tsumo2=0;
    var arr=[2000,3000,3000,4000,4000,4000,6000,6000,8000];
    if (5<=Y){
        ron=tsumo1=tsumo2=arr[Y-5];
    }
    else
        ron=tsumo1=tsumo2=X*Math.pow(2,Y+2);
    if (how==='ron'){
        if (who1==='東')
            ron*=6;
        else
            ron*=4;
        ron=Math.ceil(ron/100)*100;
        ret=ron;
    }
    else{
        tsumo1*=2;
        tsumo1=Math.ceil(tsumo1/100)*100;
        tsumo2=Math.ceil(tsumo2/100)*100;
        if (who1==='東'){
            if (plus===1)
                ret=tsumo1*3;
            else
                ret=tsumo1;
        }
        else{
            if (plus===1)
                ret=tsumo1+tsumo2*2;
            else if (who2==='東')
                ret=tsumo1;
            else
                ret=tsumo2;
        }
    }
    if (plus===1){
        ret+=Allstick.innerText*1000;
        ret+=renjang.innerText*300;
        Allstick.innerText=0;
    }
    else{
        if (how==='ron')
            ret+=renjang.innerText*300;
        else
            ret+=renjang.innerText*100;
    }
    return ret/100;
}

function makechk(self){
    if (self.style.color==='')
        self.style.color='red';
    else
        self.style.color='';
}
function makeunchk(who, type){
    for (var i=0;i<who.length;i++){
        if (document.querySelector('#'+who[i]+type).style.color==='red')
            document.querySelector('#'+who[i]+type).style.color='';
    }
}

function richii(who){
    var Allstick=document.querySelector('#richii_count');
    var stick=document.querySelector('#'+who+'_Richii');
    var score=document.querySelector('#'+who+'_Score');
    if (stick.style.visibility===''){
        if (score.innerText>=10){
            stick.style.visibility='visible';
            score.innerText=Number(score.innerText)-10;;
            Allstick.innerText++;
        }
        else{
            document.querySelector('#Modal_alertText').innerText='점수가 모자라 리치를 걸수 없습니다.';
            document.querySelector('#Modal_alert').style.display='inline';
        }
    } 
    else{
        stick.style.visibility='';
        score.innerText=Number(score.innerText)+10;
        Allstick.innerText--;
    }
}


function tsumo1(){
    var tsumo1=document.querySelector('#Modal_tsumo1');
    tsumo1.style.display='inline';
}

function tsumo2(){
    var tsumo1=document.querySelector('#Modal_tsumo1');
    var tsumo2=document.querySelector('#Modal_tsumo2');
    var checks=['#downcheck_tsumo','#rightcheck_tsumo','#upcheck_tsumo','#leftcheck_tsumo'];
    var chktenpai=0;
    for (var i=0;i<4;i++){
        if (document.querySelector(checks[i]).style.color==='red')
            chktenpai=1;
    }
    tsumo1.style.display='';
    if (chktenpai===1)
        tsumo2.style.display='inline';
    else{
        document.querySelector('#Modal_alertText').innerText='화료한 사람이 선택되지 않았습니다.';
        document.querySelector('#Modal_alert').style.display='inline';
    }
}

function ryuukyoku1(){
    var ryuukyoku1=document.querySelector('#Modal_ryuukyoku1');
    ryuukyoku1.style.display='inline';
}
function ryuukyoku2(){
    var ryuukyoku1=document.querySelector('#Modal_ryuukyoku1');
    var ryuukyoku2=document.querySelector('#Modal_ryuukyoku2');
    ryuukyoku1.style.display='';
    ryuukyoku2.style.display='inline';
}


function tsumo_General(fan, bu){
    fan=Number(fan);
    bu=Number(bu);
    var tsumo2=document.querySelector('#Modal_tsumo2');
    var winds=['#DownPerson_Wind', '#RightPerson_Wind', '#UpPerson_Wind', '#LeftPerson_Wind'];
    var checks=['#downcheck_tsumo','#rightcheck_tsumo','#upcheck_tsumo','#leftcheck_tsumo'];
    var scores=['#DownPerson_Score','#RightPerson_Score','#UpPerson_Score','#LeftPerson_Score'];
    var tenpai=-1;
    var renjang=document.querySelector('#renjang_count');
    var sticks=['#DownPerson_Richii', '#RightPerson_Richii', '#UpPerson_Richii', '#LeftPerson_Richii'];
    tsumo2.style.display='';
    document.querySelector('#fan_tsumo').selectedIndex=0;
    document.querySelector('#bu_tsumo').selectedIndex=0;
    if (fan===1 && bu<=25){ //불가능한 점수
        for (var i=0;i<4;i++){ 
            if (document.querySelector(checks[i]).style.color==='red')
                document.querySelector(checks[i]).style.color='';
        }
        document.querySelector('#Modal_alertText').innerText='불가능한 점수입니다.';
        document.querySelector('#Modal_alert').style.display='inline';
    }
    else{
        for (var i=0;i<sticks.length;i++){ //리치봉 수거
            document.querySelector(sticks[i]).style.visibility='';
        }
        for (var i=0;i<4;i++){ //화료체크
            if (document.querySelector(checks[i]).style.color==='red'){
                document.querySelector(checks[i]).style.color='';
                tenpai=i;
            }
        }
        for (var i=0;i<4;i++){ //점수계산
            if (i===tenpai){
                document.querySelector(scores[i]).innerText=Number(document.querySelector(scores[i]).innerText)+ChangeScore(fan, bu, document.querySelector(winds[tenpai]).innerText, document.querySelector(winds[i]).innerText, 'tsumo', 1);
            }
            else{
                document.querySelector(scores[i]).innerText=Number(document.querySelector(scores[i]).innerText)-ChangeScore(fan, bu, document.querySelector(winds[tenpai]).innerText, document.querySelector(winds[i]).innerText, 'tsumo', 0);
            }
        }
        if (document.querySelector(winds[tenpai]).innerText!=='東'){ // 친 체크후 바람바꾸기
            renjang.innerText=0;
            ChangeSeat();
        } 
            
        else
            renjang.innerText++; //연장봉 증가
    }
}
function ryuukyoku_General(){
    var ryuukyoku2=document.querySelector('#Modal_ryuukyoku2');
    var winds=['#DownPerson_Wind', '#RightPerson_Wind', '#UpPerson_Wind', '#LeftPerson_Wind'];
    var checks=['#downcheck_ryuukyoku','#rightcheck_ryuukyoku','#upcheck_ryuukyoku','#leftcheck_ryuukyoku'];
    var scores=['#DownPerson_Score','#RightPerson_Score','#UpPerson_Score','#LeftPerson_Score'];
    var tenpai=[0,0,0,0];
    var Alltenpai=0;
    var renjang=document.querySelector('#renjang_count');
    var sticks=['#DownPerson_Richii', '#RightPerson_Richii', '#UpPerson_Richii', '#LeftPerson_Richii'];
    ryuukyoku2.style.display='';
    for (var i=0;i<sticks.length;i++){ //리치봉 수거
        document.querySelector(sticks[i]).style.visibility='';
    }
    
    for (var i=0;i<4;i++){ //텐파이 체크
        if (document.querySelector(checks[i]).style.color==='red'){
            document.querySelector(checks[i]).style.color='';
            Alltenpai++;
            tenpai[i]=1;
        }
    }
    if (Alltenpai>0 && Alltenpai<4){ //실 점수계산
        for (var i=0;i<4;i++){
            if (tenpai[i]===1)
                document.querySelector(scores[i]).innerText=Number(document.querySelector(scores[i]).innerText)+(30/Alltenpai);
            else
                document.querySelector(scores[i]).innerText=Number(document.querySelector(scores[i]).innerText)-(30/(4-Alltenpai));
        }
    }
    for (var i=0;i<4;i++){ //친 체크후 바람바꾸기
        if (document.querySelector(winds[i]).innerText==='東' && tenpai[i]!==1){
            ChangeSeat();
            break;
        } 
    }
    renjang.innerText++; //연장봉 증가
}
function ryuukyoku_Special(){
    var ryuukyoku1=document.querySelector('#Modal_ryuukyoku1');
    var renjang=document.querySelector('#renjang_count');
    var sticks=['#DownPerson_Richii', '#RightPerson_Richii', '#UpPerson_Richii', '#LeftPerson_Richii'];
    ryuukyoku1.style.display='';
    renjang.innerText++;
    for (var i=0;i<sticks.length;i++){
        document.querySelector(sticks[i]).style.visibility='';
    }
}
