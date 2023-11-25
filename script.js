document.addEventListener("DOMContentLoaded", function () {
    const screen1 = document.querySelector(".container");
    const screen2 = document.querySelector("#screen2");
    const goToScreen2Button = document.querySelector("#goToScreen2");
    const numberSelect = document.querySelector("#numberSelect");
    const confirmButton = document.querySelector("#confirm");
    const selectedNumberElement = document.querySelector("#selectedNumber");

    let selectedNumber = "";

    goToScreen2Button.addEventListener("click", function () {
        screen1.style.display = "none";
        screen2.style.display = "block";
    });

    confirmButton.addEventListener("click", function () {
        selectedNumber = numberSelect.value;
        selectedNumberElement.textContent = `선택한 숫자: ${selectedNumber}`;
        screen2.style.display = "none";
        screen1.style.display = "block";
    });
});


/*메뉴 불러오기*/

// 메뉴 데이터
const menuItems = [
    { name: 'Com tam Saigon', price: 45000, image: 'nokiosk_web_image/comtam_saigon.jpg' },
    { name: 'Pho', price: 35000, image: 'nokiosk_web_image/pho.jpg' },
    { name: 'Bun Cha', price: 35000, image: 'nokiosk_web_image/buncha.jpeg' },
    { name: 'Banh mi', price: 25000, image: 'nokiosk_web_image/banhmi.jpg' }
];

// 메뉴 항목을 페이지에 추가하는 함수
function addMenuItems() {
    const menuContainer = document.getElementById('menu');
    menuItems.forEach(item => {
        const menuItemElement = document.createElement('div');
        menuItemElement.className = 'menu-item';
        menuItemElement.innerHTML = `
            <img src="${item.image}" alt="Menu Item">
            <p>${item.name}</p>
            <p class="price">${item.price}VND</p>
        `;
        menuItemElement.onclick = () => selectItem(item);
        menuContainer.appendChild(menuItemElement);
    });
}

// 메뉴 항목 선택 시 호출되는 함수
function selectItem(item) {
    localStorage.setItem('selectedMenuName', item.name);
    localStorage.setItem('selectedMenuPrice', item.price);
    localStorage.setItem('selectedMenuImage', item.image); // 이미지 URL도 저장
    window.location.href = 'detail.html';
}

// 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', () => {
    addMenuItems();
    displayTotalPrice();
});

// 총 금액 표시 함수
function displayTotalPrice() {
    const totalPriceElement = document.getElementById('total-price');
    const totalAmount = localStorage.getItem('totalAmount') || 0;
    totalPriceElement.innerHTML = `<h2>Order ${totalAmount} VND</h2>`;
}

// 총 금액 업데이트 함수
function updateTotalPrice(amountToAdd) {
    const currentTotal = parseInt(localStorage.getItem('totalAmount') || '0');
    const newTotal = currentTotal + amountToAdd;
    localStorage.setItem('totalAmount', newTotal);
    displayTotalPrice();
}


/*****8************* 결 제 하 기************************** */

// 총 금액 및 결제하기 버튼을 클릭했을 때의 이벤트 리스너
document.getElementById('total').addEventListener('click', function() {
    window.location.href = 'payment.html'; // 결제 페이지로 이동
});
