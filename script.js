class LotterySystem {
    constructor() {
        this.participants = [
            { id: 1, name: '小明', photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face' },
            { id: 2, name: '小红', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face' },
            { id: 3, name: '小刚', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face' },
            { id: 4, name: '小丽', photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face' },
            { id: 5, name: '小华', photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' },
            { id: 6, name: '小美', photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face' },
            { id: 7, name: '小强', photo: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&h=150&fit=crop&crop=face' },
            { id: 8, name: '小芳', photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face' },
            { id: 9, name: '小军', photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face' },
            { id: 10, name: '小雨', photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face' },
            { id: 11, name: '小龙', photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face' },
            { id: 12, name: '小凤', photo: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&h=150&fit=crop&crop=face' },
            { id: 13, name: '小虎', photo: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&h=150&fit=crop&crop=face' },
            { id: 14, name: '小燕', photo: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face' },
            { id: 15, name: '小鹏', photo: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=150&h=150&fit=crop&crop=face' }
        ];
        
        this.winners = [];
        this.currentRound = 0;
        this.isDrawing = false;
        this.availableParticipants = [...this.participants];
        
        this.rounds = [
            { name: '三等奖', count: 3, prize: '三等奖' },
            { name: '二等奖', count: 2, prize: '二等奖' },
            { name: '一等奖', count: 1, prize: '一等奖' }
        ];
        
        this.init();
    }
    
    init() {
        this.renderPhotoGrid();
        this.bindEvents();
        this.updateUI();
    }
    
    renderPhotoGrid() {
        const grid = document.getElementById('photoGrid');
        grid.innerHTML = '';
        
        this.participants.forEach((participant, index) => {
            const photoItem = document.createElement('div');
            photoItem.className = 'photo-item';
            photoItem.dataset.id = participant.id;
            photoItem.dataset.index = index;
            
            photoItem.innerHTML = `
                <img src="${participant.photo}" alt="${participant.name}" onerror="this.src='data:image/svg+xml,<svg xmlns=\\"http://www.w3.org/2000/svg\\" viewBox=\\"0 0 150 150\\"><rect width=\\"150\\" height=\\"150\\" fill=\\"%23ddd\\"/><text x=\\"75\\" y=\\"75\\" text-anchor=\\"middle\\" dy=\\".3em\\" font-size=\\"14\\" fill=\\"%23666\\">${participant.name}</text></svg>'">
                <div class="photo-name">${participant.name}</div>
            `;
            
            grid.appendChild(photoItem);
        });
    }
    
    bindEvents() {
        const lotteryBtn = document.getElementById('lotteryBtn');
        const resetBtn = document.getElementById('resetBtn');
        
        lotteryBtn.addEventListener('click', () => this.startLottery());
        resetBtn.addEventListener('click', () => this.resetLottery());
    }
    
    updateUI() {
        const lotteryBtn = document.getElementById('lotteryBtn');
        
        if (this.currentRound < this.rounds.length) {
            lotteryBtn.textContent = `🎲 抽取${this.rounds[this.currentRound].name}`;
            lotteryBtn.disabled = false;
        } else {
            lotteryBtn.textContent = '🎉 抽奖完成';
            lotteryBtn.disabled = true;
        }
        
        // 更新照片状态
        this.updatePhotoStatus();
    }
    
    updatePhotoStatus() {
        const photoItems = document.querySelectorAll('.photo-item');
        photoItems.forEach(item => {
            const participantId = parseInt(item.dataset.id);
            const isWinner = this.winners.some(w => w.id === participantId);
            
            if (isWinner) {
                item.classList.add('won');
            } else {
                item.classList.remove('won');
            }
        });
    }
    
    async startLottery() {
        if (this.isDrawing || this.currentRound >= this.rounds.length) return;
        
        this.isDrawing = true;
        const lotteryBtn = document.getElementById('lotteryBtn');
        lotteryBtn.disabled = true;
        
        const currentRoundInfo = this.rounds[this.currentRound];
        const winnersCount = currentRoundInfo.count;
        
        // 如果不是第一轮，清除之前的中奖显示
        if (this.currentRound > 0) {
            this.clearWinnersDisplay();
        }
        
        // 开始抽奖动画
        await this.animateLottery();
        
        // 选择中奖者
        const roundWinners = this.selectWinners(winnersCount);
        
        // 显示中奖结果
        this.displayWinners(roundWinners, currentRoundInfo.prize);
        
        // 更新状态
        this.winners.push(...roundWinners);
        this.currentRound++;
        this.isDrawing = false;
        
        // 更新UI
        this.updateUI();
    }
    
    async animateLottery() {
        const cursor = document.getElementById('cursor');
        const photoItems = document.querySelectorAll('.photo-item:not(.won)');
        const duration = 3000; // 3秒动画
        const interval = 100; // 每100ms移动一次
        const steps = duration / interval;
        
        cursor.style.display = 'block';
        
        for (let i = 0; i < steps; i++) {
            // 随机选择一个未中奖的照片
            const availableItems = Array.from(photoItems).filter(item => !item.classList.contains('won'));
            if (availableItems.length === 0) break;
            
            const randomItem = availableItems[Math.floor(Math.random() * availableItems.length)];
            const rect = randomItem.getBoundingClientRect();
            
            // 移动光标到照片位置
            cursor.style.left = (rect.left + rect.width / 2 - 20) + 'px';
            cursor.style.top = (rect.top + rect.height / 2 - 20) + 'px';
            
            // 高亮当前照片
            photoItems.forEach(item => item.classList.remove('selected'));
            randomItem.classList.add('selected');
            
            await new Promise(resolve => setTimeout(resolve, interval));
        }
        
        cursor.style.display = 'none';
        photoItems.forEach(item => item.classList.remove('selected'));
    }
    
    selectWinners(count) {
        const available = this.availableParticipants.filter(p => 
            !this.winners.some(w => w.id === p.id)
        );
        
        const selected = [];
        const availableCopy = [...available];
        
        for (let i = 0; i < count && availableCopy.length > 0; i++) {
            const randomIndex = Math.floor(Math.random() * availableCopy.length);
            const winner = availableCopy.splice(randomIndex, 1)[0];
            selected.push(winner);
        }
        
        return selected;
    }
    
    displayWinners(winners, prize) {
        const winnersContainer = document.getElementById('winnersContainer');
        
        winners.forEach((winner, index) => {
            setTimeout(() => {
                const winnerElement = document.createElement('div');
                winnerElement.className = 'winner-item';
                winnerElement.innerHTML = `
                    <img src="${winner.photo}" alt="${winner.name}" class="winner-photo" onerror="this.src='data:image/svg+xml,<svg xmlns=\\"http://www.w3.org/2000/svg\\" viewBox=\\"0 0 80 80\\"><circle cx=\\"40\\" cy=\\"40\\" r=\\"40\\" fill=\\"%23ddd\\"/><text x=\\"40\\" y=\\"40\\" text-anchor=\\"middle\\" dy=\\".3em\\" font-size=\\"12\\" fill=\\"%23666\\">${winner.name}</text></svg>'">
                    <div class="winner-name">${winner.name}</div>
                    <div class="winner-prize">${prize}</div>
                `;
                
                winnersContainer.appendChild(winnerElement);
                
                // 添加中奖者到列表
                winner.prize = prize;
            }, index * 500); // 每个中奖者延迟500ms显示
        });
    }
    
    clearWinnersDisplay() {
        const winnersContainer = document.getElementById('winnersContainer');
        winnersContainer.innerHTML = '';
    }
    
    resetLottery() {
        this.winners = [];
        this.currentRound = 0;
        this.isDrawing = false;
        this.availableParticipants = [...this.participants];
        
        this.clearWinnersDisplay();
        this.updateUI();
        
        // 移除所有选中状态
        const photoItems = document.querySelectorAll('.photo-item');
        photoItems.forEach(item => {
            item.classList.remove('selected', 'won');
        });
        
        // 隐藏光标
        const cursor = document.getElementById('cursor');
        cursor.style.display = 'none';
    }
}

// 页面加载完成后初始化抽奖系统
document.addEventListener('DOMContentLoaded', () => {
    new LotterySystem();
});

// 添加一些魔法效果
document.addEventListener('DOMContentLoaded', () => {
    // 创建星星效果
    function createStars() {
        const starsContainer = document.createElement('div');
        starsContainer.style.position = 'fixed';
        starsContainer.style.top = '0';
        starsContainer.style.left = '0';
        starsContainer.style.width = '100%';
        starsContainer.style.height = '100%';
        starsContainer.style.pointerEvents = 'none';
        starsContainer.style.zIndex = '-1';
        document.body.appendChild(starsContainer);
        
        for (let i = 0; i < 50; i++) {
            const star = document.createElement('div');
            star.innerHTML = '✨';
            star.style.position = 'absolute';
            star.style.left = Math.random() * 100 + '%';
            star.style.top = Math.random() * 100 + '%';
            star.style.fontSize = (Math.random() * 10 + 5) + 'px';
            star.style.opacity = Math.random() * 0.5 + 0.2;
            star.style.animation = `twinkle ${Math.random() * 3 + 2}s infinite`;
            starsContainer.appendChild(star);
        }
    }
    
    // 添加闪烁动画
    const style = document.createElement('style');
    style.textContent = `
        @keyframes twinkle {
            0%, 100% { opacity: 0.2; transform: scale(1); }
            50% { opacity: 0.8; transform: scale(1.2); }
        }
    `;
    document.head.appendChild(style);
    
    createStars();
});