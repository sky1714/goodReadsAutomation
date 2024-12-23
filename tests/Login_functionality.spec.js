const{test,expect}=require("@playwright/test")
const{pageObjectManager}=require("../page_object_class/pageObjectManager")
const testData = require("../utils/testData")

async function login(page, email, password) {
    const PageObjectManagerObj = new pageObjectManager(page)
    const loginPageObj = PageObjectManagerObj.getLoginPage()
    await loginPageObj.goToLoginPage()
    await loginPageObj.signIn(email, password)
    /*if a puzzle occurs, solve it manually and then click on resume test on the playwright test debugger */
    await page.pause() 
  }
test("Verify that a user can log in to Goodreads with valid credentials", async({page})=>{
    await login(page, testData.validCredentials.email, testData.validCredentials.password)
    const PageObjectManagerObj = new pageObjectManager(page)
    const loginPageObj = PageObjectManagerObj.getLoginPage()
    await expect(loginPageObj.userProfileIcon).toBeVisible()
})

test("Verify the error message displayed when entering invalid credentials", async({page})=>{
  await login(page, testData.invalidCredentials.email, testData.invalidCredentials.password)
  const PageObjectManagerObj = new pageObjectManager(page)
  const loginPageObj = PageObjectManagerObj.getLoginPage()
  await expect(loginPageObj.errorMessage).toBeVisible()
},{timeout:10000})


