import tpl from './index.tpl'
import './index.scss'

import logo from './logo'
import nav from './nav'

import { tplReplace } from '../../utils/tools'

export default (fieldData) => {
  const logoComponent = logo()
  const navComponent = nav()
  return {
    name: 'header',
    tpl () {
      return tplReplace(tpl, {
        logo: logoComponent.tpl(),
        nav: navComponent.tpl(fieldData)
      })
    }
  }
}