class searchBook{

    constructor(page){
        this.page=page
        this.BookName=page.locator("[placeholder$='Search books']").nth(0)
        this.submit=page.locator('button[type="submit"]').nth(0)
        this.bookFound=page.locator("//h3[contains(text(), 'Page 1')]")
        this.bookNotFound=page.locator("//h3[contains(text(), 'No results.')]")
        this.searchresults=page.locator("//tr[.//@title]")
    }

    async searchForABook(book_name){
        await this.page.goto("https://www.goodreads.com/search")
        await this.BookName.fill(book_name)
        await this.submit.click()
    }
}

module.exports={searchBook}