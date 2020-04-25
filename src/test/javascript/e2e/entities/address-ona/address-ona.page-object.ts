import { element, by, ElementFinder } from 'protractor';

export class AddressComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-address-ona div table .btn-danger'));
  title = element.all(by.css('jhi-address-ona div h2#page-heading span')).first();
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

export class AddressUpdatePage {
  pageTitle = element(by.id('jhi-address-ona-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  adresse1Input = element(by.id('field_adresse1'));
  adresse2Input = element(by.id('field_adresse2'));
  postalCodeInput = element(by.id('field_postalCode'));
  cityInput = element(by.id('field_city'));
  countryInput = element(by.id('field_country'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getText();
  }

  async setAdresse1Input(adresse1: string): Promise<void> {
    await this.adresse1Input.sendKeys(adresse1);
  }

  async getAdresse1Input(): Promise<string> {
    return await this.adresse1Input.getAttribute('value');
  }

  async setAdresse2Input(adresse2: string): Promise<void> {
    await this.adresse2Input.sendKeys(adresse2);
  }

  async getAdresse2Input(): Promise<string> {
    return await this.adresse2Input.getAttribute('value');
  }

  async setPostalCodeInput(postalCode: string): Promise<void> {
    await this.postalCodeInput.sendKeys(postalCode);
  }

  async getPostalCodeInput(): Promise<string> {
    return await this.postalCodeInput.getAttribute('value');
  }

  async setCityInput(city: string): Promise<void> {
    await this.cityInput.sendKeys(city);
  }

  async getCityInput(): Promise<string> {
    return await this.cityInput.getAttribute('value');
  }

  async setCountryInput(country: string): Promise<void> {
    await this.countryInput.sendKeys(country);
  }

  async getCountryInput(): Promise<string> {
    return await this.countryInput.getAttribute('value');
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

export class AddressDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-address-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-address'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
