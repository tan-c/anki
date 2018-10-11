import { Selector } from 'testcafe';

// NOTE: the app will be saved from /dist with http-server, which defaults at 8080 port

const url = process.env.NODE_ENV === 'production' ? 'http://10.0.0.10' : 'http://localhost:8090';

fixture('HomePage').page(url); // docker.for.mac.localhost works on local mac when accessing from docker, --network=host is not needed
test('Test Anki title page', async (t) => {
  await t.expect(Selector('h2').innerText).eql('Log In');
});
