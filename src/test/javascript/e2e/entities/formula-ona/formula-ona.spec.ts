import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { FormulaComponentsPage, FormulaDeleteDialog, FormulaUpdatePage } from './formula-ona.page-object';

const expect = chai.expect;

describe('Formula e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let formulaComponentsPage: FormulaComponentsPage;
  let formulaUpdatePage: FormulaUpdatePage;
  let formulaDeleteDialog: FormulaDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Formulas', async () => {
    await navBarPage.goToEntity('formula-ona');
    formulaComponentsPage = new FormulaComponentsPage();
    await browser.wait(ec.visibilityOf(formulaComponentsPage.title), 5000);
    expect(await formulaComponentsPage.getTitle()).to.eq('Formulas');
    await browser.wait(ec.or(ec.visibilityOf(formulaComponentsPage.entities), ec.visibilityOf(formulaComponentsPage.noResult)), 1000);
  });

  it('should load create Formula page', async () => {
    await formulaComponentsPage.clickOnCreateButton();
    formulaUpdatePage = new FormulaUpdatePage();
    expect(await formulaUpdatePage.getPageTitle()).to.eq('Create or edit a Formula');
    await formulaUpdatePage.cancel();
  });

  it('should create and save Formulas', async () => {
    const nbButtonsBeforeCreate = await formulaComponentsPage.countDeleteButtons();

    await formulaComponentsPage.clickOnCreateButton();

    await promise.all([
      formulaUpdatePage.setLabelInput('label'),
      formulaUpdatePage.setPriceInput('5'),
      formulaUpdatePage.menuSelectLastOption()
    ]);

    expect(await formulaUpdatePage.getLabelInput()).to.eq('label', 'Expected Label value to be equals to label');
    expect(await formulaUpdatePage.getPriceInput()).to.eq('5', 'Expected price value to be equals to 5');

    await formulaUpdatePage.save();
    expect(await formulaUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await formulaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Formula', async () => {
    const nbButtonsBeforeDelete = await formulaComponentsPage.countDeleteButtons();
    await formulaComponentsPage.clickOnLastDeleteButton();

    formulaDeleteDialog = new FormulaDeleteDialog();
    expect(await formulaDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Formula?');
    await formulaDeleteDialog.clickOnConfirmButton();

    expect(await formulaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
