import { element, by, ElementFinder } from 'protractor';

export class RestaurantTableComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-restaurant-table-ona div table .btn-danger'));
  title = element.all(by.css('jhi-restaurant-table-ona div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getText();
  }
}

export class RestaurantTableUpdatePage {
  pageTitle = element(by.id('jhi-restaurant-table-ona-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  tNumberInput = element(by.id('field_tNumber'));
  tStatusSelect = element(by.id('field_tStatus'));

  restaurantSelect = element(by.id('field_restaurant'));
  orderSelect = element(by.id('field_order'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getText();
  }

  async setTNumberInput(tNumber: string): Promise<void> {
    await this.tNumberInput.sendKeys(tNumber);
  }

  async getTNumberInput(): Promise<string> {
    return await this.tNumberInput.getAttribute('value');
  }

  async setTStatusSelect(tStatus: string): Promise<void> {
    await this.tStatusSelect.sendKeys(tStatus);
  }

  async getTStatusSelect(): Promise<string> {
    return await this.tStatusSelect.element(by.css('option:checked')).getText();
  }

  async tStatusSelectLastOption(): Promise<void> {
    await this.tStatusSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async restaurantSelectLastOption(): Promise<void> {
    await this.restaurantSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async restaurantSelectOption(option: string): Promise<void> {
    await this.restaurantSelect.sendKeys(option);
  }

  getRestaurantSelect(): ElementFinder {
    return this.restaurantSelect;
  }

  async getRestaurantSelectedOption(): Promise<string> {
    return await this.restaurantSelect.element(by.css('option:checked')).getText();
  }

  async orderSelectLastOption(): Promise<void> {
    await this.orderSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async orderSelectOption(option: string): Promise<void> {
    await this.orderSelect.sendKeys(option);
  }

  getOrderSelect(): ElementFinder {
    return this.orderSelect;
  }

  async getOrderSelectedOption(): Promise<string> {
    return await this.orderSelect.element(by.css('option:checked')).getText();
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class RestaurantTableDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-restaurantTable-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-restaurantTable'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
