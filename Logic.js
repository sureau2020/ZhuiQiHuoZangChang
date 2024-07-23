let points = 0;
let age = 24;  // 初始年龄设定为24岁
let love = 20;
let menu = false;
let isDaytime = true;
let rate = 0;
let yanjie = 30;
let nengli = 30;
let zhangyanjie = 30;
let zhangnengli = 20;
let timerStarted = false;
const introspectionButton = document.createElement('button');
introspectionButton.className = 'button';
introspectionButton.innerText = '内省';
let introspectionInterval;
let introspectionActive = false;
const leftColumn = document.getElementById('left-column');
const middleColumn = document.getElementById('middle-column');
const rightColumn = document.getElementById('right-column');
let whiteBall = false;
let whiteSing = false;
let whiteApple = false;
let unique1, unique2, unique3, unique4, unique5;
const fishList = [
    "鲑鱼",
    "鳕鱼",
    "鲈鱼",
    "黄鳝",
    "青鱼",
    "鲷鱼",
    "比目鱼",
    "沙丁鱼",
    "鳗鱼",
    "海蜇",
    "海星",
    "海草",
    "海参",
    "海胆",
    "海螺",
    "螃蟹",
    "龙虾",
    "扇贝",
    "鱿鱼",
    "漂流瓶",
    "锦鲤",
    "金枪鱼"
  ];
  let zhangInfo = [];


window.onload = function() {
    let [binary1, binary2, binary3, que1, que2, que3,que4, que5] = generateRandomNumbers();
    unique1 = que1;
    unique2 = que2;
    unique3 = que3;
    unique4 = que4;
    unique5 = que5;
    whiteBall = binary1 === 0 ? false : true;
    whiteSing = binary2 === 0 ? false : true;
    whiteApple = binary3 === 0 ? false : true;
    updateZhangInfo();
    updateTimeDisplay();

    // 每两分钟切换一次时间
    setInterval(toggleDayNight, 60 * 1000);
};

// 切换白天和黑夜
function toggleDayNight() {
    isDaytime = !isDaytime;
    updateTimeDisplay();
}

// 更新时间显示
function updateTimeDisplay() {
    let timeDisplay = document.getElementById('time-display');
    timeDisplay.innerText = `时间：${isDaytime ? '白天' : '黑夜'}`;
}


function updateZhangInfo() {
    whiteApple ? zhangInfo.push('章北海不喜欢在白天吃苹果。'): zhangInfo.push('章北海不喜欢在晚上吃苹果。');
    whiteSing ? zhangInfo.push('章北海不喜欢在白天听吴岳哼歌。'): zhangInfo.push('章北海不喜欢在晚上听吴岳哼歌。');
    whiteBall ? zhangInfo.push('章北海不喜欢在白天打球。'): zhangInfo.push('章北海不喜欢在晚上打球。');
    zhangInfo.push(`章北海不喜欢${fishList[unique1]}。`);
    zhangInfo.push(`章北海不喜欢${fishList[unique2]}。`);
    zhangInfo.push(`章北海不喜欢${fishList[unique3]}。`);
    zhangInfo.push(`章北海喜欢${fishList[unique4]}。`);
    zhangInfo.push(`章北海喜欢${fishList[unique5]}。`);
    console.log(zhangInfo);
}


function generateRandomNumbers() {
    let binaryNumbers = [];
    let uniqueNumbers = [];

    // 生成前三个随机数（0或1）
    for (let i = 0; i < 3; i++) {
        binaryNumbers.push(Math.floor(Math.random() * 2)); 
    }

    while (uniqueNumbers.length < 5) {
        let randomNum = Math.floor(Math.random() * 22) ; 
        if (!uniqueNumbers.includes(randomNum)) {
            uniqueNumbers.push(randomNum);
        }
    }

    return [...binaryNumbers, ...uniqueNumbers];
}

function generateUniqueRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}



function addPoint(point, info) {
    points += point;
    let newPoint = document.createElement('div');
    if(info){
        newPoint.innerText = '吴岳获得了1灵感点。';
        middleColumn.appendChild(newPoint);
    }
    document.getElementById('points').innerText = points;

    if (points >= 1 && !timerStarted) {
        document.getElementById('name').innerText = '吴岳';
        document.getElementById('age').innerText = `年龄：${age}岁`;
        document.getElementById('yanjie').innerText = `眼界：${yanjie}`;
        document.getElementById('nengli').innerText = `能力：${nengli}`;
        let newPoint = document.createElement('div');
        newPoint.innerText = '吴岳24岁，第一次遇见章北海，多看了两眼。';
        middleColumn.appendChild(newPoint);
        document.getElementById('zhang-bai-he').style.display = 'block'; 
        document.getElementById('zhang-age').innerText = `年龄：${age}岁`;
        introspectionButton.onclick = NeiXing;
        let xing = document.getElementById('neixing');
        xing.appendChild(introspectionButton);


        startTimer();
        timerStarted = true;
    }

    if(points >= 3 && !menu){
        menu = true;
        document.getElementById('menu').style.display = 'block';
    }
    
}

function NeiXing() {
    if (!introspectionActive) {
        introspectionActive = true;
        rate = 0.5;
        document.getElementById('rate').innerText = `v：灵感点+${rate}/s`;
        introspectionButton.style.display = 'none';
        introspectionInterval = setInterval(() => {
            addPoint(rate,false);
        }, 1000);
    }
}

function reading(){
    if(points<5){
        let newPoint = document.createElement('div');
            newPoint.innerText = `吴岳试图阅读，但今天好像不在状态，死活看不进去书。`;
            middleColumn.appendChild(newPoint);
    }else{
        points -= 5;
        yanjie += 1;
        let newPoint = document.createElement('div');
        newPoint.innerText = '吴岳通过阅读，开阔了一些眼界';
        middleColumn.appendChild(newPoint);
        document.getElementById('points').innerText = points;
        document.getElementById('yanjie').innerText = `眼界：${yanjie}`;
    }
}

function gongzuo(){
    if(points<5){
        let newPoint = document.createElement('div');
            newPoint.innerText = `吴岳感到异常烦躁，但还是强行完成了工作……嗯，完成得一般，没学到任何新东西。`;
            middleColumn.appendChild(newPoint);
    }else{
        points -= 5;
        nengli += 1;
        let newPoint = document.createElement('div');
        newPoint.innerText = '吴岳在工作中解决了几个棘手的问题，能力得到了提升';
        middleColumn.appendChild(newPoint);
        document.getElementById('points').innerText = points;
        document.getElementById('nengli').innerText = `能力：${nengli}`;
    }
}

function xunlian(){
    if(points<15){
        let newPoint = document.createElement('div');
            newPoint.innerText = `吴岳试图训练，但觉得一阵头晕，训练没有任何效果。`;
            middleColumn.appendChild(newPoint);
    }else{
        points -= 15;
        yanjie += 2;
        nengli += 2;
        let newPoint = document.createElement('div');
        newPoint.innerText = '训练过后，吴岳的能力和眼界都得到了提升。';
        middleColumn.appendChild(newPoint);
        document.getElementById('points').innerText = points;
        document.getElementById('yanjie').innerText = `眼界：${yanjie}`;
        document.getElementById('nengli').innerText = `能力：${nengli}`;
    }
}

function chenSi(){
    if(points<50){
        let newPoint = document.createElement('div');
            newPoint.innerText = `吴岳试图沉思，但没有足够的灵感。`;
            middleColumn.appendChild(newPoint);
    }else{
        points -= 50;
        let success = generateUniqueRandomNumber(0,4);
        if(success === 0){
            if(zhangInfo.length === 0){
                let newPoint = document.createElement('div');
                newPoint.innerText = `吴岳对章北海的信息已经掌握全面了，没什么可想的了。`;
                middleColumn.appendChild(newPoint);
                return;
            }
            let index = generateUniqueRandomNumber(0,zhangInfo.length-1);
            let info = zhangInfo[index];
            zhangInfo.splice(index, 1);
            let newPoint = document.createElement('div');
            newPoint.innerText = `吴岳仔细想了想，发现${info}`;
            middleColumn.appendChild(newPoint);
            let otherPoint = document.createElement('div');
            otherPoint.innerText = `${info}`;
            rightColumn.appendChild(otherPoint);
            
        }else if(success === 4){
            let newPoint = document.createElement('div');
            rate += 0.5;
            newPoint.innerText = '吴岳沉思了一会儿，获得灵感的速度增加了。';
            middleColumn.appendChild(newPoint);
            document.getElementById('rate').innerText = `v：灵感点+${rate}/s`;
        }else{
            let newPoint = document.createElement('div');
            newPoint.innerText = '吴岳沉思了半天，但什么也没想出来。';
            middleColumn.appendChild(newPoint);
        }
        
    }
}



function addLove(point) {
    love += point;
    if(love <= 0){
        document.getElementById('love').innerText = `关系：友尽`;
    }else if(love < 10){
        document.getElementById('love').innerText = `关系：烦`;
    }else if(love <= 40){
        document.getElementById('love').innerText = `关系：同事`;
    }else if(love > 40 && love <= 60){
        document.getElementById('love').innerText = `关系：朋友`;
    }else if(love > 60 && love <= 80){
        document.getElementById('love').innerText = `关系：暧昧`;
    }else if(love >80 && love <= 100){
        document.getElementById('love').innerText = `关系：恋人`;
    }
    

}

function startTimer() {
    setInterval(() => {
        age++;
        document.getElementById('age').innerText = `年龄：${age}岁`;
        document.getElementById('zhang-age').innerText = `年龄：${age}岁`;
    }, 3600000);  // 每小时增加1岁，3600000毫秒 = 1小时
}