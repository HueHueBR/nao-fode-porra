import '../assets/middle-finger.png';
import '../views/home/scss/home.scss';

const bootstrap = () => {
  const dom = window.document;

  const toInterpolate = Array.prototype.slice.call(dom.querySelectorAll('[data-content]'));
  toInterpolate.forEach(elm => {
    let innerHTML = elm.innerHTML;
    const matches = innerHTML.match(/\{([a-zA-Z0-9]+)}/g);
    if (matches.length <= 1) {
      return;
    }

    const variables = matches.map(e => e.replace(/[\{\}]/g,''));
    variables.forEach(variable => {
      const value = variable in window.data ? window.data[variable] : '';
      innerHTML = innerHTML.replace(RegExp(`\{${variable}\}`), value);
    });

    elm.innerHTML = innerHTML;
  });
};

window.handleClickMoney = (elm) => window.alert(elm.getAttribute('alt'));

window.handleCtaClick = () => {
  window.alert('Mais informações em breve...');
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrap);
} else {
  bootstrap();
}
