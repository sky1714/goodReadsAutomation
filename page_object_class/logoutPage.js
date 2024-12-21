class logoutPage {


    constructor(page){
        this.page=page
        this.signUp=page.locator("//a[.='Sign up with email']")
        this.userProfileIcon=page.locator('[class="headerPersonalNav__icon"]').nth(0)
        this.signOut=page.locator("//a[text()='Sign out']").nth(0)
        this.myBooks=page.locator("//a[text()='My Books']").nth(0)
        this.notAMember=page.locator("//span[contains(.,'Not a member?')]")
    }

    async logout(){
        await this.userProfileIcon.click()
        await this.signOut.click()
    }

}

module.exports={logoutPage}