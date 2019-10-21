// 由ID获取元素标签的自定义命名函数
function my$(id){
    return document.getElementById(id);
}





//  动画函数

//匀速动画
function animate(element,target) {
     clearInterval(element.timeId)
   element.timeId= setInterval(function(){
        var current=element.offsetLeft;
        var step=10;
        step=target>current?step:(-step);
        current+=step
        if(Math.abs(target-current)>Math.abs(step)){
           element.style.left=current+"px"
        }else{
            clearInterval(element.timeId)
            element.style.left=target+"px"
        }
       
    },10)
 }

 //缓动
 function animateH(element,target) {
    clearInterval(element.timeId)
   element.timeId= setInterval(function(){
        var current=element.offsetLeft;
        var step=(target-current)/10;
        step=step>0?Math.ceil(step):Math.floor(step);
        current+=step
        
           element.style.left=current+"px"
       if(current==target){
            clearInterval(element.timeId)
           
   }
        
       
    },20)
}





//封装获取任意元素中的任意属性的值
function getStyle(element,attr){
 return window.getComputedStyle?window.getComputedStyle(element,null)[attr]:element.currentStyle[attr];
   
}
//应用样式:console.log(getStyle(my$("dv"),"width"))








//封装缓动动画函数增加(多个)任意属性,多个属性的指令会同时进行
// json包括属性名和属性值的键值对，等于是JSON里的属性值相当于目标值，可以遍历出JSON对象里的所有内容，
function animateHJ(element,json){
clearInterval(element.timeId);
element.timeId=setInterval(function(){
    //假设，全部到达目标位置
    var flag=true;
    for(var attr in json){
        var current=parseInt(getStyle(element,attr))
        var target=json[attr];
        var step=(target-current)/10;
        step=step>0?Math.ceil(step):Math.floor(step);
        current+=step;
        element.style[attr]=current+"px"
        if(current!=target){
            flag=false;
        }
    }
    if(flag){
        clearInterval(element.timeId)
    }
},20)
}
//应用样式：animate(my$("dv"),{"width":400,"top":200,...})






//封装缓动动画函数增加回调函数，回调函数：将一个函数当作一个参数放在另一个函数里
//通过不断的加入fn函数，让DIV元素盒子执行一次又一次的动作
function animateHJF(element,json,fn){
    clearInterval(element.timeId);
    element.timeId=setInterval(function(){
        //假设，全部到达目标位置
        var flag=true;
        for(var attr in json){
            var current=parseInt(getStyle(element,attr))
            var target=json[attr];
            var step=(target-current)/10;
            step=step>0?Math.ceil(step):Math.floor(step);
            current+=step;
            element.style[attr]=current+"px"
            if(current!=target){
                flag=false;
            }
        }
        if(flag){
            clearInterval(element.timeId)
            //所有的属性到达目标位置之吼再执行，前提是用户上传的了fn的情况下
            if(fn){
                fn()
            }
        }
    },20)
    }
    //应用样式：
     /*           var json1={"width":300,"height":200,"left":100}
               animate(my$("dv"),json1,function(){
                   var json2={"width":500,"height":300,"left":200}
                   animate(my$("dv"),json)
               })
    */  
   // 如果json里的属性过多，可以设置变量接收这些对象，回调函数可看成继续添加动画动作，可无限加动作。



   
   //让盒子变透明，或添加层级z-index的属性的函数
   //json={"zIndex":11,"opacity":0.4} 需要封装一个函数，设置条件来判断JSON对象里是否有ZINDEX和OPACITY这两个属性
   function animateHJFOZ(element,json,fn){
    clearInterval(element.timeId);
    element.timeId=setInterval(function(){
        //假设，全部到达目标位置
        var flag=true;
        for(var attr in json){
            //判断这个属性attr中有没有opacity
            if(attr=="opacity"){
                //opacity值为0~1，避免小数，获取opacity当前的透明度的值放大100倍
                var current=getStyle(element,attr)*100;
                //将目标值同时也放大100倍
                var target=json[attr]*100;
                var step=(target-current)/10;
                step=step>0?Math.ceil(step):Math.floor(step)
                current+=step;
                //将最终真实变化的值恢复
                element.style[attr]=current/100;
            }else if(atta=="zIndex"){
                element.styel[attr]=json[attr]
            }else{
                 var current=parseInt(getStyle(element,attr))
            var target=json[attr];
            var step=(target-current)/10;
            step=step>0?Math.ceil(step):Math.floor(step);
            current+=step;
            element.style[attr]=current+"px"
            }
           
            if(current!=target){
                flag=false;
            }
        }
        if(flag){
            clearInterval(element.timeId)
            //所有的属性到达目标位置之后再执行，前提是用户上传的了fn的情况下
            if(fn){
                fn()
            }
        }
    },20)
    }

    //应用样例 : var json={"width":200,"opacity":0.5,"zIndex":999}