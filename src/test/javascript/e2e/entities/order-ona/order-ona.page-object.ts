import { element, by, ElementFinder } from 'protractor';

export class OrderComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-order-ona div table .btn-danger'));
  title = element.all(by.css('jhi-order-ona div h2#page-heading span')).first();
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

export class OrderUpdatePage {
  pageTitle = element(by.id('jhi-order-ona-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  totalPriceInput = element(by.id('field_totalPrice'));
  statusSelect = element(by.id('field_status'));
  createDateInput = element(by.id('field_createDate'));
  updateDateInput = element(by.id('field_updateDate'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getText();
  }

  async setTotalPriceInput(totalPrice: string): Promise<void> {
    await this.totalPriceInput.sendKeys(totalPrice);
  }

  async getTotalPriceInput(): Promise<string> {
    return await this.totalPriceInput.getAttribute('value');
  }

  async setStatusSelect(status: string): Promise<void> {
    await this.statusSelect.sendKeys(status);
  }

  async getStatusSelect(): Promise<string> {
    return await this.statusSelect.element(by.css('option:checked')).getText();
  }

  async statusSelectLastOption(): Promise<void> {
    await this.statusSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async setCreateDateInput(createDate: string): Promise<void> {
    await this.createDateInput.sendKeys(createDate);
  }

  async getCreateDateInput(): Promise<string> {
    return await this.createDateInput.getAttribute('value');
  }

  async setUpdateDateInput(updateDate: string): Promise<void> {
    await this.updateDateInput.sendKeys(updateDate);
  }

  async getUpdateDateInput(): Promise<string> {
    return await this.updateDateInput.getAttribute('value');
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

export class OrderDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-order-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-order'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
