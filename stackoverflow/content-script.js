
                                                                                console.clear();
                                                                                console.log('content-script.js');
                                                                                console.log('chat updating ...');
                                                                                
        if(typeof browser=='undefined')browser=chrome;
        
        
        var enabled   = false;
        
        var user;
        var chat;
        var input;
        var btn;
        
        var root;
        var slider;
        
        setTimeout(init,50);
        
        
        function init(){
        
              chat        = document.querySelector('#chat');
              
              observer    = new MutationObserver(init.update);
              observer.observe(chat,{childList:true,subtree:true});
              
        }//init
        
        init.update=function(){
                                                                                console.log('update');
              clearTimeout(init.update.timer);
              init.update.timer   = setTimeout(complete,500);
              
              function complete(){
              
                    delete init.update;
                    observer.disconnect();
                    
                    user        = document.querySelector('#input-area #active-user img').getAttribute('alt');
                    
                    ui();
                    
                    input       = document.querySelector('#input');
                    btn         = document.querySelector('#sayit-button');
                    
                    observer    = new MutationObserver(change);
                    observer.observe(chat,{childList:true,subtree:true});
                                                                                //console.clear();
                                                                                console.log('update.complete');
                                                                                console.log();
                                                                                console.log(user);
              }//complete
              
        }//update
        
  //:
  
        function change(records){
        
              records.forEach(record=>{
              
                    if(record.type=='childList'){
                          var node    = record.addedNodes[0];
                          if(!node){
                                return;
                          }
                          
                          var classname   = node.className;
                          if(!classname || classname.indexOf('neworedit')==-1){
                                return
                          }
                          
                          var parent      = node.closest('.user-container');
                          var username    = parent.querySelector('.username').textContent;
                          
                          var message     = node.querySelector('.content .full')||node.querySelector('.content');
                          var msg         = message.textContent;
                          rec(username,msg);
                    }
                    
              });
              
        }//change
        
  //:
  
        function ui(src){
        
              root                    = document.createElement('div');
              root.style.cssText      = 'position:fixed;top:10px;left:10px;z-index:1';
              document.body.append(root);
              
              var shadow              = root.attachShadow({mode:'open'});
              
              var par                 = document.createElement('div');
              par.style.cssText       = 'display:flex;flex-direction:column;gap:5px;';
              shadow.append(par);
              
              var style               = document.createElement('style');
              style.textContent       = slider.css;
              par.append(style);
              
              var div                 = document.createElement('div');
              div.innerHTML           = slider.html;
              slider                  = div.querySelector('.slider input');
              slider.checked          = enabled;
              par.append(div);
              
              var img                 = document.createElement('img');
              img.style.cssText       = 'width:30px;height:30px;background:whitesmoke;'    +
                                        'border-radius:5px;border:1px solid lightgray;';
              img.src                 = browser.runtime.getURL('stackoverflow.png');
              par.append(img);
              
        }//ui
        
        
        
        
        async function play(name){
        
              var url     = browser.runtime.getURL(name);
              var blob    = await fetch(url).then(res=>res.blob());
              var url     = window.URL.createObjectURL(blob);
              var audio   = new Audio(url);
              audio.play();
              
        }//play
        
  //:
  
        send.queue    = [];
        send.delay    = 1000;
        
        function send(message){
        
              message   = [...arguments].join(' ');
              if(!message){
                    return;
              }
              
              if(send.status){
                    send.queue.push(message);
                    return;
              }
              send.status   = true;
                                                                                console.log('send',message);
              input.value   = message;
              btn.click();
              
              setTimeout(delay,send.delay);
              
              function delay(){
              
                    send.status   = false;
                    
                    if(!send.queue.length){
                          return;
                    }
                    
                    var message   = send.queue.shift();
                    send(message);
                    
              }//delay
              
        }//send
        
        function sendn(message0){
        
              send([...arguments].join('\n'));
              
        }//sendn
        
  //:
  
        function rec(username,msg){
                                                                                console.log(username,msg);
              if(msg.startsWith('@'+user)){
                    play('ping.mp3');
              }
              if(msg.startsWith('-'+user)){
                    bot(username,msg);
              }
              
        }//rec
        
  //:
  
        var slider    = {};
        
        slider.html   = `
              <label class=slider>
                    <input type=checkbox>
                    <span class='hldr round'></span>
              </label>
        `;
        
        slider.css    = `
              .slider {
                    position                : relative;
                    display                 : inline-block;
                    width                   : 30px;
                    height                  : 20px;
              }
              
              .slider input {
                    opacity                 : 0;
                    width                   : 0;
                    height                  : 0;
              }
              
              .hldr {
                    position                : absolute;
                    cursor                  : pointer;
                    top                     : 0;
                    left                    : 0;
                    right                   : 0;
                    bottom                  : 0;
                    background-color        : #ccc;
                    transition              : .2s;
              }
              
              .hldr:before {
                    position                : absolute;
                    content                 : "";
                    height                  : 17px;
                    width                   : 17px;
                    left                    : 2px;
                    bottom                  : 2px;
                    background-color        : white;
                    transition              : .2s;
              }
              
              input:checked + .hldr {
                    background-color        : #2196F3;
              }
              
              input:focus + .hldr {
                    box-shadow              : 0 0 1px #2196F3;
              }
              
              input:checked + .hldr:before {
                    transform               : translateX(9px);
              }
              
              .hldr.round {
                    border-radius           : 34px;
              }
              
              .hldr.round:before {
                    border-radius           : 50%;
              }
        `;
        
        
        
        
