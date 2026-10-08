const DB_PLANTAS = [
    { nome: "Cevada", min: -4, max: 28 },
    { nome: "Centeio", min: -15, max: 25 },
    { nome: "Batata", min: 5, max: 26 },
    { nome: "Cenoura", min: 4, max: 25 },
    { nome: "Espinafre", min: -2, max: 24 },
    { nome: "Ervilha", min: 1, max: 25 },
    { nome: "Alho", min: 0, max: 25 },
    { nome: "Cebola", min: 3, max: 30 },
    { nome: "Maçã", min: -7, max: 28 },
    { nome: "Repolho", min: -2, max: 26 },
    { nome: "Arroz", min: 15, max: 40 },
    { nome: "Cana-de-açúcar", min: 12, max: 38 },
    { nome: "Feijão", min: 12, max: 35 },
    { nome: "Café (Arábica)", min: 10, max: 30 },
    { nome: "Soja", min: 10, max: 38 },
    { nome: "Melancia", min: 15, max: 38 },
    { nome: "Manga", min: 5, max: 42 },
    { nome: "Banana", min: 11, max: 38 },
    { nome: "Pimentão", min: 12, max: 35 },
    { nome: "Mandioca", min: 10, max: 40 }
];

class App {
    constructor() {
        this.isRegisterMode = false;
        this.currentUser = null;
        this.currentTemp = 26;
        this.currentHumidity = 70;
        this.apiKey = 'c078160b604897141ff65b50363e12a8';
        this.init();
    }

    sanitizeInput(str) {
        if (!str) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    validatePasswordStrength(password) {
        const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
        return strongRegex.test(password);
    }

    init() {
        document.getElementById('auth-form').addEventListener('submit', (e) => this.handleAuth(e));
        document.getElementById('auth-toggle').addEventListener('click', (e) => {
            e.preventDefault();
            this.toggleAuthMode();
        });

        document.getElementById('user-pass').addEventListener('input', (e) => {
            if (this.isRegisterMode) {
                this.updatePasswordMeter(e.target.value);
            }
        });

        const savedUser = localStorage.getItem('av_current_user');
        if (savedUser) {
            this.loginUser(JSON.parse(savedUser));
        }
    }

    updatePasswordMeter(pass) {
        const meter = document.getElementById('pass-meter');
        const bar = document.getElementById('pass-bar');
        const hint = document.getElementById('pass-hint');

        if (!pass) {
            meter.style.display = 'none';
            hint.style.display = 'none';
            return;
        }

        meter.style.display = 'block';
        hint.style.display = 'block';

        let score = 0;
        if (pass.length >= 8) score++;
        if (/[A-Z]/.test(pass)) score++;
        if (/[0-9]/.test(pass)) score++;
        if (/[!@#$%^&*]/.test(pass)) score++;

        if (score <= 2) {
            bar.style.width = '33%';
            bar.style.backgroundColor = 'var(--danger-color)';
        } else if (score === 3) {
            bar.style.width = '66%';
            bar.style.backgroundColor = 'var(--warning-color)';
        } else {
            bar.style.width = '100%';
            bar.style.backgroundColor = 'var(--success-color)';
        }
    }

    toggleAuthMode() {
        this.isRegisterMode = !this.isRegisterMode;
        document.getElementById('name-group').style.display = this.isRegisterMode ? 'block' : 'none';
        document.getElementById('pass-meter').style.display = 'none';
        document.getElementById('pass-hint').style.display = this.isRegisterMode ? 'block' : 'none';
        document.getElementById('auth-title').textContent = this.isRegisterMode ? 'Criar Conta' : 'Acessar Conta';
        document.getElementById('auth-btn').textContent = this.isRegisterMode ? 'Cadastrar' : 'Entrar';
        document.getElementById('auth-toggle-text').textContent = this.isRegisterMode ? 'Já tem uma conta?' : 'Não tem uma conta?';
        document.getElementById('auth-toggle').textContent = this.isRegisterMode ? 'Fazer Login' : 'Cadastre-se';
    }

    getUsersDB() {
        return JSON.parse(localStorage.getItem('av_users_db') || '{}');
    }

    saveUsersDB(db) {
        localStorage.setItem('av_users_db', JSON.stringify(db));
    }

    handleAuth(e) {
        e.preventDefault();
        const rawEmail = document.getElementById('user-email').value.trim().toLowerCase();
        const rawPass = document.getElementById('user-pass').value;
        
        const email = this.sanitizeInput(rawEmail);
        const usersDB = this.getUsersDB();

        if (this.isRegisterMode) {
            const rawName = document.getElementById('user-name').value.trim();
            const name = this.sanitizeInput(rawName);

            if (!name) {
                alert('Por favor, informe seu Nome Completo.');
                return;
            }

            if (!this.validatePasswordStrength(rawPass)) {
                alert('A senha é fraca! Requisitos necessários:\n• Mínimo 8 caracteres\n• Pelo menos 1 letra maiúscula\n• Pelo menos 1 número\n• Pelo menos 1 caractere especial (!@#$%^&*)');
                return;
            }

            if (usersDB[email]) {
                alert('Este e-mail já está cadastrado no sistema.');
                return;
            }

            usersDB[email] = { name: name, pass: rawPass };
            this.saveUsersDB(usersDB);

            alert('Conta criada com sucesso! Faça login para continuar.');
            this.toggleAuthMode();

        } else {
            const userRecord = usersDB[email];

            if (userRecord && userRecord.pass === rawPass) {
                const loggedUser = { name: userRecord.name, email: email };
                localStorage.setItem('av_current_user', JSON.stringify(loggedUser));
                this.loginUser(loggedUser);
            } else if (!userRecord) {
                alert('Conta não encontrada. Por favor, cadastre-se primeiro para definir seu nome e senha.');
                this.toggleAuthMode();
            } else {
                alert('Senha incorreta.');
            }
        }
    }

    loginUser(user) {
        this.currentUser = user;
        document.getElementById('auth-container').style.display = 'none';
        document.getElementById('app-content').style.display = 'block';
        document.getElementById('greeting-text').textContent = `Olá, ${user.name}!`;
        this.getWeather();
        this.renderCrops();
    }

    logout() {
        localStorage.removeItem('av_current_user');
        location.reload();
    }

    switchTab(tabName, element) {
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        
        element.classList.add('active');
        document.getElementById(`${tabName}-tab`).classList.add('active');
    }

    async getWeather() {
        const rawCity = document.getElementById('city-input').value || 'Recife';
        const city = this.sanitizeInput(rawCity);

        try {
            const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apiKey}&lang=pt_br`);
            if(!res.ok) throw new Error();
            const data = await res.json();
            
            this.currentTemp = data.main.temp;
            this.currentHumidity = data.main.humidity;

            document.getElementById('city-name').textContent = data.name;
            document.getElementById('location-sub').innerHTML = `<i class="fas fa-map-marker-alt"></i> ${data.sys.country}`;
            document.getElementById('temp-val').textContent = `${Math.round(data.main.temp)}°C`;
            document.getElementById('weather-desc').textContent = data.weather[0].description;
            
            document.getElementById('temp-max-min').textContent = `${Math.round(data.main.temp_max)}°C / ${Math.round(data.main.temp_min)}°C`;
            document.getElementById('feels-like').textContent = `${Math.round(data.main.feels_like)}°C`;
            document.getElementById('humidity-val').textContent = `${data.main.humidity}%`;
            document.getElementById('wind-val').textContent = `${(data.wind.speed * 3.6).toFixed(1)} km/h`;
            document.getElementById('pressure-val').textContent = `${data.main.pressure} hPa`;
            
            this.updateSmartRecommendations(data.main.temp, data.main.humidity);

            const resForecast = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${this.apiKey}&lang=pt_br`);
            if(resForecast.ok) {
                const forecastData = await resForecast.json();
                this.renderForecast(forecastData);
            }

        } catch (err) {
            alert('Cidade não encontrada ou erro na conexão. Carregando dados locais de exemplo.');
            this.setFallbackWeather(city);
        }
    }

    renderForecast(data) {
        const forecastGrid = document.getElementById('forecast-grid');
        forecastGrid.innerHTML = '';

        for (let i = 0; i < data.list.length; i += 8) {
            const item = data.list[i];
            const dateObj = new Date(item.dt * 1000);
            const dayName = dateObj.toLocaleDateString('pt-BR', { weekday: 'short', day: 'numeric' });

            forecastGrid.innerHTML += `
                <div class="forecast-card">
                    <div class="forecast-date">${dayName}</div>
                    <div class="forecast-temp">${Math.round(item.main.temp)}°C</div>
                    <div class="forecast-desc">${item.weather[0].description}</div>
                </div>
            `;
        }
    }

    setFallbackWeather(city) {
        this.currentTemp = 27;
        this.currentHumidity = 78;

        document.getElementById('city-name').textContent = city;
        document.getElementById('location-sub').innerHTML = `<i class="fas fa-map-marker-alt"></i> BR`;
        document.getElementById('temp-val').textContent = '27°C';
        document.getElementById('weather-desc').textContent = 'chuva leve';
        document.getElementById('temp-max-min').textContent = '29°C / 24°C';
        document.getElementById('feels-like').textContent = '28°C';
        document.getElementById('humidity-val').textContent = '78%';
        document.getElementById('wind-val').textContent = '14.2 km/h';
        document.getElementById('pressure-val').textContent = '1012 hPa';
        
        this.updateSmartRecommendations(27, 78);
    }

    updateSmartRecommendations(temp, humidity) {
        const warningBox = document.getElementById('extreme-warning-box');
        const irrField = document.getElementById('rec-irrigation');
        const cropsField = document.getElementById('rec-crops');

        if (temp < 15) {
            irrField.textContent = "Minuciosa: evaporação baixa, irrigue com cautela para não encharcar o solo.";
            warningBox.style.display = 'flex';
        } else if (temp >= 15 && temp < 25) {
            irrField.textContent = "Regular: 1 vez ao dia (preferencialmente no início da manhã).";
            warningBox.style.display = 'none';
        } else if (temp >= 25 && temp < 30) {
            irrField.textContent = "Intensiva: 2 vezes ao dia (início da manhã e final da tarde).";
            warningBox.style.display = 'none';
        } else {
            let dicaUmidade = humidity < 50 ? "Alta taxa de evaporação. Recomenda-se irrigação frequente." : "Umidade razoável. Monitore o solo antes de regar.";
            irrField.textContent = `Cautela: recomendação variando com umidade atual (${humidity}%). ${dicaUmidade}`;
            warningBox.style.display = 'flex';
        }

        const cultivosCompativeis = DB_PLANTAS.filter(p => temp >= p.min && temp <= p.max).map(p => p.nome);

        if (cultivosCompativeis.length > 0) {
            cropsField.textContent = cultivosCompativeis.join(', ') + '.';
        } else {
            cropsField.textContent = "Nenhum cultivo da lista suporta essa temperatura extrema de forma segura.";
        }
    }

    // GESTÃO DE TAREFAS (CENÁRIO A) ISOLADA POR CONTA
    getUserCropsKey() {
        return `av_tasks_${this.currentUser ? this.currentUser.email : 'guest'}`;
    }

    getCrops() {
        return JSON.parse(localStorage.getItem(this.getUserCropsKey()) || '[]');
    }

    addCrop(e) {
        e.preventDefault();
        const rawName = document.getElementById('crop-name').value;
        const name = this.sanitizeInput(rawName);
        const area = parseFloat(document.getElementById('crop-area').value);

        const tasks = this.getCrops();
        // Cada tarefa nasce com completed: false
        tasks.push({ id: Date.now(), name, area, completed: false });
        localStorage.setItem(this.getUserCropsKey(), JSON.stringify(tasks));

        document.getElementById('crop-form').reset();
        this.renderCrops();
    }

    // Marcar tarefa como concluída ou pendente (Alternar estado)
    toggleTaskStatus(id) {
        let tasks = this.getCrops();
        tasks = tasks.map(t => {
            if (t.id === id) {
                t.completed = !t.completed;
            }
            return t;
        });
        localStorage.setItem(this.getUserCropsKey(), JSON.stringify(tasks));
        this.renderCrops();
    }

    deleteCrop(id) {
        let tasks = this.getCrops();
        tasks = tasks.filter(t => t.id !== id);
        localStorage.setItem(this.getUserCropsKey(), JSON.stringify(tasks));
        this.renderCrops();
    }

    simulateHarvest(area) {
        let fatorClima = (this.currentTemp >= 20 && this.currentTemp <= 30) ? 1.0 : 0.5;
        let estimativaKg = area * 3.0 * fatorClima;
        
        alert(`🔮 SIMULAÇÃO DE COLHEITA 🔮\n\nÁrea: ${area} m²\nTemperatura Atual: ${this.currentTemp}°C\n\nEstimativa de Produção: ${estimativaKg.toFixed(2)} Kg`);
    }

    renderCrops() {
        const container = document.getElementById('crops-list');
        const tasks = this.getCrops();

        if (tasks.length === 0) {
            container.innerHTML = '<p style="color: #718096;">Nenhuma tarefa cadastrada para esta conta.</p>';
            return;
        }

        container.innerHTML = tasks.map(task => `
            <div class="card ${task.completed ? 'completed' : ''}" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                <div style="display: flex; align-items: center; gap: 10px;">
                    <!-- Checkbox de Conclusão (Cenário A) -->
                    <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="app.toggleTaskStatus(${task.id})" style="width: 18px; height: 18px; cursor: pointer;">
                    <div>
                        <strong class="task-title">${task.name}</strong><br>
                        <small>Área: ${task.area} m²</small>
                    </div>
                </div>
                <div style="display: flex; gap: 5px;">
                    <button class="btn btn-primary" style="padding: 0.3rem 0.6rem; font-size: 0.8rem; background: var(--primary-color);" onclick="app.simulateHarvest(${task.area})">
                        <i class="fas fa-calculator"></i> Simular
                    </button>
                    <button class="btn btn-danger" onclick="app.deleteCrop(${task.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');
    }
}

const app = new App();