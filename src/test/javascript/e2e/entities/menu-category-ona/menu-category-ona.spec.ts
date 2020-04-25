import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { MenuCategoryComponentsPage, MenuCategoryDeleteDialog, MenuCategoryUpdatePage } from './menu-category-ona.page-object';

const expect = chai.expect;

describe('MenuCategory e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let menuCategoryComponentsPage: MenuCategoryComponentsPage;
  let menuCategoryUpdatePage: MenuCategoryUpdatePage;
  let menuCategoryDeleteDialog: MenuCategoryDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load MenuCategories', async () => {
    await navBarPage.goToEntity('menu-category-ona');
    menuCategoryComponentsPage = new MenuCategoryComponentsPage();
    await browser.wait(ec.visibilityOf(menuCategoryComponentsPage.title), 5000);
    expect(await menuCategoryComponentsPage.getTitle()).to.eq('Menu Categories');
    await browser.wait(
      ec.or(ec.visibilityOf(menuCategoryComponentsPage.entities), ec.visibilityOf(menuCategoryComponentsPage.noResult)),
      1000
    );
  });

  it('should load create MenuCategory page', async () => {
    await menuCategoryComponentsPage.clickOnCreateButton();
    menuCategoryUpdatePage = new MenuCategoryUpdatePage();
    expect(await menuCategoryUpdatePage.getPageTitle()).to.eq('Create or edit a Menu Category');
    await menuCategoryUpdatePage.cancel();
  });

  it('should create and save MenuCategories', async () => {
    const nbButtonsBeforeCreate = await menuCategoryComponentsPage.countDeleteButtons();

    await menuCategoryComponentsPage.clickOnCreateButton();

    await promise.all([menuCategoryUpdatePage.setLabelInput('label'), menuCategoryUpdatePage.menuSelectLastOption()]);

    expect(await menuCategoryUpdatePage.getLabelInput()).to.eq('label', 'Expected Label value to be equals to label');

    await menuCategoryUpdatePage.save();
    expect(await menuCategoryUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await menuCategoryComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last MenuCategory', async () => {
    const nbButtonsBeforeDelete = await menuCategoryComponentsPage.countDeleteButtons();
    await menuCategoryComponentsPage.clickOnLastDeleteButton();

    menuCategoryDeleteDialog = new MenuCategoryDeleteDialog();
    expect(await menuCategoryDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Menu Category?');
    await menuCategoryDeleteDialog.clickOnConfirmButton();

    expect(await menuCategoryComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
