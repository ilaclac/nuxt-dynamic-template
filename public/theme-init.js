(function () {
    try {
        var st = document.createElement('style');
        st.id = '__theme_no_transitions__';
        st.textContent = '*{transition:none!important}';
        document.head.appendChild(st);

        var m = document.cookie.match(/(?:^|;\s*)theme=(dark|light)/);
        var fromCookie = m && m[1];
        var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        var theme = fromCookie || (prefersDark ? 'dark' : 'light');

        var root = document.documentElement;
        root.setAttribute('data-theme', theme);
        root.classList.toggle('dark', theme === 'dark');

        if (!fromCookie || fromCookie !== theme) {
            document.cookie = 'theme=' + theme + '; Path=/; Max-Age=31536000; SameSite=Lax';
        }

        requestAnimationFrame(function(){ requestAnimationFrame(function(){ st.remove(); }); });
    } catch(e) {}
})();
