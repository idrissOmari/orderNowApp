import { element, by, ElementFinder } from 'protractor';

export class ProductOrderComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-product-order-ona div table .btn-danger'));
  title = element.all(by.css('jhi-product-order-ona div h2#page-heading span')).first();
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

export class ProductOrderUpdatePage {
  pageTitle = element(by.id('jhi-product-order-ona-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  quantityInput = element(by.id('field_quantity'));

  productSelect = element(by.id('field_product'));
  orderSelect = element(by.id('field_order'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getText();
  }

  async setQuantityInput(quantity: string): Promise<void> {
    await this.quantityInput.sendKeys(quantity);
  }

  async getQuantityInput(): Promise<string> {
    return await this.quantityInput.getAttribute('value');
  }

  async productSelectLastOption(): Promise<void> {
    await this.productSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async productSelectOption(option: string): Promise<void> {
    await this.productSelect.sendKeys(option);
  }

  getProductSelect(): ElementFinder {
    return this.productSelect;
  }

  async getProductSelectedOption(): Promise<string> {
    return await this.productSelect.element(by.css('option:checked')).getText();
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

export class ProductOrderDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-productOrder-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-productOrder'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
