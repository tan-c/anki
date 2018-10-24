import {
  Selector,
  Role
} from 'testcafe';

// NOTE: the app will be saved from /dist with http-server, which defaults at 8080 port

const url = process.env.NODE_ENV === 'production' ? 'http://10.0.0.10' : 'http://localhost:8090';

const showLoginPageButton = Selector('#show-login-page-button');
const loginButton = Selector('#login-button');
const rightAsideButton = Selector('#right-aside-button');
const logoutButton = Selector('#logout-button');
const loginForm = Selector('.login-form');
const header = Selector('div[data-role="header"]');

const testUserEmail = process.env.NODE_ENV === 'production' ? process.env.TEST_EMAIL : 'test@gmail.com';
const testUserPassword = process.env.NODE_ENV === 'production' ? process.env.TEST_PASSWORD : 'test1234';
// NOTE: on circleci to read from environment
// FIXME: the testUser is just not working because the redirect is taking too much time to happen... for now just use the raw way of doing thigs
// const testUser = Role(url, async (t) => {
//   await t
//     .typeText('#login-email', testUserEmail)
//     .typeText('#login-password', testUserPassword)
//     .click(loginButton);
// });

const wrongTestUser = Role(url, async (t) => {
  await t
    .typeText('#login-email', 'test@gmail.com')
    .typeText('#login-password', 'test123456')
    .click(loginButton);
});

fixture('HomePage').page(url); // docker.for.mac.localhost works on local mac when accessing from docker, --network=host is not needed
test('Test Anki has login page with right title page before login', async (t) => {
  await t
    .expect(loginForm.count).eql(0)
    .expect(showLoginPageButton.count).eql(1)
    .click(showLoginPageButton)
    .expect(loginForm.count)
    .eql(1)
    .expect(rightAsideButton.count)
    .eql(0)
    .expect(logoutButton.count)
    .eql(0)
    .expect(Selector('h2').innerText)
    .eql('Log In To Anki');
});

test('Test that testUser can login then logout', async (t) => {
  await t
    .expect(loginForm.count).eql(0)
    .expect(showLoginPageButton.count).eql(1)
    .click(showLoginPageButton)
    .expect(loginForm.count)
    .eql(1)
    .typeText('#login-email', testUserEmail)
    .typeText('#login-password', testUserPassword)
    .click(loginButton);
  // .useRole(testUser)
  // .navigateTo('/')
  // .wait(10000);

  // const errors = await t.getBrowserConsoleMessages();

  await t.expect(loginForm.count)
    .eql(0)
    .expect(header.count)
    .eql(1)
    .expect(rightAsideButton.count)
    .eql(1)
    .expect(logoutButton.count)
    .eql(0)
    .click(rightAsideButton)
    .expect(logoutButton.count)
    .eql(1)
    .click(logoutButton)
    .expect(logoutButton.count)
    .eql(0)
    .expect(loginForm.count)
    .eql(1);
});


test('Test that testUser can login then refresh but no need login', async (t) => {
  await t.expect(header.count)
    .eql(0)
    .expect(rightAsideButton.count).eql(0)
    .expect(logoutButton.count)
    .eql(0);

  await t
    .expect(loginForm.count).eql(0)
    .expect(showLoginPageButton.count).eql(1)
    .click(showLoginPageButton)
    .expect(loginForm.count)
    .eql(1)
    .typeText('#login-email', testUserEmail)
    .typeText('#login-password', testUserPassword)
    .click(loginButton)
    .expect(loginForm.count)
    .eql(0)
    .expect(header.count)
    .eql(1)
    .expect(rightAsideButton.count)
    .eql(1);
  // .expect(logoutButton.count)
  // .eql(1);

  await t.eval(() => location.reload(true));

  await t.expect(header.count)
    .eql(1)
    .expect(rightAsideButton.count).eql(1)
    .expect(logoutButton.count)
    .eql(0)
    .click(rightAsideButton)
    .expect(logoutButton.count)
    .eql(1);
});

test('Test that wrongTestUser cannot login then refresh still cannot login', async (t) => {
  await t
    .click(showLoginPageButton)
    .expect(loginForm.count)
    .eql(1)
    .useRole(wrongTestUser)
    .expect(loginForm.count)
    .eql(1);

  await t.eval(() => location.reload(true));

  await t.expect(header.count)
    .eql(0)
    .expect(rightAsideButton.count).eql(0)
    .expect(logoutButton.count)
    .eql(0);
});


// Test for reload
// https://testcafe-discuss.devexpress.com/t/how-to-trigger-a-page-reload/542
