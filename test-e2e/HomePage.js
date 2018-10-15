import { Selector, Role } from 'testcafe';


// NOTE: the app will be saved from /dist with http-server, which defaults at 8080 port

const url = process.env.NODE_ENV === 'production' ? 'http://10.0.0.10' : 'http://localhost:8090';

const loginButton = Selector('#login-button');
const logoutButton = Selector('#logout-button');
const loginForm = Selector('.login-form');
const header = Selector('#header');

// NOTE: on circleci to read from environment
const testUser = Role(url, async (t) => {
  await t
    .typeText('#login-email', 'test@gmail.com')
    .typeText('#login-password', 'test1234')
    .click(loginButton);
});

const wrongTestUser = Role(url, async (t) => {
  await t
    .typeText('#login-email', 'test@gmail.com')
    .typeText('#login-password', 'test123456')
    .click(loginButton);
});

fixture('HomePage').page(url); // docker.for.mac.localhost works on local mac when accessing from docker, --network=host is not needed
test('Test Anki has login page with right title page before login', async (t) => {
  await t
    .expect(loginForm.count).eql(1)
    .expect(logoutButton.count).eql(0)
    .expect(Selector('h2').innerText)
    .eql('Log In To Anki');
});

// const getPageUrl = ClientFunction(() => window.location.href.toString());

test('Test that testUser can login then logout', async (t) => {
  await t
    .useRole(testUser)
    .expect(loginForm.count).eql(0)
    .expect(header.count)
    .eql(1)
    .expect(logoutButton.count)
    .eql(1)
    .click(logoutButton)
    .expect(logoutButton.count)
    .eql(0);
});

test('Test that wrongTestUser cannot login', async (t) => {
  await t.useRole(wrongTestUser)
    .expect(loginForm.count).eql(1);
});


// Test for reload
// https://testcafe-discuss.devexpress.com/t/how-to-trigger-a-page-reload/542
