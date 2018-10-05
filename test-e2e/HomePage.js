import { Selector } from 'testcafe';

// NOTE: the app will be saved from /dist with http-server, which defaults at 8080 port
fixture('HomePage').page('http://10.0.0.10'); // docker.for.mac.localhost works on local mac when accessing from docker, --network=host is not needed
test('Test Anki title page', async (t) => {
  await t.expect(Selector('#title').innerText).eql('Anki');
});
