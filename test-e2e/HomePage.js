import { Selector } from 'testcafe';

// NOTE: the app will be saved from /dist with http-server, which defaults at 8080 port
fixture('HomePage').page('http://localhost:8090'); // docker.for.mac.localhost works on local
test('Test Anki title page', async (t) => {
  await t.expect(Selector('#title').innerText).eql('Anki');
});
