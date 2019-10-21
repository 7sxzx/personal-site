const puppeteer = require("puppeteer")
const shell = require("shelljs")
const dotenv = require("dotenv")
dotenv.config()

const callScript = token => {
  shell.exec(`npm run nike_activity ${token}`)
}

puppeteer
  .launch({ devtools: false, headless: true, args: ["--incognito"] })
  .then(async function(browser) {
    const page = await browser.newPage()
    page.on("response", async response => {
      const url = response.url()
      try {
        const req = response.request()
        const orig = req.url()
        if (orig.includes("login")) {
          const text = await response.text()
          const body = await JSON.parse(text)
          const status = response.status()
          console.log("🎉 Found login response!")
          console.log({ orig, status, body })
          await browser.close()
          callScript(body.access_token)
        }
      } catch (err) {
        //console.error(`Failed getting data from: ${url}`)
      }
    })
    await page.goto("https://www.nike.com/gb/member/profile", {
      waitUntil: "networkidle0",
    })
    console.log("👟 Navigated to Nike.com")
    await page.click(".g72-menu")
    console.log("🍔 Clicked on burger menu")
    await page.click("#MobileAccountMenuHeader")
    console.log("💪 Clicked Login")
    await page.waitForSelector('input[name="emailAddress"]')
    await page.type('input[name="emailAddress"]', process.env.nike_username)
    await page.type('input[name="password"]', process.env.nike_password)
    console.log("✍️ Filled In Form")
    await page.click(".loginSubmit")
    console.log("✅ Submitted Form")
  })
