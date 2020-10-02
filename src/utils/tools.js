function tplReplace (template, replaceObject) {
	return template().replace(/{{(.*?)}}/g, (node, key) => {
    return replaceObject[key]
	})
}

function getUrlQueryValue (key) {
  
  const reg = new RegExp('(^|&)' + key + '=([^&]*)(&|$)', 'i')
  const res = window.location.search.substr(1).match(reg)

	return res !== null ? decodeURIComponent(res[2]) : null
}

function getTarget (ev) {
	const e = ev || window.event
	return e.target || e.srcElement
}

export {
  tplReplace,
  getUrlQueryValue,
  getTarget
}