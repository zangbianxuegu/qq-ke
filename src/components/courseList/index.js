import tpl from './index.tpl'
import './index.scss'

import { tplReplace } from '../../utils/tools'

import list from './list'

export default () => {
  
  const listComponent = list()

	return {
		name: 'listBoard',
		tpl (data) {
      return tplReplace(tpl, {
        list: listComponent.tpl(data)
      })
		}
	}
}