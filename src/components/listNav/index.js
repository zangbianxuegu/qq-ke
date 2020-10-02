import tpl from './index.tpl'
import './index.scss'

import list from './list'

import { tplReplace } from '../../utils/tools'

export default (fieldData, queryField) => {
  
  const listComponent = list()

	return {
		name: 'listNav',
		tpl () {
      return tplReplace(tpl, {
        list: listComponent.tpl(fieldData, queryField)
      })
		}
	}
}