class loginPage{


    constructor(page){
        this.page=page
        this.signInWithEmail=page.locator("//button[normalize-space()='Sign in with email']")
        this.email=page.locator('[id="ap_email"]')
        this.password=page.locator('[id="ap_password"]')
        this.submit=page.locator('[type="submit"]')
        this.userProfileIcon=page.locator('[class="headerPersonalNav__icon"]').nth(0)
        this.errorMessage=page.locator('//h4[text()="There was a problem"]')
    }

    async goToLoginPage(){
        await this.page.goto('https://www.goodreads.com/user/sign_in')
    }

    async signIn(userEmail, userPassword){
        await this.signInWithEmail.click()
        await this.email.fill(userEmail)
        await this.password.fill(userPassword)
        await this.submit.click()
    }
}

module.exports={loginPage}