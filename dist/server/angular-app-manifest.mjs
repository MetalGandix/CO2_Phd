
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: 'https://MetalGandix.github.io/CO2_Phd/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "redirectTo": "/https://MetalGandix.github.io/CO2_Phd/login",
    "route": "/https://MetalGandix.github.io/CO2_Phd"
  },
  {
    "renderMode": 2,
    "route": "/https://MetalGandix.github.io/CO2_Phd/login"
  },
  {
    "renderMode": 2,
    "route": "/https://MetalGandix.github.io/CO2_Phd/register"
  },
  {
    "renderMode": 2,
    "route": "/https://MetalGandix.github.io/CO2_Phd/tips"
  },
  {
    "renderMode": 2,
    "route": "/https://MetalGandix.github.io/CO2_Phd/co2-input"
  },
  {
    "renderMode": 2,
    "route": "/https://MetalGandix.github.io/CO2_Phd/myco2"
  },
  {
    "renderMode": 2,
    "route": "/https://MetalGandix.github.io/CO2_Phd/admin"
  },
  {
    "renderMode": 2,
    "redirectTo": "/https://MetalGandix.github.io/CO2_Phd/login",
    "route": "/https://MetalGandix.github.io/CO2_Phd/**"
  }
],
  assets: {
    'index.csr.html': {size: 4229, hash: '9fc8767d7a90f1ac45dd220071cbb81e1935505b7b49e92fd46924e551be266a', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 4742, hash: '0e9667d946ba2b1ffbcd90cd021be9492f83d60450209564c02f924a4713e69f', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'register/index.html': {size: 10753, hash: '5623dc3b863557bd9af6c5c582c498504b5cde30f89b68b521b7ee2a99b5a193', text: () => import('./assets-chunks/register_index_html.mjs').then(m => m.default)},
    'tips/index.html': {size: 10753, hash: '5623dc3b863557bd9af6c5c582c498504b5cde30f89b68b521b7ee2a99b5a193', text: () => import('./assets-chunks/tips_index_html.mjs').then(m => m.default)},
    'myco2/index.html': {size: 10753, hash: '5623dc3b863557bd9af6c5c582c498504b5cde30f89b68b521b7ee2a99b5a193', text: () => import('./assets-chunks/myco2_index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 10753, hash: '5623dc3b863557bd9af6c5c582c498504b5cde30f89b68b521b7ee2a99b5a193', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'admin/index.html': {size: 10753, hash: '5623dc3b863557bd9af6c5c582c498504b5cde30f89b68b521b7ee2a99b5a193', text: () => import('./assets-chunks/admin_index_html.mjs').then(m => m.default)},
    'co2-input/index.html': {size: 10753, hash: '5623dc3b863557bd9af6c5c582c498504b5cde30f89b68b521b7ee2a99b5a193', text: () => import('./assets-chunks/co2-input_index_html.mjs').then(m => m.default)},
    'styles-5INURTSO.css': {size: 0, hash: 'menYUTfbRu8', text: () => import('./assets-chunks/styles-5INURTSO_css.mjs').then(m => m.default)}
  },
};
