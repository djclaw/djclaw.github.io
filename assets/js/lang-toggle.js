(function () {
  function initBilingualPost(post) {
    const buttons = Array.from(post.querySelectorAll('.lang-btn'));
    const panels = Array.from(post.querySelectorAll('[data-lang-panel]'));
    if (!buttons.length || !panels.length) return;

    const storageKey = 'djclaw-lang';
    const defaultLang = post.getAttribute('data-default-lang') || 'en';
    const hashLang = (window.location.hash || '').replace('#', '').toLowerCase();
    const savedLang = localStorage.getItem(storageKey);
    const activeLang = hashLang === 'zh' || hashLang === 'en' ? hashLang : (savedLang || defaultLang);

    function setLang(lang, updateHash) {
      buttons.forEach((btn) => {
        const on = btn.getAttribute('data-lang') === lang;
        btn.classList.toggle('is-active', on);
        btn.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
      panels.forEach((panel) => {
        panel.hidden = panel.getAttribute('data-lang-panel') !== lang;
      });
      localStorage.setItem(storageKey, lang);
      if (updateHash) {
        const nextHash = '#' + lang;
        if (window.location.hash !== nextHash) {
          history.replaceState(null, '', nextHash);
        }
      }
    }

    buttons.forEach((btn) => {
      btn.addEventListener('click', function () {
        setLang(btn.getAttribute('data-lang'), true);
      });
    });

    setLang(activeLang, false);
  }

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.bilingual-post').forEach(initBilingualPost);
  });
})();
