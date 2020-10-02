import tpl from './index.tpl'
import './index.scss'

import { tplReplace } from '../../../utils/tools'

export default () => {
	return {
		name: 'list',
		tpl (recomCourseData) {
			let list = ''

			recomCourseData.forEach((item) => {
				list += tplReplace(tpl, {
					courseId: item.course_id,
					courseImg: item.course_img,
					courseName: item.course_name,
					description: item.description,
					teacherImg: item.teacher_img,
					teacherName: item.teacher_name,
					price: item.price
				})
			})

			return list
		}
	}
}