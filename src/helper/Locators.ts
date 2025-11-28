export const Locators = {
  footerLink: (text: string) =>
    `//*[@class='footerListItemLink' and text()='${text}']`,
  headerSearchButton: () => `//div[@class='pageHeaderButton search']/button`,
};
