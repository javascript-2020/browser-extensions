
                                                                      console.clear();
          if(typeof browser==='undefined'){
                browser   = chrome;
          }


          var rem    = [
                'x-proxy',
                'content-security-policy'
          ];
          
          var add   = [
                {name:'access-control-allow-origin',value:'*'}
          ];


          browser.webRequest.onHeadersReceived.addListener(handle,{urls:['<all_urls>']},['blocking','responseHeaders']);
          
          function handle(details){
                                                                      console.log(details.url,details);
                  var hdrs    = details.responseHeaders.slice();
                                                                      console.log('Headers before :',hdrs);
                                                                      
                  hdrs        = hdrs.filter(hdr=>!rem.includes(hdr.name.toLowerCase()));
                  hdrs        = hdrs.concat(add);
                    
                                                                      console.log('Headers after :',hdrs);
                  return {responseHeaders:hdrs};
                  
          }//handle
          
          
          
          
          

