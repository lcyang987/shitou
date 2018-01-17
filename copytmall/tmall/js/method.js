// JavaScript Document
function getStyle(obj,attr){
	if(obj.currentStyle)
	{
		return obj.currentStyle[attr]
	}
	else
	{
		return getComputedStyle(obj,false)[attr]
	}
}
function addClass(obj,className){
	if(obj.className){
		if(!new RegExp(className).test(obj.className))obj.className+=' '+className;
	}else{
		obj.className=className;
	}
}
function deleteClass(obj,className){
	if(new RegExp(className,'g').test(obj.className)){
		obj.className=obj.className.replace(new RegExp('\\b'+className+'\\b','g'),'')
		if(new RegExp(/^ /g).test(obj.className))obj.className=obj.className.replace(/^ /g,'')
		if(new RegExp(/ $/g).test(obj.className))obj.className=obj.className.replace(/ $/g,'')
	}
}
function getByClass(oParent,sClass){
	var elements=oParent.getElementsByTagName('*');
	var result=[];
	for(var i=0;i<elements.length;i++){
		if(new RegExp('\\b'+sClass+'\\b').test(elements[i].className)){
			result.push(elements[i]);
		}
	}
	return result;
}
function myAddEvent(obj, sEvent, fn){
    if (obj.attachEvent) {
        obj.attachEvent('on' + sEvent, function () {
            fn.call(obj)
        })
    } else {
        obj.addEventListener(sEvent, fn, false)
    }
}
function getOffsetParent(obj,sClass){	
	function getParent(obj,sClass){
		if(obj.parentNode.tagName.toLowerCase()=='body')return false;
		if(new RegExp('\\b'+sClass+'\\b').test(obj.parentNode.className)){
			arguments.callee.obj=obj.parentNode;
		}else{
			getParent(obj.parentNode,sClass);
		}
	}
	getParent(obj,sClass);
	return getParent.obj
}
function startMove(obj,json,fn){
    clearInterval(obj.timer)
	obj.timer=setInterval(function(){
		var bStop=true;
		for(var attr in json)
		{
			var cur;
			if(attr=='opacity')
			{
				cur=Math.round(parseFloat(getStyle(obj,attr))*100)
			}
			else if (attr == 'scale') {
			    cur = obj.scale
			}
			else
			{
				cur=parseInt(getStyle(obj,attr));
			}
			var speed=(json[attr]-cur)/8;
			speed=speed>0?Math.ceil(speed):Math.floor(speed);
			if(json[attr]!=cur)
			bStop=false
			if(attr=='opacity')
			{
				obj.style.filter='alpha(opacity:'+(cur+speed)+')';
				obj.style.opacity=(cur+speed)/100
			}
			else if (attr == 'scale') {
			    obj.style.webkitTransform = obj.style.transform = 'scale(' + (cur + speed) / 100 + ')';
				obj.scale = cur + speed;
			}
			else
			{
				obj.style[attr]=cur+speed+'px'
			}
		}
		if(bStop)
		{
			clearInterval(obj.timer)
			if(fn)fn()
		}
	}, 16)
}