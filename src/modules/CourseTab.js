import $ from 'jquery'

import { getTarget } from '../utils/tools'

import IndexModel from '../models/index'

import courseList from '../components/courseList/list'

const indexModel = new IndexModel()

export default class CourseTab {
  constructor () {
    this.$tabList = $('.J_tabList')
    this.$courseList = $('.J_courseList')
    this.$courseList.css('min-height', '860px')

    this.courseListComponent = courseList()

    this.dataCache = {}
  }

  init () {
    this.bindEvent()
  }

  getDatas (field) {
    return indexModel.getCourses(field)
  }

  bindEvent () {
    this.$tabList.on('click', $.proxy(this.onTabClick, this))
  }
  
  onTabClick (ev) {
  	const tar = getTarget(ev),
  	      className = tar.className

  	if (className === 'tab-item-lk') {
  		const $tar = $(tar)
  		const field = $tar.attr('data-field')
  		
  		this.tabChange($tar)
  		this.pageChange(field)
  	}
  }
  
  tabChange ($target) {
  	$target.addClass('current')
		       .parent()
		       .siblings('.tab-item')
		       .children('.tab-item-lk')
		       .removeClass('current')
  }

  async pageChange (field) {
    
    if (!this.dataCache[field]) {
    	await this.getDatas(field).then((res) => {
	    	const data = res.result
	      this.dataCache[field] = data
	    })
    }

    this.$courseList.html(this.courseListComponent.tpl(this.dataCache[field]))
  }
}
