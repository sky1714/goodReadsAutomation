const{test,expect}=require("@playwright/test")
const{pageObjectManager}=require("../page_object_class/pageObjectManager")
const { timeout } = require("../playwright.config")
const { only } = require("node:test")
const testData = require("../utils/testData")


let context
let page
test.beforeAll(async({browser})=>{
    context= await browser.newContext();
    page= await context.newPage();
    const PageObjectManagerObj=new pageObjectManager(page)
    const loginPageObj=PageObjectManagerObj.getLoginPage()
    await loginPageObj.goToLoginPage()
    await loginPageObj.signIn(testData.validCredentials.email, testData.validCredentials.password)
    await expect(loginPageObj.userProfileIcon).toBeVisible()
},{ timeout: 50000 })

async function searchAndMarkBook(page, bookName) {
    const PageObjectManagerObj = new pageObjectManager(page)
    const searchBookObj = PageObjectManagerObj.getSearchBookPage()
    const markingTheBookObj = PageObjectManagerObj.getMarkingTheBook()
    await searchBookObj.searchForABook(bookName)
    await expect(searchBookObj.searchresults.nth(0)).toBeVisible()
    await markingTheBookObj.markTheBook()
    await expect(markingTheBookObj.removeBookFromShelves).toBeVisible()
}
test("Verify that a user can mark a book as “Want to Read” from the search results",async()=>{
    await searchAndMarkBook(page,testData.bookName)
})

test("Verify that a book marked as “Want to Read” appears in the “My Books” section",async()=>{
    await searchAndMarkBook(page,testData.bookName)
    const PageObjectManagerObj=new pageObjectManager(page)
    const markingTheBookObj=PageObjectManagerObj.getMarkingTheBook()
    const rows=await markingTheBookObj.listOfBooks
    const countBooks=await rows.count()

    for (let i = 1; i < countBooks; i++) {
        const bookLocator = markingTheBookObj.listOfBooks.nth(i)
        let content = await bookLocator.textContent()
        content=content.trim()
        expect(content).toContain(testData.bookName)
    }
    
    
})
