import { browser, logging } from 'protractor';
import { AppPage } from './app.po';



describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', async () => {
    await page.navigateTo();
    expect(await page.getTitleText()).toEqual('conFusion app is running!');
  });

  // it('should display message saying Ristorante Con Fusion', () => {
  //   page.navigateTo('/');
  //   expect(page.getParagraphText('app-root h1')).toEqual('Ristorante Con Fusion');
  // });

  // it('should navigate to about us page by clicking on the link', () => {
  //   page.navigateTo('/');

  //   const navlink = page.getAllElements('a').get(1);
  //   navlink.click();

  //   expect(page.getParagraphText('h3')).toBe('About Us');
  // });

  // it('should enter a new comment for the first dish', () => {
  //   page.navigateTo('/dishdetail/0');

  //   const newAuthor = page.getElement('input[type=text]');
  //   newAuthor.sendKeys('Test Author');

  //   const newComment = page.getElement('textarea');
  //   newComment.sendKeys('Test Comment');

  //   const newSubmitButton = page.getElement('button[type=submit]');
  //   newSubmitButton.click();

  //   browser.pause();
  // });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
