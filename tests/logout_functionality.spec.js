const{test,expect}=require("@playwright/test")
const { pageObjectManager } = require("../page_object_class/pageObjectManager")
const testData = require("../utils/testData")

let context
let page
let logoutPageObj

test.beforeAll(async({browser})=>{
    context= await browser.newContext()
    page= await context.newPage()
    const PageObjectManagerObj=new pageObjectManager(page)
    const loginPageObj=PageObjectManagerObj.getLoginPage()
    await loginPageObj.goToLoginPage()
    await loginPageObj.signIn(testData.validCredentials.email, testData.validCredentials.password)
    console.log("solve the captcha if appears and then resume")
    await page.pause()
    await expect(loginPageObj.userProfileIcon).toBeVisible()
},{ timeout: 50000 })

test("Verify that a user can log out successfully", async()=>{
   const PageObjectManagerObj=new pageObjectManager(page)
   logoutPageObj=PageObjectManagerObj.getLogoutPage()
   await logoutPageObj.logout()
   await expect(logoutPageObj.signUp).toBeVisible()
})

test("Ensure the user cannot access secure pages (e.g., “My Books”) after logging out",async()=>{
    const PageObjectManagerObj=new pageObjectManager(page)
    logoutPageObj=PageObjectManagerObj.getLogoutPage()
    await logoutPageObj.logout()
    await expect(logoutPageObj.signUp).toBeVisible()
    await page.goto("https://www.goodreads.com/search")
    await logoutPageObj.myBooks.click()
    await expect(logoutPageObj.notAMember).toBeVisible()
})