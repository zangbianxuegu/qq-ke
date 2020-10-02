import $ from 'jquery'

import '../scss/common.css'
import '../scss/iconfont.css'

import header from '../components/header'
import footer from '../components/footer'
import carousel from '../components/carousel'
import indexTitle from '../components/indexTitle'
import recomBoard from '../components/recomBoard'
import courseList from '../components/courseList'

import Carousel from '../modules/Carousel'

import { CAROUSEL } from '../utils/config'

import IndexModel from '../models/index'

import { filterCourseData } from '../lib/course'

;(async ($) => {
  const app = $('#app')
  const container = $('<div class="container">')

  const indexModel = new IndexModel()
  const retData = await indexModel.getCourseDatas()
  const { swipers, fields, courses, recomCourses } = retData.result
  
  const headerComponent = header(fields)
  const footerComponent = footer()
  const carouselComponent = carousel(swipers)
  const indexTitleComponent = indexTitle()
  const recomBoardComponent = recomBoard(recomCourses)
  const courseListComponent = courseList()
  
  const init = () => {
    render()
    loadModules()
  }

  function render () {
    container.append(headerComponent.tpl())
    container.append(carouselComponent.tpl())
    container.append(indexTitleComponent.tpl('JS++深度前端', true))
    container.append(recomBoardComponent.tpl())
    container.append(indexTitleComponent.tpl('前端高薪就业', true))
    container.append(courseListComponent.tpl(filterCourseData(courses, '0', 5)))
    container.append(indexTitleComponent.tpl('精品小课', true))
    container.append(courseListComponent.tpl(filterCourseData(courses, '1', 5)))
    container.append(indexTitleComponent.tpl('前端基础', true))
    container.append(courseListComponent.tpl(filterCourseData(courses, '2', 5)))
    container.append(indexTitleComponent.tpl('全修班体验课', true))
    container.append(courseListComponent.tpl(filterCourseData(courses, '3', 5)))
    container.append(footerComponent.tpl())
    app.append(container)
  }

  function loadModules () {
    new Carousel(CAROUSEL).init()
  }

  init()
})($)