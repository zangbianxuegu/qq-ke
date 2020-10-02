import tpl from './index.tpl'

import './index.scss'

import list from './list'
import indicator from './indicator'

import { tplReplace } from '../../utils/tools'

export default (swiperData) => {
  const listComponent = list()
  const indicatorComponent = indicator()
  return {
    name: 'carousel',
    tpl () {
      return tplReplace(tpl, {
        listWidth: (swiperData.length + 1) * 1200,
        list: listComponent.tpl(swiperData),
        indicator: indicatorComponent.tpl(swiperData)
      })
    }
  }
}