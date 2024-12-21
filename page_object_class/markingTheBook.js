class markingTheBook{

    constructor(page){
       this.page=page
       this.markWantToRead=page.locator("//span[text()='Want to Read']").nth(0)
       this.removeBookFromShelves=page.locator('[title="Remove this book from your shelves"]')
       this.myBooks=page.locator("//a[text()='My Books']").nth(0)
       this.listOfBooks=page.locator("//tbody/tr")
    }

    async markTheBook(){
        await this.markWantToRead.click()
    }
}

module.exports={markingTheBook}