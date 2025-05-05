let startButton = document.querySelector(".start-button");
let timer = document.querySelector(".timer");
let kiemTraDangChay = false;
let giay = 0;
let interval;
let boxes = document.querySelectorAll('.box');

let step =0;
let history =[];



startButton.addEventListener("click", () => {
    if (!kiemTraDangChay) {
        // Bắt đầu đếm thời gian
        kiemTraDangChay = true;
        startButton.innerText = "Kết thúc";
        startButton.style.backgroundColor = "red";
        step = 0;
        // Trộn các ô số 100 lần
        for(let i = 0; i < 100; i++) {
            boxes.forEach(box => {
                // Tạo vị trí ngẫu nhiên cho mỗi ô
                //math.random cho ra so ngau nhien tu 0 den 1 roi nhan voi do dai mang roi lam tron xuong thi ra vi tri ngau nhien
                let randomPosition = Math.floor(Math.random() * boxes.length);
                // Lấy nội dung và màu sắc của ô hiện tại
                let currentNumber = box.textContent;
                let currentBackground = box.className;
                let currentColor = box.style.color;
                
                // Hoán đổi nội dung và màu sắc với ô ngẫu nhiên
                let randomBox = boxes[randomPosition];
                box.textContent = randomBox.textContent;
                box.className = randomBox.className;
                box.style.color = randomBox.style.color;
                
                randomBox.textContent = currentNumber;
                randomBox.className = currentBackground;
                randomBox.style.color = currentColor;
            });
        }

        interval = setInterval(() => {
            giay++;
            let phut = Math.floor(giay / 60);
            let giayConLai = giay % 60;
            phut = phut < 10 ? "0" + phut : phut;
            giayConLai = giayConLai < 10 ? "0" + giayConLai : giayConLai;
            timer.textContent = `${phut}:${giayConLai}`;
        }, 1000);
    } else {
        // Dừng đếm thời gian
        kiemTraDangChay = false;
        startButton.textContent = "Bắt đầu";
        startButton.style.backgroundColor = "";
        clearInterval(interval);
        giay = 0;
        timer.textContent = "00:00";
    }
});

function victory(){
    let boxNoBlack = document.querySelectorAll('.box:not(.bg-black)');
    let result =true;
    for(let i=0;i<boxNoBlack.length;i++){
        if(Number(boxNoBlack[i].textContent)!== i+1){
            result = false;
            break;
        }
    }
    return result;
}

function updateHistory(){
    let tbody = document.querySelector('table tbody');
    tbody.innerHTML = '';
    
    history.forEach((luot, index) => {
        tbody.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${luot.buocDi}</td>
                <td>${luot.thoiGian}</td>
            </tr>
        `;
    });
}

document.addEventListener('keydown', (e) => {
    if (!kiemTraDangChay) return; // Chỉ cho di chuyển khi đã bắt đầu game

    let blackBox = document.querySelector('.box.bg-black');
    let boxes = Array.from(document.querySelectorAll('.box'));
    let blackIndex = boxes.indexOf(blackBox);
    let targetIndex;

   
    switch(e.key.toLowerCase()) {
        case 'arrowleft':
        case 'a': 
            if (blackIndex % 4 !== 0) targetIndex = blackIndex - 1;
            break;
        case 'arrowright':
        case 'd': 
            if (blackIndex % 4 !== 3) targetIndex = blackIndex + 1;
            break;
        case 'arrowup':
        case 'w': 
            if (blackIndex >= 4) targetIndex = blackIndex - 4;
            break;
        case 'arrowdown':
        case 's': 
            if (blackIndex < 8) targetIndex = blackIndex + 4;
            break;
    }

    // Nếu có thể di chuyển, hoán đổi ô
    if (targetIndex !== undefined) {
        let targetBox = boxes[targetIndex];
        [blackBox.textContent, targetBox.textContent] = [targetBox.textContent, blackBox.textContent];
        [blackBox.className, targetBox.className] = [targetBox.className, blackBox.className];
        [blackBox.style.color, targetBox.style.color] = [targetBox.style.color, blackBox.style.color];

        step++;

        if(victory()){
            history.push({
                buocDi: step,
                thoiGian: timer.textContent
            });
            
            updateHistory();
            
            clearInterval(interval);
            alert("YOU WIN!");
            startButton.textContent = "Chơi lại";
            startButton.style.backgroundColor = "green";
            kiemTraDangChay = false;
        }
    }
});


// cập nhật lịch sử chơi




