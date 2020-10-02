import $ from 'jquery'

import { getTarget } from '../utils/tools'

export default class Carousel {
	constructor (options) {
    
    this.autoplay = options.autoplay
    this.duration = options.duration

    this.$carousel = $('.J_carousel')
    this.$carList = this.$carousel.find('.carousel-list')
	  this.$carItems = this.$carList.children('.car-item')
	  this.$indicatorItems = this.$carousel.find('.indicator-item')

    this.curIdx = 0
	}

	init () {
    this.autoplay && this.autoPlay()
    this.bindEvent()
	}

	autoPlay () {
    this.timer = setInterval($.proxy(this.run, this), this.duration)
	}

	bindEvent () {
		this.$carousel.on('mouseover', $.proxy(this.mouseInOut, this))
	  this.$carousel.on('mouseout', $.proxy(this.mouseInOut, this))
	  this.$carousel.on('click', $.proxy(this.onCarouselClick, this))
	}

	mouseInOut (ev) {
		const e = ev || window.event
		const eventType = e.type

		switch (eventType) {
			case 'mouseover':
			  clearInterval(this.timer)
			  this.timer = null
			  break
			case 'mouseout':
			  this.autoplay && this.autoPlay()
			  break
		}
	}

	onCarouselClick (ev) {
    const tar = getTarget(ev)
  	const className = tar.className

    if (className === 'indicator-item') {
    	this.curIdx = $(tar).index()
    	this.setSlider(this.curIdx, '', false)
    }
	}

	run () {
		this.slideAction('next')
	}

	slideAction (dir) {
    let t = null

    switch (dir) {
    	case 'next': 
    	  if (this.curIdx == this.$carItems.length - 1) {
    	  	this.curIdx = 1
    	  	this.setSlider(this.curIdx, dir, true)

    	  	t = setTimeout(() => {
            this.setSlider(this.curIdx, dir, false)
            clearTimeout(t)
    	  	}, 100)
    	  } else {
    	  	this.curIdx ++
    	  	this.setSlider(this.curIdx, dir, false)
    	  }

    	  break

    	case 'prev':
        if (this.curIdx === 0) {
        	this.curIdx = this.carItems.length - 1
        	this.setSlider(this.curIdx, dir, true)

        	t = setTimeout(() => {
            this.setSlider(this.curIdx, dir, false)
            clearTimeout(t)
        	}, 100)
        } else {
        	this.curIdxd --
        	this.setSlider(this.curIdx, dir, false)
        }

        break

      default:
        break
    }
	}

	setSlider (index, dir, isInitial) {
    this.$carList.css({
      transform: `translate3d(${isInitial ? (dir === 'next' ? 0 : -(this.$carItems.length - 1) * 1200) : -1200 * index}px, 0px, 0px)`,
      transitionDuration: `${isInitial ? 'initial' : '.5s'}`
    })

    this.setIndicator((index === this.$carItems.length - 1 || index === 0) ? 0 : index)
	}

	setIndicator (index) {
		this.$indicatorItems
		    .eq(index)
        .addClass('current')
        .siblings('.indicator-item')
        .removeClass('current')
	}
}
