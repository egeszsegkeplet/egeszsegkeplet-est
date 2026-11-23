'use strict';
// A Google Űrlap beágyazása. Ha nincs érvényes link, az oldal a telefonos jelentkezést ajánlja.
(function () {
  var panel = document.getElementById('online-registration');
  var configured = window.EGESZSEGKEPLET && window.EGESZSEGKEPLET.registrationUrl;
  var ok = false;
  try {
    var url = new URL(configured);
    ok = url.protocol === 'https:' && url.hostname === 'docs.google.com' && /^\/forms\//.test(url.pathname) && !/\/edit\/?$/.test(url.pathname);
    if (ok) {
      var frame = document.createElement('iframe');
      frame.src = url.href + (url.search ? '&' : '?') + 'embedded=true';
      frame.title = 'Jelentkezési űrlap – Egészségképlet információs est';
      frame.loading = 'eager';
      frame.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
      var alt = document.createElement('p'); alt.className = 'small';
      var a = document.createElement('a'); a.href = url.href; a.target = '_blank'; a.rel = 'noopener noreferrer'; a.textContent = 'Nem jelenik meg az űrlap? Nyisd meg külön lapon';
      alt.appendChild(a);
      panel.appendChild(frame); panel.appendChild(alt);
    }
  } catch (e) { ok = false; }
  if (!ok) {
    var p = document.createElement('p');
    p.textContent = 'Az online űrlap hamarosan elérhető. Addig jelentkezz telefonon vagy e-mailben.';
    panel.appendChild(p);
  }
})();
