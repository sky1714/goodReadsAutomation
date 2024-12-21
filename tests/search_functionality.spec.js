const{test,expect}=require("@playwright/test")
const {pageObjectManager}=require("../page_object_class/pageObjectManager")
const testData = require("../utils/testData")


test("Verify that a user can search for a specific book by title",async({page})=>{
const PageObjectManagerObj=new pageObjectManager(page)
const searchBookobj=PageObjectManagerObj.getSearchBookPage()
    await searchBookobj.searchForABook(testData.bookName)
    await expect (searchBookobj.bookFound).toBeVisible()
})

test("Verify book search returns no results when book is not found", async({page})=>{
const PageObjectManagerObj=new pageObjectManager(page)
const searchBookobj=PageObjectManagerObj.getSearchBookPage()
await searchBookobj.searchForABook(testData.incorrectBookName)
await expect(searchBookobj.bookNotFound).toBeVisible()
})

test("Confirm that the search results include the correct book based on the entered title", async({page})=>{
const PageObjectManagerObj=new pageObjectManager(page)
const searchBookobj=PageObjectManagerObj.getSearchBookPage()
await searchBookobj.searchForABook(testData.bookName)
const rows =await page.locator("//tr[.//@title]")
const rowsCount= await rows.count()
console.log(rowsCount)

for(let i=0; i<rowsCount;i++){
    const rowTitle=await rows.nth(i).textContent()
    expect (rowTitle).toContain(testData.bookName)
}

})

test("Verify that the correct author’s name is displayed on the book details page",async({page})=>{
    const PageObjectManagerObj=new pageObjectManager(page)
    const searchBookobj=PageObjectManagerObj.getSearchBookPage()
    await searchBookobj.searchForABook(testData.bookName)
    await expect (searchBookobj.bookFound).toBeVisible()
    await expect(page.locator(`//span[contains(text(),'${testData.authorName}')]`)).toBeVisible()
})
