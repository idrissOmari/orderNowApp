import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { FormulaOrderComponentsPage, FormulaOrderDeleteDialog, FormulaOrderUpdatePage } from './formula-order-ona.page-object';

const expect = chai.expect;

describe('FormulaOrder e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let formulaOrderComponentsPage: FormulaOrderComponentsPage;
  let formulaOrderUpdatePage: FormulaOrderUpdatePage;
  let formulaOrderDeleteDialog: FormulaOrderDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load FormulaOrders', async () => {
    await navBarPage.goToEntity('formula-order-ona');
    formulaOrderComponentsPage = new FormulaOrderComponentsPage();
    await browser.wait(ec.visibilityOf(formulaOrderComponentsPage.title), 5000);
    expect(await formulaOrderComponentsPage.getTitle()).to.eq('Formula Orders');
    await browser.wait(
      ec.or(ec.visibilityOf(formulaOrderComponentsPage.entities), ec.visibilityOf(formulaOrderComponentsPage.noResult)),
      1000
    );
  });

  it('should load create FormulaOrder page', async () => {
    await formulaOrderComponentsPage.clickOnCreateButton();
    formulaOrderUpdatePage = new FormulaOrderUpdatePage();
    expect(await formulaOrderUpdatePage.getPageTitle()).to.eq('Create or edit a Formula Order');
    await formulaOrderUpdatePage.cancel();
  });

  it('should create and save FormulaOrders', async () => {
    const nbButtonsBeforeCreate = await formulaOrderComponentsPage.countDeleteButtons();

    await formulaOrderComponentsPage.clickOnCreateButton();

    await promise.all([
      formulaOrderUpdatePage.setQuantityInput('5'),
      // formulaOrderUpdatePage.listProductSelectLastOption(),
      formulaOrderUpdatePage.orderSelectLastOption()
    ]);

    expect(await formulaOrderUpdatePage.getQuantityInput()).to.eq('5', 'Expected quantity value to be equals to 5');

    await formulaOrderUpdatePage.save();
    expect(await formulaOrderUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await formulaOrderComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last FormulaOrder', async () => {
    const nbButtonsBeforeDelete = await formulaOrderComponentsPage.countDeleteButtons();
    await formulaOrderComponentsPage.clickOnLastDeleteButton();

    formulaOrderDeleteDialog = new FormulaOrderDeleteDialog();
    expect(await formulaOrderDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Formula Order?');
    await formulaOrderDeleteDialog.clickOnConfirmButton();

    expect(await formulaOrderComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
