import tpl from './index.tpl'
import './index.scss'

import { tplReplace } from '../../../utils/tools'

export default () => {
	return {
		name: 'carouselList',
		tpl (swiperData) {
      let list = ''
      const firstData = swiperData[0]

      swiperData.forEach((item) => {
        list += tplReplace(tpl, {
           courseId: item.course_id,
           courseName: item.course_name,
           img: item.img
        })
      })

      list += tplReplace(tpl, {
      	courseId: firstData.course_id,
      	courseName: firstData.course_name,
      	img: firstData.img
      })

      return list
		}
	}
}