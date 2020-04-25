import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { OrderComponentsPage, OrderDeleteDialog, OrderUpdatePage } from './order-ona.page-object';

const expect = chai.expect;

describe('Order e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let orderComponentsPage: OrderComponentsPage;
  let orderUpdatePage: OrderUpdatePage;
  let orderDeleteDialog: OrderDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Orders', async () => {
    await navBarPage.goToEntity('order-ona');
    orderComponentsPage = new OrderComponentsPage();
    await browser.wait(ec.visibilityOf(orderComponentsPage.title), 5000);
    expect(await orderComponentsPage.getTitle()).to.eq('Orders');
    await browser.wait(ec.or(ec.visibilityOf(orderComponentsPage.entities), ec.visibilityOf(orderComponentsPage.noResult)), 1000);
  });

  it('should load create Order page', async () => {
    await orderComponentsPage.clickOnCreateButton();
    orderUpdatePage = new OrderUpdatePage();
    expect(await orderUpdatePage.getPageTitle()).to.eq('Create or edit a Order');
    await orderUpdatePage.cancel();
  });

  it('should create and save Orders', async () => {
    const nbButtonsBeforeCreate = await orderComponentsPage.countDeleteButtons();

    await orderComponentsPage.clickOnCreateButton();

    await promise.all([
      orderUpdatePage.setTotalPriceInput('5'),
      orderUpdatePage.statusSelectLastOption(),
      orderUpdatePage.setCreateDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      orderUpdatePage.setUpdateDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM')
    ]);

    expect(await orderUpdatePage.getTotalPriceInput()).to.eq('5', 'Expected totalPrice value to be equals to 5');
    expect(await orderUpdatePage.getCreateDateInput()).to.contain(
      '2001-01-01T02:30',
      'Expected createDate value to be equals to 2000-12-31'
    );
    expect(await orderUpdatePage.getUpdateDateInput()).to.contain(
      '2001-01-01T02:30',
      'Expected updateDate value to be equals to 2000-12-31'
    );

    await orderUpdatePage.save();
    expect(await orderUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await orderComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Order', async () => {
    const nbButtonsBeforeDelete = await orderComponentsPage.countDeleteButtons();
    await orderComponentsPage.clickOnLastDeleteButton();

    orderDeleteDialog = new OrderDeleteDialog();
    expect(await orderDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Order?');
    await orderDeleteDialog.clickOnConfirmButton();

    expect(await orderComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
