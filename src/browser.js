import puppeteer from 'puppeteer'

let BROWSER
let TIMER_ID

const startTimer = () => {
  if (TIMER_ID) {
    clearTimeout(TIMER_ID)
  }
  TIMER_ID = setTimeout(async () => {
    await BROWSER.close()
    BROWSER = null
  }, 5000)
}

export const getBrowser = async () => {
  if (BROWSER) {
    startTimer()
    return BROWSER
  }

  BROWSER = await puppeteer.launch({
    executablePath: process.env.CHROME_BIN || undefined, // eslint-disable-line no-process-env
    args: ['--no-sandbox', '--headless', '--disable-gpu', '--disable-dev-shm-usage']
  })
  startTimer()
  return BROWSER
}

