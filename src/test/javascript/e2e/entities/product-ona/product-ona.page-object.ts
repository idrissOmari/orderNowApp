import { element, by, ElementFinder } from 'protractor';

export class ProductComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-product-ona div table .btn-danger'));
  title = element.all(by.css('jhi-product-ona div h2#page-heading span')).first();
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

export class ProductUpdatePage {
  pageTitle = element(by.id('jhi-product-ona-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  nameInput = element(by.id('field_name'));
  priceInput = element(by.id('field_price'));

  menuCategorySelect = element(by.id('field_menuCategory'));
  formulaSelect = element(by.id('field_formula'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getText();
  }

  async setNameInput(name: string): Promise<void> {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput(): Promise<string> {
    return await this.nameInput.getAttribute('value');
  }

  async setPriceInput(price: string): Promise<void> {
    await this.priceInput.sendKeys(price);
  }

  async getPriceInput(): Promise<string> {
    return await this.priceInput.getAttribute('value');
  }

  async menuCategorySelectLastOption(): Promise<void> {
    await this.menuCategorySelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async menuCategorySelectOption(option: string): Promise<void> {
    await this.menuCategorySelect.sendKeys(option);
  }

  getMenuCategorySelect(): ElementFinder {
    return this.menuCategorySelect;
  }

  async getMenuCategorySelectedOption(): Promise<string> {
    return await this.menuCategorySelect.element(by.css('option:checked')).getText();
  }

  async formulaSelectLastOption(): Promise<void> {
    await this.formulaSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async formulaSelectOption(option: string): Promise<void> {
    await this.formulaSelect.sendKeys(option);
  }

  getFormulaSelect(): ElementFinder {
    return this.formulaSelect;
  }

  async getFormulaSelectedOption(): Promise<string> {
    return await this.formulaSelect.element(by.css('option:checked')).getText();
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

export class ProductDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-product-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-product'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
