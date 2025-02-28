import { createNextDescribe } from 'e2e-utils'
import path from 'path'

createNextDescribe(
  'app-dir trailingSlash handling',
  {
    files: path.join(__dirname, 'trailingslash'),
    skipDeployment: true,
  },
  ({ next }) => {
    it('should redirect route when requesting it directly', async () => {
      const res = await next.fetch(
        '/a',
        {},
        {
          redirect: 'manual',
        }
      )
      expect(res.status).toBe(308)
      expect(res.headers.get('location')).toBe(next.url + '/a/')
    })

    it('should render link with trailing slash', async () => {
      const $ = await next.render$('/')
      expect($('#to-a-trailing-slash').attr('href')).toBe('/a/')
    })

    it('should redirect route when requesting it directly by browser', async () => {
      const browser = await next.browser('/a')
      expect(await browser.waitForElementByCss('#a-page').text()).toBe('A page')
    })

    it('should redirect route when clicking link', async () => {
      const browser = await next.browser('/')
      await browser
        .elementByCss('#to-a-trailing-slash')
        .click()
        .waitForElementByCss('#a-page')
      expect(await browser.waitForElementByCss('#a-page').text()).toBe('A page')
    })
  }
)
