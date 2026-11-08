/* 全站追蹤：GA4 + LINE／電話點擊事件
 * 啟用方式：把下面的 GA_ID 換成 GA4 評估 ID（G- 開頭），存檔推上 GitHub 即生效。
 * 事件：line_click、phone_call_click（參數 cta_position 標示是哪個按鈕）、tax_calc（稅金試算）
 */
(function () {
  var GA_ID = '';
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
  if (GA_ID) {
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
    window.gtag('js', new Date());
    window.gtag('config', GA_ID);
  }
  document.addEventListener('click', function (e) {
    var a = e.target.closest ? e.target.closest('a[href]') : null;
    if (!a) return;
    var h = a.getAttribute('href') || '';
    var name = h.indexOf('tel:') === 0 ? 'phone_call_click' : (h.indexOf('line.me') > -1 ? 'line_click' : '');
    if (!name) return;
    window.gtag('event', name, {
      cta_position: a.getAttribute('data-cta') || 'other',
      page_path: location.pathname,
      transport_type: 'beacon'
    });
  }, true);
})();
