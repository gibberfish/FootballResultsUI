import { FootballResultsUiPage } from './app.po';

describe('football-results-ui App', () => {
  let page: FootballResultsUiPage;

  beforeEach(() => {
    page = new FootballResultsUiPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
