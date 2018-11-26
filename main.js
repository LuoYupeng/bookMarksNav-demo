// 1.初始化数据
var hashA = init()
var keys = hashA['keys']
var hash = hashA['hash']


// 2.生成键盘 遍历keys，生成kbd标签
generateKeyboard(keys, hash)


// 3.监听用户动作
listenToUser(hash)



//工具函数
function getFromLocalStorage(name){
  return JSON.parse(localStorage.getItem(name) || 'null')
}

function tag(tagName){
  return document.createElement(tagName)
}

function createSpan(textContent){
  var span =tag('span')
  span.textContent = textContent
  span.className = 'text'
  return span
}


function createImage(domain){
  var img = tag('img')
  if(domain){
    img.src = 'http://www.'+domain +'/favicon.ico'
  }else{
    img.src = '//i.loli.net/2017/11/10/5a05afbc5e183.png'
  }
  img.onerror = function(xxx){
    xxx.target.src = '//i.loli.net/2017/11/10/5a05afbc5e183.png'
  }
  return img
}

function createButton(id){
  var button = tag('button')
  button.textContent = '编辑'
  button.id = id
  button.onclick = function(xyz){
    var button2 = xyz['target']
    var img2 = button2.previousSibling
   
    var key = button2['id'] 
    var x = prompt('请输入网址')
    hash[key] = x
    img2.src = 'http://www.'+ x +'/favicon.ico'
    
    img2.onerror = function(xxx){
      xxx.target.src = '//i.loli.net/2017/11/10/5a05afbc5e183.png'
    }
    localStorage.setItem('zzz', JSON.stringify(hash))
  }
  return button
}


function init(){
  var keys = {
    '0': {0:'q',1:'w',2:'e',3:'r',4:'t',5:'y',6:'u',7:'i',8:'o',9:'p',length:10},
		'1': {0:'a',1:'s',2:'d',3:'f',4:'g',5:'h',6:'j',7:'k',8:'l',length:9},
		'2': {0:'z',1:'x',2:'c',3:'v',4:'b',5:'n',6:'m',length:7},
		'length': 3
  }
  var hash = {
    'q':'qq.com','w':'weibo.com','z':'zhihu.com','g':'github.com',
    'x':'xiedaimala.com',
  }
  //取出localStorage中zzz对应的 hash
  var hashInLocalStorage = getFromLocalStorage('zzz')
  if(hashInLocalStorage){
    hash = hashInLocalStorage
  }
  return {
    'keys': keys,
    'hash': hash
  }
}

function generateKeyboard(keys, hash){
  for(var index=0; index< keys['length']; index = index+1){
    var div= tag('div')
    div.className = 'row'

    //var mainxxx= document.getElementById('mainxxx')
    //console.log('mainxxx是')
    //console.log(mainxxx) 
    mainxxx.appendChild(div)
  
    var row = keys[index]
    for(var index2 =0;index2<row['length'];index2 = index2 +1){
      var span = createSpan(row[index2])
      var button = createButton(row[index2])
      var img = createImage(hash[row[index2]])
      var kbd = tag('kbd')
      kbd.className = 'key'

      kbd.appendChild(span)
      kbd.appendChild(img)
      kbd.appendChild(button)

      div.appendChild(kbd)
    }

  }
}

function listenToUser(hash){
  document.onkeypress = function(xxx){
    var key = xxx['key']
    var website = hash[key]
    //location.href = 'http://' +website
    window.open('http://'+website, '_blank')
  }
}


