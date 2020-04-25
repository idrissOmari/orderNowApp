import { element, by, ElementFinder } from 'protractor';

export class MenuCategoryComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-menu-category-ona div table .btn-danger'));
  title = element.all(by.css('jhi-menu-category-ona div h2#page-heading span')).first();
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

export class MenuCategoryUpdatePage {
  pageTitle = element(by.id('jhi-menu-category-ona-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  labelInput = element(by.id('field_label'));

  menuSelect = element(by.id('field_menu'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getText();
  }

  async setLabelInput(label: string): Promise<void> {
    await this.labelInput.sendKeys(label);
  }

  async getLabelInput(): Promise<string> {
    return await this.labelInput.getAttribute('value');
  }

  async menuSelectLastOption(): Promise<void> {
    await this.menuSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async menuSelectOption(option: string): Promise<void> {
    await this.menuSelect.sendKeys(option);
  }

  getMenuSelect(): ElementFinder {
    return this.menuSelect;
  }

  async getMenuSelectedOption(): Promise<string> {
    return await this.menuSelect.element(by.css('option:checked')).getText();
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

export class MenuCategoryDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-menuCategory-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-menuCategory'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
