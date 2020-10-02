import tpl from './index.tpl'
import './index.scss'

import list from './list'

import { tplReplace } from '../../utils/tools'

export default (recomCourseData) => {
  
  const listComponent = list()

  return {
  	name: 'recomBoard',
  	tpl () {
      return tplReplace(tpl, {
        list: listComponent.tpl(recomCourseData)
      })
  	}
  }
}