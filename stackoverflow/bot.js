



var bot;

(()=>{

        var banned    = localStorage.getItem('bot-banned')||[];
        
        bot=function(username,msg){
        
              if(!slider.checked){
                    return;
              }
              if(banned.find(o=>o.username==username)){
                    return;
              }
              
              var cmd   = msg.split(' ');
              switch(cmd[1]){
              
                case undefined    : chk();        break;
                case 'test'       : test();       break;
                
              }//switch
              
              
              function chk(){
              
                    sendn(
                          '!!  im alive  !!',
                          '.',
                          '-- cmd list --',
                          'test'
                    );
                    
              }//chk
              
              function test(){
              
                    send('testing 1 2 3');
                    
              }//cmd
              
              
        }//bot
        
        
        
})();
