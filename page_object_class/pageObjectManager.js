const {loginPage}=require("./loginPage")
const{searchBook}=require('./searchBook')
const{markingTheBook}=require("./markingTheBook")
const{logoutPage}=require("./logoutPage")
class pageObjectManager{

    constructor(page){
        this.page=page
        this.loginPage=new loginPage(page)
        this.searchBook=new searchBook(page)
        this.markingTheBook=new markingTheBook(page)
        this.logoutPage=new logoutPage(page)
    }

    getLoginPage(){
        return this.loginPage
    }

    getSearchBookPage(){
        return this.searchBook
    }

    getMarkingTheBook(){
        return this.markingTheBook
    }

    getLogoutPage(){
        return this.logoutPage
    }

}

module.exports={ pageObjectManager }
