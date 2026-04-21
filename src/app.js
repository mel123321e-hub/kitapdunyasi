/**
 * app.js - Uygulama Giriş Noktası
 * SRP: Uygulamayı başlatır, tema ayarlarını yükler ve router'ı tetikler.
 */
import { render } from './controllers/router.js';

const init = () => {
    // Dark mode yükle
    if (localStorage.getItem('kd_dark') === 'true') {
        document.body.classList.add('dark');
    }

    // İlk render
    render();
    
    console.log('KitapDünyası MVC Başlatıldı.');
};

document.addEventListener('DOMContentLoaded', init);
