import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { RestaurantTableComponentsPage, RestaurantTableDeleteDialog, RestaurantTableUpdatePage } from './restaurant-table-ona.page-object';

const expect = chai.expect;

describe('RestaurantTable e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let restaurantTableComponentsPage: RestaurantTableComponentsPage;
  let restaurantTableUpdatePage: RestaurantTableUpdatePage;
  let restaurantTableDeleteDialog: RestaurantTableDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load RestaurantTables', async () => {
    await navBarPage.goToEntity('restaurant-table-ona');
    restaurantTableComponentsPage = new RestaurantTableComponentsPage();
    await browser.wait(ec.visibilityOf(restaurantTableComponentsPage.title), 5000);
    expect(await restaurantTableComponentsPage.getTitle()).to.eq('Restaurant Tables');
    await browser.wait(
      ec.or(ec.visibilityOf(restaurantTableComponentsPage.entities), ec.visibilityOf(restaurantTableComponentsPage.noResult)),
      1000
    );
  });

  it('should load create RestaurantTable page', async () => {
    await restaurantTableComponentsPage.clickOnCreateButton();
    restaurantTableUpdatePage = new RestaurantTableUpdatePage();
    expect(await restaurantTableUpdatePage.getPageTitle()).to.eq('Create or edit a Restaurant Table');
    await restaurantTableUpdatePage.cancel();
  });

  it('should create and save RestaurantTables', async () => {
    const nbButtonsBeforeCreate = await restaurantTableComponentsPage.countDeleteButtons();

    await restaurantTableComponentsPage.clickOnCreateButton();

    await promise.all([
      restaurantTableUpdatePage.setTNumberInput('5'),
      restaurantTableUpdatePage.tStatusSelectLastOption(),
      restaurantTableUpdatePage.restaurantSelectLastOption(),
      restaurantTableUpdatePage.orderSelectLastOption()
    ]);

    expect(await restaurantTableUpdatePage.getTNumberInput()).to.eq('5', 'Expected tNumber value to be equals to 5');

    await restaurantTableUpdatePage.save();
    expect(await restaurantTableUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await restaurantTableComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last RestaurantTable', async () => {
    const nbButtonsBeforeDelete = await restaurantTableComponentsPage.countDeleteButtons();
    await restaurantTableComponentsPage.clickOnLastDeleteButton();

    restaurantTableDeleteDialog = new RestaurantTableDeleteDialog();
    expect(await restaurantTableDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Restaurant Table?');
    await restaurantTableDeleteDialog.clickOnConfirmButton();

    expect(await restaurantTableComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
