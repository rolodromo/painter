import { getBrowser } from '../browser'

export const renderPng = async (html, {
  fullPage = true,
  viewport,
  omitBackground = false,
  printBackground = true
}) => {
  const browser = await getBrowser()
  const page = await browser.newPage()

  if (viewport) {
    page.setViewport(viewport)
  }

  await page.goto(`data:text/html,${html}`, { waitUntil: 'networkidle0' })
  return page.screenshot({
    type: 'png',
    fullPage,
    omitBackground,
    printBackground
  })
}
