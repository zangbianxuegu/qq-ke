import $ from 'jquery'
import { API } from '../utils/config'

export default class IndexModel {
  getCourseDatas () {
    return $.ajax({
      url: API.getCourseDatas,
      type: 'GEt',
      dataType: 'JSONP'
    })
  }
  getCourses (field) {
    return $.ajax({
      url: `${API.getCourses}${field}`,
      type: 'GEt',
      dataType: 'JSONP'
    })
  }
  getCourseFields () {
    return $.ajax({
      url: API.getCourseFields,
      type: 'GEt',
      dataType: 'JSONP'
    })
  }
}