

          if(typeof browser==='undefined'){
                browser   = chrome;
          }
          
          browser.runtime.onInstalled.addListener(()=>{
          
                var rule    = {
                      id: 1,
                      condition: {},
                      action: {
                            type: 'modifyHeaders',
                            responseHeaders: [
                                  {header: 'access-control-allow-origin',operation:'set',value:'*'},
                            ],
                      },
                };
                
                browser.declarativeNetRequest.updateDynamicRules({addRules:[rule],removeRuleIds:[rule.id]});
                
          });
          
          