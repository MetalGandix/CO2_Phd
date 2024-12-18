
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
    'index.csr.html': {size: 4229, hash: '33bedc1eda3451b1681caa92a3c6c0559934c75625767ad5d513bd6dd6691955', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 4742, hash: 'd7c451f929d1fdb8b3ea4e1d4e8cda70401664d5f34a9999793d48b3a5fe5d9a', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'register/index.html': {size: 10645, hash: '79003e88f5b9f77c631ae88379b26b0f7aeb6f67d65c600a938ffac41d685ffc', text: () => import('./assets-chunks/register_index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 10645, hash: '79003e88f5b9f77c631ae88379b26b0f7aeb6f67d65c600a938ffac41d685ffc', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'myco2/index.html': {size: 10645, hash: '79003e88f5b9f77c631ae88379b26b0f7aeb6f67d65c600a938ffac41d685ffc', text: () => import('./assets-chunks/myco2_index_html.mjs').then(m => m.default)},
    'admin/index.html': {size: 10645, hash: '79003e88f5b9f77c631ae88379b26b0f7aeb6f67d65c600a938ffac41d685ffc', text: () => import('./assets-chunks/admin_index_html.mjs').then(m => m.default)},
    'tips/index.html': {size: 10645, hash: '79003e88f5b9f77c631ae88379b26b0f7aeb6f67d65c600a938ffac41d685ffc', text: () => import('./assets-chunks/tips_index_html.mjs').then(m => m.default)},
    'co2-input/index.html': {size: 10645, hash: '79003e88f5b9f77c631ae88379b26b0f7aeb6f67d65c600a938ffac41d685ffc', text: () => import('./assets-chunks/co2-input_index_html.mjs').then(m => m.default)},
    'styles-5INURTSO.css': {size: 0, hash: 'menYUTfbRu8', text: () => import('./assets-chunks/styles-5INURTSO_css.mjs').then(m => m.default)}
  },
};
