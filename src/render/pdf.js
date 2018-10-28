import { getBrowser } from '../browser'

export const renderPdf = async html => {
  const browser = await getBrowser()
  const page = await browser.newPage()

  await page.goto(`data:text/html,${html}`, { waitUntil: 'networkidle0' })
  return page.pdf({
    format: 'A4',
    landscape: true,
    printBackground: true
  })
}
