// 多语言支持功能
const i18n = {
  translations: {},
  currentLang: 'zh', // 默认语言

  // 初始化多语言支持
  async init() {
    try {
      // 加载默认语言
      await this.loadLanguage('zh');
      await this.loadLanguage('en');
      
      // 检测用户保存的语言偏好
      const savedLang = localStorage.getItem('preferredLanguage');
      if (savedLang) {
        this.changeLanguage(savedLang);
      } else {
        // 检测浏览器语言
        const browserLang = navigator.language || navigator.userLanguage;
        if (browserLang.startsWith('en')) {
          this.changeLanguage('en');
        }
      }

      // 初始化语言切换事件
      this.initLanguageSwitcher();
    } catch (error) {
      console.error('Failed to initialize i18n:', error);
    }
  },

  // 加载语言文件
  async loadLanguage(lang) {
    try {
      const response = await fetch(`lang/${lang}.json`);
      if (!response.ok) {
        throw new Error(`Failed to load ${lang} language file`);
      }
      this.translations[lang] = await response.json();
      console.log(`Loaded ${lang} language file`);
    } catch (error) {
      console.error(`Error loading ${lang} language file:`, error);
    }
  },

  // 切换语言
  changeLanguage(lang) {
    if (!this.translations[lang]) {
      console.error(`Language ${lang} not loaded`);
      return;
    }

    this.currentLang = lang;
    document.documentElement.lang = lang;
    localStorage.setItem('preferredLanguage', lang);
    
    // 更新页面所有翻译元素
    this.updateAllTranslations();
    
    // 更新3D模型预览中的文本
    this.updateModelPreviewText();
    
    // 更新日期和数字格式
    this.updateDateFormats();
    
    console.log(`Switched to ${lang} language`);
  },

  // 更新页面所有翻译元素
  updateAllTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      const translation = this.translate(key);
      
      if (translation) {
        // 处理占位符内容
        if (element.placeholder) {
          element.placeholder = translation;
        } else {
          element.textContent = translation;
        }
      }
    });
  },

  // 翻译单个键
  translate(key) {
    if (!key) return '';
    
    const keys = key.split('.');
    let translation = this.translations[this.currentLang];
    
    for (const k of keys) {
      if (translation && translation[k]) {
        translation = translation[k];
      } else {
        console.warn(`Translation key not found: ${key}`);
        return key; // 返回键名作为默认值
      }
    }
    
    return translation;
  },

  // 初始化语言切换器
  initLanguageSwitcher() {
    const switcher = document.getElementById('language-switcher');
    if (switcher) {
      switcher.value = this.currentLang;
      switcher.addEventListener('change', (e) => {
        this.changeLanguage(e.target.value);
      });
    }
  },

  // 更新3D模型预览中的文本
  updateModelPreviewText() {
    // 如果3D模型预览已初始化，更新其中的文本
    if (window.modelPreview && window.modelPreview.updateText) {
      window.modelPreview.updateText();
    }
  },

  // 更新日期和数字格式
  updateDateFormats() {
    // 处理页面中的日期和数字显示
    document.querySelectorAll('[data-format="date"]').forEach(element => {
      const dateStr = element.getAttribute('data-date');
      if (dateStr) {
        const date = new Date(dateStr);
        element.textContent = date.toLocaleDateString(this.currentLang);
      }
    });

    document.querySelectorAll('[data-format="number"]').forEach(element => {
      const number = element.getAttribute('data-number');
      if (number) {
        element.textContent = new Intl.NumberFormat(this.currentLang).format(number);
      }
    });
  }
};

// 页面加载完成后初始化多语言支持
document.addEventListener('DOMContentLoaded', () => {
  i18n.init();
});
