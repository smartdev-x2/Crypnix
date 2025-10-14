let isMining = false;
let totalBalance = 0;
let earningsToday = 0;
let hashRate = 0;
let activeWorkers = 0;
let powerUsage = 0;
let miningInterval = null;
let hashRateHistory = [];

const elements = {
    miningToggle: document.getElementById('miningToggle'),
    miningStatus: document.getElementById('miningStatus'),
    statusDot: document.getElementById('statusDot'),
    totalBalance: document.getElementById('totalBalance'),
    earningsToday: document.getElementById('earningsToday'),
    hashRate: document.getElementById('hashRate'),
    activeWorkers: document.getElementById('activeWorkers'),
    powerUsage: document.getElementById('powerUsage'),
    algorithm: document.getElementById('algorithm'),
    workersList: document.getElementById('workersList'),
    chart: document.getElementById('hashRateChart')
};

const workers = [
    { name: 'Worker #1', gpu: 'NVIDIA RTX 3080', baseHashRate: 95, temp: 65 },
    { name: 'Worker #2', gpu: 'AMD RX 6800 XT', baseHashRate: 64, temp: 70 },
    { name: 'Worker #3', gpu: 'NVIDIA RTX 3070', baseHashRate: 62, temp: 63 }
];

elements.miningToggle.addEventListener('click', toggleMining);

elements.algorithm.addEventListener('change', () => {
    if (isMining) {
        updateHashRates();
        updateDisplay();
        updateChart();
    }
});

function toggleMining() {
    isMining = !isMining;
    
    if (isMining) {
        startMining();
    } else {
        stopMining();
    }
}

function startMining() {
    elements.miningToggle.textContent = 'Stop Mining';
    elements.miningToggle.classList.add('stop');
    elements.miningStatus.textContent = 'Mining Active';
    elements.statusDot.classList.add('active');
    
    activeWorkers = workers.length;
    updateDisplay();
    
    miningInterval = setInterval(() => {
        updateHashRates();
        updateEarnings();
        updateDisplay();
        updateWorkerDisplay();
        updateChart();
    }, 1000);
}

function stopMining() {
    elements.miningToggle.textContent = 'Start Mining';
    elements.miningToggle.classList.remove('stop');
    elements.miningStatus.textContent = 'Stopped';
    elements.statusDot.classList.remove('active');
    
    clearInterval(miningInterval);
    hashRate = 0;
    activeWorkers = 0;
    powerUsage = 0;
    updateDisplay();
    updateWorkerDisplay();
}

function updateHashRates() {
    const algorithm = elements.algorithm.value;
    let multiplier = 1;
    
    switch(algorithm) {
        case 'sha256': multiplier = 1.0; break;
        case 'ethash': multiplier = 0.8; break;
        case 'randomx': multiplier = 0.3; break;
        case 'equihash': multiplier = 0.6; break;
    }
    
    hashRate = workers.reduce((sum, worker) => {
        const variance = (Math.random() * 10 - 5);
        return sum + (worker.baseHashRate * multiplier) + variance;
    }, 0);
    
    powerUsage = Math.round(hashRate * 3.5);
    
    workers.forEach(worker => {
        worker.currentHashRate = (worker.baseHashRate * multiplier) + (Math.random() * 10 - 5);
        worker.temp = Math.min(85, worker.temp + (Math.random() * 2 - 1));
    });
}

function updateEarnings() {
    const btcPerMHPerDay = 0.00000015;
    const earningsPerSecond = (hashRate * btcPerMHPerDay) / 86400;
    
    earningsToday += earningsPerSecond;
    totalBalance += earningsPerSecond;
}

function updateDisplay() {
    elements.totalBalance.textContent = totalBalance.toFixed(8) + ' BTC';
    elements.earningsToday.textContent = earningsToday.toFixed(8) + ' BTC';
    elements.hashRate.textContent = hashRate.toFixed(2) + ' MH/s';
    elements.activeWorkers.textContent = activeWorkers;
    elements.powerUsage.textContent = powerUsage + ' W';
}

function updateWorkerDisplay() {
    elements.workersList.innerHTML = workers.map((worker, index) => `
        <div class="worker-card">
            <div class="worker-name">${worker.name}</div>
            <div class="worker-stats">
                <span>GPU: ${worker.gpu}</span>
                <span>Hash: ${isMining ? worker.currentHashRate.toFixed(2) : '0'} MH/s</span>
                <span>Temp: ${isMining ? Math.round(worker.temp) : '0'}°C</span>
            </div>
        </div>
    `).join('');
}

function updateChart() {
    hashRateHistory.push(hashRate);
    if (hashRateHistory.length > 60) {
        hashRateHistory.shift();
    }
    
    drawChart();
}

function drawChart() {
    const canvas = elements.chart;
    const ctx = canvas.getContext('2d');
    const width = canvas.width = canvas.offsetWidth;
    const height = canvas.height = canvas.offsetHeight;
    
    ctx.clearRect(0, 0, width, height);
    
    if (hashRateHistory.length === 0) return;
    
    const maxHash = Math.max(...hashRateHistory, 100);
    const padding = 20;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;
    
    ctx.strokeStyle = '#6366f1';
    ctx.lineWidth = 2;
    ctx.beginPath();
    
    hashRateHistory.forEach((hash, index) => {
        const x = padding + (index / (hashRateHistory.length - 1 || 1)) * chartWidth;
        const y = height - padding - (hash / maxHash) * chartHeight;
        
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    
    ctx.stroke();
    
    ctx.fillStyle = 'rgba(99, 102, 241, 0.1)';
    ctx.lineTo(width - padding, height - padding);
    ctx.lineTo(padding, height - padding);
    ctx.closePath();
    ctx.fill();
    
    ctx.fillStyle = '#94a3b8';
    ctx.font = '12px sans-serif';
    ctx.fillText(`${maxHash.toFixed(0)} MH/s`, padding, padding);
    ctx.fillText('0 MH/s', padding, height - padding);
}

updateDisplay();
updateWorkerDisplay();
drawChart();
