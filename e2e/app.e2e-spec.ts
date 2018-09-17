import { PiggyBackPage } from './app.po';

describe('PiggyBack App', () => {
  let page: PiggyBackPage;

  beforeEach(() => {
    page = new PiggyBackPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
