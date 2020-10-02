import $ from 'jquery'

import '../scss/common.css'
import '../scss/iconfont.css'

import header from '../components/header'
import footer from '../components/footer'
import indexTitle from '../components/indexTitle'
import listNav from '../components/listNav'
import courseList from '../components/courseList'
import noDataTip from '../components/noDataTip'

import CourseTab from '../modules/CourseTab'

import IndexModel from '../models/index'

import { getUrlQueryValue } from '../utils/tools'
import { filterCourseData } from '../lib/course'

;(async ($) => {
  const app = $('#app')
  const container = $('<div class="container">')

  const queryField = getUrlQueryValue('field') || 'all'

  const indexModel = new IndexModel()
  const retFieldsData = await indexModel.getCourseFields()
  const retCoursesData = await indexModel.getCourses(queryField)

  const fields = retFieldsData.result
  const courses = retCoursesData.result
  
  const headerComponent = header(fields)
  const indexTitleComponent = indexTitle()
  const listNavComponent = listNav(fields, queryField)
  const courseListComponent = courseList()
  const noDataTipComponent = noDataTip()
  const footerComponent = footer()
  
  const init = () => {
    render()
    loadModules()
  }

  function render () {
    container.append(headerComponent.tpl())
    container.append(indexTitleComponent.tpl('全部课程', false))
    container.append(listNavComponent.tpl())
    container.append(courses.length > 0 ? courseListComponent.tpl(filterCourseData(courses, queryField)) : noDataTipComponent.tpl())
    container.append(footerComponent.tpl())
    app.append(container)
  }

  function loadModules () {
    new CourseTab().init()
  }

  init()
})($)