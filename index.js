let coin = document.querySelector(".coin");
let point = document.querySelector(".Point");
let energy = document.querySelector(".Energy");
let slesh = document.querySelector(".slesh");

let close = document.querySelector(".close");
let windowMod = document.querySelector(".window");

let boosts_button = document.querySelector(".boosts_button");
let pointBoost = document.querySelector(".pointBoost");

let tapLvl = document.querySelector(".tapLvl");
let regenLvl = document.querySelector(".regenLvl");
let massLvl = document.querySelector(".massLvl");

let priceTap = document.querySelector(".priceTap");
let priceRegen = document.querySelector(".priceRegen");
let priceMass = document.querySelector(".priceMass");



close.addEventListener("click", () => { 
        windowMod.style.display = "none";
        
    }
)

boosts_button.addEventListener("click", () => { 
        windowMod.style.display = "block";
        pointBoost.textContent = pointSave + " BLTC";
        tapLvl.textContent = clickLVL;
        regenLvl.textContent = energyRegenLVL;
        massLvl.textContent = energyMaxLVL;
        priceTap.textContent = clickSell;
        priceRegen.textContent = regenSell;
        priceMass.textContent = massEnergySell;
        
        
    }
)

// let clickPoints = 10;
// let energyRegen = 1; // Можно изменить на любое значение
// let energyMax = 500;

// let clickLVL = 0;
// let energyRegenLVL = 0;
// let energyMaxLVL = 0;


// let clickSell = 1000;
// let regenSell = 1000;
// let massEnergySell = 1000;

localStorage.clear()

// local storage
let pointSave = localStorage.getItem('pointSave') || 0;
point.innerHTML = Number(pointSave);
let clickLVL = localStorage.getItem('clickLVL') || 0;
let energyRegenLVL = localStorage.getItem('energyRegenLVL') || 0;
let energyMaxLVL = localStorage.getItem('energyMaxLVL') || 0;

let clickPoints = Number(localStorage.getItem('clickPoints')) || 1;
let energyRegen = Number(localStorage.getItem('energyRegen')) || 1;
let energyMax = Number(localStorage.getItem('energyMax')) || 500;

let clickSell = localStorage.getItem('clickSell') || 100;
let regenSell = localStorage.getItem('regenSell') || 100;
let massEnergySell = localStorage.getItem('massEnergySell') || 100;


let currentEnergy = energyMax;

let clickApp = document.querySelector(".clickApp")
let RegenApp = document.querySelector(".RegenApp")
let MassEnergyApp = document.querySelector(".MassEnergyApp")

slesh.textContent = '/' + energyMax

// Функция для восстановления энергии
function regenerateEnergy() {
    if (currentEnergy + energyRegen > energyMax) {
        currentEnergy = energyMax; // Устанавливаем максимальное значение
    } else {
        currentEnergy += energyRegen; // Восстанавливаем энергию
    }
    energy.textContent = currentEnergy; // Обновляем отображение энергии
}

// Устанавливаем интервал для восстановления энергии
setInterval(regenerateEnergy, 1000);

coin.addEventListener("touchstart", () => {
    if (currentEnergy > 0) {
        point.innerHTML = Number(point.textContent) + clickPoints;
        pointSave = point.innerHTML
        currentEnergy -= 1; // Отнимаем энергию при клике
        energy.textContent = currentEnergy;
        localStorage.setItem('pointSave', pointSave);

        // Создаем элемент для анимации
        let scoreElement = document.createElement('div');
        scoreElement.textContent = '+' + clickPoints;
        scoreElement.style.position = 'absolute';
        scoreElement.style.left = (event.target.getBoundingClientRect().left + event.target.offsetWidth / 2) + 'px';
        scoreElement.style.top = (event.target.getBoundingClientRect().top + event.target.offsetHeight / 2) + 'px';
        document.body.appendChild(scoreElement);

        // Добавляем анимацию
        scoreElement.animate([
            { transform: 'translateY(0px)', opacity: 1 },
            { transform: 'translateY(-50px)', opacity: 0 }
        ], {
            duration: 1000,
            easing: 'ease-out'
        });

        // Удаляем элемент после анимации
        setTimeout(() => {
            document.body.removeChild(scoreElement);
        }, 1000);

        // Добавляем анимацию нажатия на монету
        coin.style.transform = 'scale(0.9)';
        setTimeout(() => {
            coin.style.transform = 'scale(1)';
        }, 100);
    
        
    }
});


clickApp.addEventListener("click", () => {
    if (Number(point.textContent) >= clickSell){
        clickPoints += 1;
        clickLVL = Number(clickLVL) + 1;
        point.innerHTML = Number(point.innerHTML) - clickSell;
        pointBoost.textContent = point.textContent + " BLTC"
        clickSell *= 2;
        pointSave = point.innerHTML
        localStorage.setItem('pointSave', pointSave);
        localStorage.setItem('clickLVL', clickLVL);
        localStorage.setItem('clickPoints', clickPoints);
        localStorage.setItem('clickSell', clickSell);
        priceTap.textContent = clickSell;
        tapLvl.innerHTML = Number(clickLVL);
        
        setTimeout(() => {
            clickApp.style.background = "rgb(115, 133, 149)";
        }, 200)
        clickApp.style.background = "green";

    } else {
        setTimeout(() => {
            clickApp.style.background = "rgb(115, 133, 149)";
        }, 200)
        clickApp.style.background = "red";
    }
    
})

RegenApp.addEventListener("click", () => {
    if (Number(point.textContent) >= regenSell){
        energyRegen += 1;
        energyRegenLVL = Number(energyRegenLVL) + 1;
        point.innerHTML = Number(point.innerHTML) - regenSell;
        pointBoost.textContent = point.textContent + " BLTC"
        regenSell *= 2;
        pointSave = point.innerHTML
        localStorage.setItem('pointSave', pointSave);
        localStorage.setItem('energyRegenLVL', energyRegenLVL);
        localStorage.setItem('energyRegen', energyRegen);
        localStorage.setItem('regenSell', regenSell);
        priceRegen.textContent = regenSell;
        regenLvl.innerHTML = Number(energyRegenLVL);
        
        setTimeout(() => {
            RegenApp.style.background = "rgb(115, 133, 149)";
        }, 200)
        RegenApp.style.background = "green";
        
    } else {
        setTimeout(() => {
            RegenApp.style.background = "rgb(115, 133, 149)";
        }, 200)
        RegenApp.style.background = "red";
    }
    
})

MassEnergyApp.addEventListener("click", () => {
    if (Number(point.textContent) >= massEnergySell){
        energyMax += 500;
        energyMaxLVL = Number(energyMaxLVL) + 1;
        point.innerHTML = Number(point.innerHTML) - massEnergySell;
        pointBoost.textContent = point.textContent + " BLTC"
        massEnergySell *= 2;
        pointSave = point.innerHTML
        localStorage.setItem('pointSave', pointSave);
        localStorage.setItem('energyMaxLVL', energyMaxLVL);
        localStorage.setItem('energyMax', energyMax);
        localStorage.setItem('massEnergySell', massEnergySell);
        slesh.textContent = '/' + energyMax
        priceMass.textContent = massEnergySell;
        massLvl.innerHTML = Number(energyMaxLVL);
        setTimeout(() => {
            MassEnergyApp.style.background = "rgb(115, 133, 149)";
        }, 200)
        MassEnergyApp.style.background = "green";
    } else {
        setTimeout(() => {
            MassEnergyApp.style.background = "rgb(115, 133, 149)";
        }, 200)
        MassEnergyApp.style.background = "red";
    }
    
})
