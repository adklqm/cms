$.prototype.uploadFile=function(file,url,appendTo,success){

                var maxsize=2048*1024;
                if(file.size>maxsize){
                      $.niftyNoty({
                              type: 'danger',
                              icon: 'fa fa-times',
                              message: '文件大小不能大于2M',
                              container: 'floating',
                              timer: 3000
                       });
                      return;
                }
            if(!appendTo){
                appendTo='body';
            }
             var updialog = bootbox.dialog({
                message:'<div class="progress upload progress-striped progress-lg active"><div style="width: 0%;" class="progress-bar progress-bar-primary">0%</div></div>',
                height:50,
                closeButton:false,
                container:appendTo,
                animateIn: 'bounceIn',
                animateOut : 'bounceOut'
              });
             var d=this;

              prog=updialog.find('.progress.upload');

              dbody = updialog.find(".modal-body");
              $(dbody).css('min-height',"0px");
              $(dbody).css('overflow-y',"hidden");

              updialog.find('.modal-backdrop.in').css('opacity','0.2');
            var formdata = new FormData();
            formdata.append('image', file);
            
            var asyncSend = new $.asyncSend({
                  dataType: 'json',
                  'url': (url?url:'/upload/image/get/1'),
                  data: formdata,
                  file: file,
            });
            asyncSend.send();
            
            asyncSend.getDeferred()
            .progress(function (p) {
                p=Math.round(p);
                prog.find('div').css('width',p+'%').html(p+'%');
            })
            .done(function(r) {
                  updialog.modal('hide');
                  if(typeof(r)==='string'){
                          $.niftyNoty({
                                  type: 'danger',
                                  icon: 'fa fa-times',
                                  message: r,
                                  container: 'floating',
                                  timer: 3000
                           });
                  }else{
                    if(success){
                      success(r);
                      return;
                    }
                    var input = d.eq(0);
                    input.val(r[0]['file']);
                    var inid=$('input[name='+input.attr('name')+'_id]');
                    if(inid.length==0){
                      inid=$('<input type="hidden" name="'+input.attr('name')+'_id">');
                      input.after(inid);
                    }
                    inid.val(r[0]['id']);
                  }
            })
            .fail(function(response, status, error) {
                  updialog.modal('hide');
                  $.niftyNoty({
                          type: 'danger',
                          icon: 'fa fa-times',
                          message: '上传失败',
                          container: 'floating',
                          timer: 3000
                   });
            });
}

