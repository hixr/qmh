(function() {
  
  function injectScript (src) {
    var script = document.createElement('script');
    script.type = 'application/javascript';
    script.charset = 'UTF-8';
    script.src = src;  	
    document.head.appendChild(script);
  };
  
  // Begin injecting
  injectScript('https://raw.github.com/hixr/qmh/master/remote/packages/shadow_dom/shadow_dom.debug.js');
  injectScript('https://raw.github.com/hixr/qmh/master/remote/packages/custom_element/custom-elements.debug.js');
  injectScript('https://raw.github.com/hixr/qmh/master/remote/packages/browser/interop.js');
  injectScript('https://raw.github.com/hixr/qmh/master/remote/qmh.html_bootstrap.dart.js');
  
})();