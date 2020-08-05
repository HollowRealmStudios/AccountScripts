const selenium = require("selenium-webdriver");
const pwdgen = require("password-generator");
const prompt = require("node-prompt")

module.exports = {
  name: "Google",
  description: "Creates a Gmail account with associated mail address",
  license: "Icon made by Freepik from www.flaticon.com",
  headless: false,
  create: async (credentials) => {
    await driver.get("https://accounts.google.com/signup/v2/webcreateaccount?continue=https%3A%2F%2Fwww.google.com%2F&hl=en&dsh=S-1627029711%3A1595605022997153&gmb=exp&biz=false&flowName=GlifWebSignIn&flowEntry=SignUp");
    await driver.findElement(By.xpath("//*[@id=\"firstName\"]")).click();
    await driver.findElement(By.xpath("//*[@id=\"firstName\"]")).sendKeys(credentials.firstName);
    await driver.findElement(By.xpath("//*[@id=\"lastName\"]")).click();
    await driver.findElement(By.xpath("//*[@id=\"lastName\"]")).sendKeys(credentials.lastName);
    await driver.findElement(By.xpath("//*[@id=\"username\"]")).click();
    let mail;
    while (mail === null || mail === undefined) {
      mail = await prompt({
        title: "Desired E-Mail address?",
        label: "E-Mail:",
        value: "change.me@gmail.com",
        inputAttrs: {
          type: "email"
        },
        type: "input"
      });
    }
    await driver.findElement(By.xpath("//*[@id=\"username\"]")).sendKeys(mail);
    const password = pwdgen(15, false);
    await driver.findElement(By.xpath("/html/body/div[1]/div/div[2]/div[1]/div[2]/form/div[2]/div/div[1]/div[3]/div[1]/div[1]/div/div/div[1]/div/div[1]/input")).click();
    await driver.findElement(By.xpath("/html/body/div[1]/div/div[2]/div[1]/div[2]/form/div[2]/div/div[1]/div[3]/div[1]/div[1]/div/div/div[1]/div/div[1]/input")).sendKeys(password);
    await driver.findElement(By.xpath("/html/body/div[1]/div/div[2]/div[1]/div[2]/form/div[2]/div/div[1]/div[3]/div[1]/div[3]/div/div/div[1]/div/div[1]/input")).click();
    await driver.findElement(By.xpath("/html/body/div[1]/div/div[2]/div[1]/div[2]/form/div[2]/div/div[1]/div[3]/div[1]/div[3]/div/div/div[1]/div/div[1]/input")).sendKeys(password);
    await driver.findElement(By.xpath("/html/body/div[1]/div/div[2]/div[1]/div[2]/form/div[2]/div/div[2]/div[1]/div/span/span")).click();
    let errorClass = await driver.findElement(By.className("o6cuMc"));
    if(String(await errorClass.getAttribute("innerHTML")).includes("That username is taken. Try another.")) return undefined;
    return {
      firstName: credentials.firstName,
      lastName: credentials.lastName,
      mail: mail,
      password: password
    }
  },
  modify: async () => {},
  delete: async () => {}
}