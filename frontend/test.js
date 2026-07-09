const { loginAction } = require('./src/modules/auth/actions/login');

async function test() {
  try {
    const res = await loginAction('owner@nexvelt.com', 'password');
    console.log('Result:', res);
  } catch (e) {
    console.log('Error caught:', e);
  }
}

test();
