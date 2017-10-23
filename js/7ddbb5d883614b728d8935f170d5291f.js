function wp_getdefaultHoverCss(layer_id)
{
	var getli='';
	var geta='';
	var cssstyle='';

	var navStyle = wp_get_navstyle(layer_id,'datasty_');
	if(navStyle.length > 0)
	{
		var patt1 = new RegExp("#nav_layer[0-9|a-z|A-Z]+\\s+li\.wp_subtop:\\s*hover\\s*{[^}]+}",'i');
		var tmp = patt1.exec(navStyle);
		if(tmp)
		{			
			var tmp1 = tmp[0].match(/{[^}]+}/)[0];
			tmp1=tmp1.replace('{','').replace('}','');
			getli=getli+tmp1;
		}
 
		patt1 = new RegExp("#nav_layer[0-9|a-z|A-Z]+\\s+li\.wp_subtop>a:\\s*hover\\s*{[^}]+}",'i');
		tmp = patt1.exec(navStyle);
		if(tmp)
		{			
			var tmp2 = tmp[0].match(/{[^}]+}/)[0];
			tmp2=tmp2.replace('{','').replace('}','');
			geta=geta+tmp2;
		}		
		
		
	}

	navStyle = wp_get_navstyle(layer_id,'datastys_');
	var getlia='';
	if(navStyle.length > 0)
	{		 
		var layidlow=('#nav_'+layer_id+' li.wp_subtop>a:hover').toLowerCase();
		if( ('a'+navStyle).toLowerCase().indexOf(layidlow)>0){			
			var parstr="#nav_"+ layer_id +" li.wp_subtop>a:hover";
			getlia = navStyle.split(new RegExp(parstr,"i"));
			var combilestr='';
			for(key in getlia){
				var ervervalue='';				
				if(('a'+getlia[key]).indexOf('{')<3 && ('a'+getlia[key]).indexOf('{')>0 ){
					var parvalue=getlia[key].split('{');
					if(('a'+parvalue[1]).indexOf('}')>0){
						ervervalue=parvalue[1].split('}')[0];
					}
				}
				combilestr=combilestr+ervervalue;
			}
			geta=geta+combilestr;
		}
		
		layidlow=('#nav_'+layer_id+' li.wp_subtop:hover').toLowerCase();
		if( ('a'+navStyle).toLowerCase().indexOf(layidlow)>0){			
			var parstr="#nav_"+ layer_id +" li.wp_subtop:hover";
			getlia = navStyle.split(new RegExp(parstr,"i"));
			var combilestrs='';
			for(var key in getlia){
				var ervervalue='';				
				if(('a'+getlia[key]).indexOf('{')<3 && ('a'+getlia[key]).indexOf('{')>0 ){
					var parvalue=getlia[key].split('{');
					if(('a'+parvalue[1]).indexOf('}')>0){
						ervervalue=parvalue[1].split('}')[0];
					}
				}
				combilestrs=combilestrs+ervervalue;
			}
			getli=getli+combilestrs;
		}
	 
		
	}
	
	if(getli.length>0){
		getli="#"+layer_id+" li.lihover{"+getli+"} ";
	}
	if(geta.length>0){
		geta="#"+layer_id+" li>a.ahover{"+geta+"} ";
	}
	cssstyle=getli+geta;
	if(cssstyle.length>0 && ($('#canvas #'+layer_id).length>0 || $('#site_footer #'+layer_id).length>0)){
		cssstyle=""+cssstyle+"";
		cssstyle=cssstyle.replace(/[\r\n]/g, " ").replace(/\s+/g, " "); 
		var doms=$('#'+layer_id);
		var oldcssstyle=doms.data('get_layer_hover_css');
		if(oldcssstyle != cssstyle){
			$("#hover"+layer_id+"").text(""+cssstyle+"");
			doms.data('get_layer_hover_css',cssstyle);
			get_plugin_css("H"+ layer_id +"H",cssstyle);
		}
	}
}

function wp_showdefaultHoverCss(layer_id){
	var layertype=$('#'+layer_id).attr('type');
	if(layertype && window['wp_showdefaultHoverCss_'+layertype]){
		return window['wp_showdefaultHoverCss_'+layertype](layer_id);
	}
	return false;
}

function wp_showdefaultHoverCss_new_navigation(layer_id)
{
	 
	var plugin_name=$("#"+layer_id).attr('type');
	var hover=$("#"+layer_id).find('.nav1').attr('hover');
	if(hover!=1){ return;}
	
	wp_getdefaultHoverCss(layer_id);
	var n=0;
	var rootpid=0;
	if(plugin_name=='new_navigation'){
		var page_id=$("#page_id").val();
		rootpid=$("#page_id").attr("rpid")*1;
	}else{
		var page_id=$('#'+layer_id+'').find(".default_pid").html();
		if(page_id==0 || page_id.length==0){
			page_id=$('#nav_'+layer_id+'').children('li:first').attr('pid');	
		}
	}

	$('#nav_'+layer_id+'').children('li').each(function(){
		var type_pid=$(this).attr('pid');		
		if( (type_pid==page_id ) && plugin_name=='new_navigation' ){
			$(this).addClass("lihover").children('a').addClass("ahover");
		}
		if(type_pid==rootpid && rootpid>0){
			$(this).addClass('rootlihover');
		}
		var t_bool = false;
		var whref = window.location.href.replace(/^https?:/,'').replace(/&brd=1$/,'');;
		var t_href= $(this).find("a").attr("href").replace(/^https?:/,'').replace(/&brd=1$/,'');;
 		var $nav1 =  $('#'+layer_id).children('.wp-new_navigation_content').children('.nav1');
		var sethomeurl = $nav1.attr("sethomeurl");
		if(sethomeurl) sethomeurl = sethomeurl.replace(/^https?:/,'');
		var cururl = window.location.href.replace(/^https?:/,'');
		if( (whref.indexOf("&menu_id=")>0 && t_href.indexOf("id=")>0 && whref.indexOf(t_href)>-1) || t_href == sethomeurl &&  sethomeurl.indexOf(cururl)>-1 ){
			t_bool = true;
		}

		if(whref == t_href || whref== t_href+"&brd=1" || t_bool){ $(this).addClass("lihover").children('a').addClass("ahover"); }
		n++;
	});
	if(!$('#nav_'+layer_id+'').children('li.lihover').length){
		$('#nav_'+layer_id+'').children('li.rootlihover:first').addClass("lihover").children('a').addClass("ahover");
	}
	$('#nav_'+layer_id+' .rootlihover').removeClass('rootlihover');
}
function wp_nav_addMoreButton(layer_id)
{  
	var type_style=$("#"+layer_id).find('.wp-new_navigation_content').attr('type');
	
	var index=0;
	var func=function(){
		if(!$('#scroll_container #'+layer_id+':visible').length){
			if(index<=20){
				setTimeout(func,500);
				index++;
			}
			return;
		}

		var firstLiTop = 0;
		var hasMore = false;
		$('#scroll_container  #nav_'+layer_id).children('li.wp_subtop').each(function(i){
			if(i == 0) {firstLiTop = $(this).offset().top;return true;}	
			if($(this).offset().top > firstLiTop)
			{
				if(i==1){
					var twice=$("#"+layer_id).data('twiced');
					if(!twice){
						$("#"+layer_id).data('twiced',true);
						setTimeout(func,1500);
						return false;
					}
				}	

				if(type_style==2){
					$(this).remove();
				}else{

				$('#'+layer_id).data('hasMore','yes');//配置逻辑获取
				var more = $.trim($('#'+layer_id).children('.wp-new_navigation_content').children('.nav1').attr('more'));
				var doms = $(this).prev().prev().nextAll().clone();
				var objA = $(this).prev().children('a');
				if(objA.children('span').length > 0) objA.children('span').html(more);
				else objA.html(more);

				if(objA.hasClass('sub'))
				{
					objA.next('ul').empty();
					doms.appendTo(objA.next('ul'));
				}
				else
				{
					objA.after('<ul></ul>');
					doms.appendTo(objA.next('ul'));
					objA.addClass('sub');
				}
				objA.addClass('nav_more_link');
				$(this).prev().nextAll().remove();
				objA.next('ul').children('li').removeClass('wp_subtop').removeClass('lihover').children('a').removeClass("ahover");
				hasMore = true;
				
				objA.attr('href','javascript:void(0);');

				//点击"更多"弹出全站导航
				if($("#"+layer_id).find('.nav1').attr('moreshow') == 1)
				{
					$(document).undelegate("#"+layer_id+" .nav_more_link",'click').delegate("#"+layer_id+" .nav_more_link",'click',function (e){
						var func=function(){
							$('#'+layer_id).find('#basic-modal-content_'+layer_id).modal({
								containerId:'wp-new_navigation-simplemodal-container_'+layer_id,
								zIndex:9999,
								close:false,
								onOpen:function(dialog){
									dialog.overlay.fadeIn('slow', function(){
										dialog.container.slideDown('slow',function(){
											dialog.data.fadeIn('slow','swing',function(){
												$('.wp_menus').not('.wp_thirdmenu0').each(function(){
													var left = $(this).parent().parent().children('a').eq(0).outerWidth()+5;
													$(this).css({position:'relative',left:left+'px'});
												});
											});
										});
									});
								},
								onClose:function(dialog){
									dialog.data.fadeOut('slow',function (){
										dialog.container.slideUp('slow', function () {
											dialog.overlay.fadeOut('slow', function () {
												$.modal.close();
											});
										});
									});
								}
							});
						}
						if($('#'+layer_id).find('#basic-modal-content_'+layer_id).length){
							func();
						}else{
							var morediv=$('#'+layer_id).find('.navigation_more');
							var more_color=morediv.attr('data-more');
							var typeval=morediv.attr('data-typeval');
							var menudata=morediv.attr('data-menudata');
							$.ajax({
								type: "POST",
								url: parseToURL("new_navigation", "windowpopup"),
								data: {layer_id:layer_id,color:more_color,typeval:typeval,menudata:menudata},
								success: function (response) {
									if (response == 'Session expired')
										window.location.href = getSessionExpiredUrl();
									morediv.replaceWith(response);
									func();
								},
								error: function (xhr, textStatus, errorThrown) {
									wp_alert(xhr.readyState + ',' + xhr.status + ' - ' + (errorThrown || textStatus) + "(get nav).<br/>" + translate("Request failed!"));
									return false;
								}
							});
						}
						return false;
					});
				
				}
				return false;
				}
			}
		});
		if(!hasMore) $('#'+layer_id).data('hasMore','no');
		wp_showdefaultHoverCss(layer_id);
	};
	func();
}

//编辑模式水平拖动动态刷新修改More按钮
function wp_updateMoreButton(layer_id)
{
	var $layer = $('#'+layer_id);
	var $nav1 = $layer.children('.wp-new_navigation_content').children('.nav1');
	var tmp_css = $.trim($("#datastys_"+layer_id).text());
	var tmp_cssa = $.trim($("#datasty_"+layer_id).text()); 
	$.post(parseToURL("new_navigation","refreshNavigator",{menustyle:$.trim($nav1.attr('skin')),saveCss:'yes',page_id:$("#page_id").val(),blockid:layer_id,typeval:$.trim($layer.find(".wp-new_navigation_content").attr('type')),colorstyle:$.trim($nav1.attr('colorstyle')),direction:$.trim($nav1.attr('direction')),more:$.trim($nav1.attr('more')),hover:$.trim($nav1.attr('hover')),hover_scr:$.trim($nav1.attr('hover_scr')),umenu:$.trim($nav1.attr('umenu')),dmenu:$.trim($nav1.attr('dmenu')),moreshow:$.trim($nav1.attr('moreshow')),morecolor:$.trim($nav1.attr('morecolor'))}),{"addopts": $layer.mod_property("addopts")||{},menudata:$("#"+layer_id).data("menudata")},function(data){
		$layer.find('.wp-new_navigation_content').html(data);		
		$("#datastys_"+layer_id).text(tmp_css);
		get_plugin_css(layer_id,tmp_cssa+" "+tmp_css);
	});
	wp_showdefaultHoverCss(layer_id);
}

function wp_removeLoading(layer_id)
{
	
	var $nav1 = $('#'+layer_id).find(".nav1");
	var ishorizon=$nav1.attr("ishorizon");
	if(ishorizon=='1'){
		$("#"+layer_id).find('.wp-new_navigation_content').css({height:'auto',overflow:'hidden'});
	}else{
		$("#"+layer_id).find('.wp-new_navigation_content').css({width:'auto',overflow:'hidden'});
	}
	// 修复IE浏览器部分版本导航无法显示问题 2013/12/26
 
	var temptimer = setTimeout(function(){
		$("#"+layer_id).find('.wp-new_navigation_content').css("overflow", 'visible');
		clearTimeout(temptimer);
	}, 50);
}

function richtxt(layer_id)
{
	var type=$("#"+layer_id).find('.wp-new_navigation_content').attr('type');
	if(type==2){
		var baseloop = 0;
		 $("#"+layer_id).find('.ddli').each(function(){
			 $(this).addClass("setdiff"+baseloop);
			 baseloop++;
		 });
	}
}

function wp_createNavigationgetSubMenuHoverCssFunc(param){
	var layer_id=param.layer_id;
	var editmode=param.editmode;
	function getSubMenuHoverCss(css_pro,type){
		var typeval=type;
		if(typeval==1){
			var regex = "#nav_layer[0-9|a-z|A-Z]+\\s+ul+\\s+li+\\s+a:\\s*hover\\s*{\\s*"+css_pro+"\\s*:[^;]+";
		}else{
			var regex = "#nav_layer[0-9|a-z|A-Z]+\\s+li\.wp_subtop>a:\\s*hover\\s*{\\s*"+css_pro+"\\s*:[^;]+";
		}
		if(editmode){
			var navStyle = $.trim($("#datastys_"+layer_id).text());
		}else{
			var navStyle = $.trim($("#"+layer_id).data("datastys_"));
		}
		if(navStyle.length > 0){
			var patt1 =new RegExp(regex,'i');
			var tmp = patt1.exec($.trim(navStyle));
			if(tmp)
			{
				return $.trim((tmp[0].match(/{[^:]+:[^;]+/)[0]).match(/:[^;]+/)[0].replace(':',''));
			}
		}
		if(editmode){
			navStyle = $.trim($("#datasty_"+layer_id).text());
		}else{
			navStyle = $.trim($("#"+layer_id).data("datasty_"));
		}
		if(navStyle.length > 0)
		{
			if(typeval==1){
				var patt1 = new RegExp("#nav_layer[0-9|a-z|A-Z]+\\s+ul+\\s+li+\\s+a:\\s*hover\\s*{[^}]+}",'i');
			}else{
				var patt1 = new RegExp("#nav_layer[0-9|a-z|A-Z]+\\s+li\.wp_subtop>a:\\s*hover\\s*{[^}]+}",'i');
			}
			var tmp = patt1.exec(navStyle);

			if(tmp)
			{
				var tmp1 = tmp[0].match(/{[^}]+}/)[0];
				var patt2 = new RegExp(css_pro+"\\s*:\\s*[^;]+;",'i');
				tmp = patt2.exec(tmp1);
				if(tmp) return $.trim(tmp[0].replace(/[^:]+:/,'').replace(';',''));
			}
		}
		return $.trim($("#nav_"+layer_id+" ul li a").css(css_pro));
	}
	window[layer_id+'_getSubMenuHoverCss']=getSubMenuHoverCss;
}

function layer_new_navigation_content_func(params){
	var layer_id = params['layer_id'];
	$("#"+layer_id).find('.menu_hs11').css('visibility','hidden');
    var contentfunc=function(){
        if($("#"+layer_id).is(':visible')){
                $("#"+layer_id).find('.wp-new_navigation_content').each(function(){
                  var wid = $(this).width();
                  var liwid = $(this).find('li:eq(0)');
                  var lipadd = parseInt(liwid.css('padding-right'))+parseInt(liwid.css('padding-left'));
                                    if ($.inArray(params.menustyle, ['hs9','hs11']) != -1) {
                      var bwidth = parseInt(liwid.css("borderRightWidth") || '0');
                      if(bwidth > 0) $('li.wp_subtop', this).width(function(i, h){return h - bwidth});
                  }
                  if(parseInt(liwid.width())>(wid-lipadd)){
                    $(this).find('li.wp_subtop').css('width',wid-lipadd);
                  }
                });
                $("#"+layer_id).find('.menu_hs11').css('visibility','');
                var contenth=$("#"+layer_id+" .wp-new_navigation_content").height();
                if(contenth==0){
                    $("#"+layer_id+" .wp-new_navigation_content").css('height','');
                }
         }else{
                 setTimeout(contentfunc,60);
         }
    }
	contentfunc();
		if(params.isedit){$('#'+layer_id).mod_property({"addopts": params.addopts});}
	if((params.addopts||[]).length > 0 && /^hs/i.test(params.menustyle)){$('#nav_'+layer_id+' li.wp_subtop:last').css("border-right", 'none');}
    if(! params.isedit){
        if($.inArray(params.menustyle, ['vertical_vs6','vertical_vs7']) != -1){
            var $layer=$('#'+layer_id).find(".wp-new_navigation_content");
            var vswidth=$layer.width();
            var $ul=$layer.find('ul.navigation');
            $ul.css({width:vswidth+'px'});
            $ul.find("li.wp_subtop").css({width:(vswidth-14)+'px'});
        }
    }
};
function layer_new_navigation_hs6_func(params){
	var layer_id = params.layer_id;
	window[layer_id+'_getSubMenuHoverCss'] = function(css_pro,type){
		var typeval=type;
		if(typeval==1){
			var regex = "#nav_layer[0-9|a-z|A-Z]+\\s+ul+\\s+li+\\s+a:\\s*hover\\s*{\\s*"+css_pro+"\\s*:[^;]+";
		}else{
			var regex = "#nav_layer[0-9|a-z|A-Z]+\\s+li\.wp_subtop>a:\\s*hover\\s*{\\s*"+css_pro+"\\s*:[^;]+";
		}
		
		var navStyle = wp_get_navstyle(layer_id, 'datastys_');
		if(navStyle.length > 0)
		{
			var patt1 =new RegExp(regex,'i');
			var tmp = patt1.exec($.trim(navStyle));
			if(tmp)
			{
				return $.trim((tmp[0].match(/{[^:]+:[^;]+/)[0]).match(/:[^;]+/)[0].replace(':',''));
			}
		}
		
		var navStyle = wp_get_navstyle(layer_id, 'datasty_');
		if(navStyle.length > 0)
		{
			if(typeval==1){
				var patt1 = new RegExp("#nav_layer[0-9|a-z|A-Z]+\\s+ul+\\s+li+\\s+a:\\s*hover\\s*{[^}]+}",'i');
			}else{
				var patt1 = new RegExp("#nav_layer[0-9|a-z|A-Z]+\\s+li\.wp_subtop>a:\\s*hover\\s*{[^}]+}",'i');
			}
			var tmp = patt1.exec(navStyle);
			
			if(tmp)
			{
				var tmp1 = tmp[0].match(/{[^}]+}/)[0];
				var patt2 = new RegExp(css_pro+"\\s*:\\s*[^;]+;",'i');
				tmp = patt2.exec(tmp1);
				if(tmp) return $.trim(tmp[0].replace(/[^:]+:/,'').replace(';',''));
			}
		}

		return $.trim($("#nav_"+layer_id+" ul li a").css(css_pro));
	};
	
	$('#'+layer_id).layer_ready(function(){
		setTimeout(function(){
			wp_nav_addMoreButton(layer_id);
		},0);
		$('#nav_'+layer_id).find('li').hover(function(){
			if(params.isedit){
				var resizehandle = parseInt($('#'+layer_id).children('.ui-resizable-handle').css('z-index'));
				if($(this).hasClass('wp_subtop')) $(this).parent().css('z-index',resizehandle+1);

				var canvas_zindex = $('#canvas').css('z-index');
				var $toolbar = $(".propblk[super='"+layer_id+"']");
				if($toolbar.length > 0)  $toolbar.css('z-index',canvas_zindex - 1);
			}
			$(this).children('ul').show();
			var type=$("#"+layer_id).find('.wp-new_navigation_content').attr('type');
			if(type==2){
				var self = $(this);
				var pos = 0 ;
				var loops = 0;
				$('#nav_'+layer_id).find('li').each(function(){
					if(loops == 1) return true;
					if(self.html() == $(this).html()){
						loops = 1;
						return true;
					}else{
						pos = pos + $(this).outerWidth();
					}	
					 
				})
				 
				$("#"+layer_id).find('.ddli').hide();
				var this_width = $('#nav_'+layer_id).outerWidth();
				var thisul_left = $('#nav_'+layer_id).css("padding-left");
				thisul_left = parseInt(thisul_left);
				$(this).children('.ddli').outerWidth(this_width).css("margin-left","-"+(thisul_left+pos+5)+"px");
				$(this).children('.ddli').eq(0).slideDown();
			}
		},function(){
			$(this).children('ul').hide();
			if(params.isedit){
				var resizehandle = parseInt($('#'+layer_id).children('.ui-resizable-handle').css('z-index'));
				var isHover = true;
				$('#nav_'+layer_id).find('ul').each(function(){
					if($(this).css('display') != 'none') {isHover = false;return false;}
				});
				if(isHover)
				{
					if(!($.browser.msie && $.browser.version < 9)) $(this).parent().css('z-index',resizehandle-1);
					var $toolbar = $(".propblk[super='"+layer_id+"']");
					if($toolbar.length > 0)  $toolbar.css('z-index','999');
				}
			}
			var type=$("#"+layer_id).find('.wp-new_navigation_content').attr('type');
			if(type==2){
				$("#"+layer_id).find('.ddli').slideUp();
			}
		});


		//子菜单位置设置
		$(".menu_"+params.menustyle+" #nav_"+layer_id).find('li').mouseenter(function(){
			var firstLi = $(this);
			var firestLiouterWidth = firstLi.outerWidth();
			var tmp_max_width = 0;
			firstLi.children('ul').children('li').each(function(){
				if($(this).outerWidth() < firestLiouterWidth)
					$(this).width(firestLiouterWidth - parseInt($(this).css('padding-left')) - parseInt($(this).css('padding-right')));
				else if($(this).outerWidth() > tmp_max_width) tmp_max_width = $(this).outerWidth();
			});
				
			if(tmp_max_width > 0) firstLi.children('ul').children('li').each(function(){
				$(this).width(tmp_max_width - parseInt($(this).css('padding-left')) - parseInt($(this).css('padding-right')));
			});
				
			if(firstLi.parent('ul').attr('id') != 'nav_'+layer_id)
				firstLi.children('ul').css('margin-left',firstLi.outerWidth());
			tmp_max_width = 0;
		});
		
		//第三级即下级菜单随高度增加位置动态修改
		$(".menu_"+params.menustyle+" #nav_"+layer_id+" ul li").hover(function(){
			if($(this).children('ul').length > 0)
			{
				var marginTop = parseInt($(this).children('ul').css('margin-top'));
				if($(this).children('ul').offset().top > $(this).offset().top)
					$(this).children('ul').css('margin-top',marginTop - ($(this).children('ul').offset().top - $(this).offset().top) + 'px');
			}
		});

		$('.menu_'+params.menustyle+' #nav_'+layer_id).find('li').hover(function(){
			var direction=$("#"+layer_id).find('.nav1').attr('direction');
			var height = parseInt($(this).outerHeight());
			if($(this).parent().hasClass('navigation'))
			{
				$('#nav_'+layer_id+' .wp_subtop').removeClass("lihover").children('a').removeClass("ahover");
				if(direction==1){				
					$(this).children('ul').css('top','auto').css('bottom',height + 'px');
				}else{				
					$(this).children('ul').css('top',height+'px').css('bottom','auto');	
				}
				$(this).children('a').css({'font-family':window[layer_id+'_getSubMenuHoverCss']("font-family",0),'font-size':window[layer_id+'_getSubMenuHoverCss']("font-size",0),'color':window[layer_id+'_getSubMenuHoverCss']("color",0),'font-weight':window[layer_id+'_getSubMenuHoverCss']("font-weight",0),'font-style':window[layer_id+'_getSubMenuHoverCss']("font-style",0)});
			}else{
				if(direction==1){
					$(this).children('ul').css('top','auto').css('bottom', '-0px');
				}else{
					$(this).children('ul').css('top',height+'px').css('bottom','auto');					
				}
				$(this).children('a').css({'font-family':window[layer_id+'_getSubMenuHoverCss']("font-family",1),'font-size':window[layer_id+'_getSubMenuHoverCss']("font-size",1),'color':window[layer_id+'_getSubMenuHoverCss']("color",1),'font-weight':window[layer_id+'_getSubMenuHoverCss']("font-weight",1),'font-style':window[layer_id+'_getSubMenuHoverCss']("font-style",1)});
			}
		},function(){
			if($(this).parent().hasClass('navigation'))
			{
				wp_showdefaultHoverCss(layer_id);
			}
			 $(this).children('a').attr("style",'');
				
		});
		wp_showdefaultHoverCss(layer_id);
		wp_removeLoading(layer_id);
	});
};
function layer_media_init_func(layerid){
	var $curlayer=$('#'+layerid);
	$('#wp-media-image_'+layerid).mouseover(function (event) {
		var effect=$curlayer.data('wopop_imgeffects');
		var $this=$(this);
		var running=$this.data('run');
		if(effect && running!=1){
			$curlayer.setimgEffects(true,effect,1);
			var effectrole = effect['effectrole'];
			var dset = effect['dset']; 
			if(effectrole !='dantu' && typeof(dset)!="undefined"){
				var temp_effect = {};
				temp_effect['type'] = effect['type'];
				temp_effect['effectrole'] = 'dantu';
				temp_effect['effect'] = effect['dset']['effect'];
				temp_effect['duration'] =  effect['dset']['duration'];
				$curlayer.setimgEffects(true,temp_effect,1);
			}
		}
	});

	var imgover=$('#wp-media-image_'+layerid).closest('.img_over');
	imgover.children('.imgloading').width(imgover.width()).height(imgover.height());
	imgover.css('position','relative');
	$('#'+layerid).layer_ready(function(){
		layer_img_lzld(layerid);
	});
};
function detectZoom (){ 
    var ratio = 0,
    screen = window.screen,
    ua = navigator.userAgent.toLowerCase() || '';
    if (window.devicePixelRatio !== undefined) {
        ratio = window.devicePixelRatio;
    }else if (~ua.indexOf('msie')) {  
        if (screen.deviceXDPI && screen.logicalXDPI) {
            ratio = screen.deviceXDPI / screen.logicalXDPI;
        }
    }else if (window.outerWidth !== undefined && window.innerWidth !== undefined) {
        ratio = window.outerWidth / window.innerWidth;
    }
    if (ratio){
        ratio = Math.round(ratio * 100);
    }
    return ratio;
}

function layer_unslider_init_func(params){
    var layerid = params.layerid;
    var module_height =params.module_height;
	if (layerid.length == 0) return;
    //Set module height start
    if(module_height && parseInt(module_height)){
        $('#'+layerid).css('height',module_height+'px').removeAttr('module_height');
        $('#'+layerid+' .wp-resizable-wrapper').css('height',module_height+'px');
    }//Set module height end
	var $content = $('#'+layerid+'_content');
	var bsize =(params.pstyle != 'none') ? params.plborder_size : '0';
	$content.css("border", params.pstyle);
	var fullparent = $content.parents('.fullpagesection').length;
	var borderwidth = 2 * parseInt(bsize),cntheight = $content.parent().height() - borderwidth,cnvpos = $('#canvas').offset();
	if(fullparent) { cnvpos.left = Math.abs($('.fullpagesection').css('left').replace('px','')); }
	cnvpos.left += $._parseFloat($('#canvas').css("borderLeftWidth")) + $('#scroll_container').scrollLeft();
	var canwidth = $('#scroll_container_bg').width()<$('#canvas').width()?$('#canvas').width():$('#scroll_container_bg').width();
	if(fullparent) { canwidth = $(window).width(); }
	if(cnvpos.left<0) cnvpos.left=0;
	$content.css({left: (0-cnvpos.left)+'px',width: (canwidth - borderwidth)+'px',height: cntheight+'px'});
	$('#'+layerid).css({left: '0',width: $('#canvas').width()});
	$('#'+layerid+' .banner').css("min-height", cntheight+'px'); $('#'+layerid+' .banner').css("height", cntheight+'px');
	$('#'+layerid+' .bannerul').css("height", cntheight+'px');
	$('#'+layerid+' .banner ul li').css("min-height", cntheight+'px').css('width',($('#scroll_container_bg').width() - borderwidth)+'px');$('#'+layerid+' .banner ul li').css("height", cntheight+'px');
	$('#'+layerid+' .banner .inner').css("padding", cntheight/2+'px 0px');
	$('#'+layerid).layer_ready(function(){
		var ctrldown = false;
		$(window).resize(function(){
				if(!ctrldown){
					setTimeout(function(){
						var $content = $('#'+layerid+'_content');
						var bsize =(params.pstyle != 'none') ? params.plborder_size : '0';
						var borderwidth = 2 * parseInt(bsize),cntheight = $content.parent().height() - borderwidth,cnvpos = $('#canvas').offset();
						cnvpos.left += $._parseFloat($('#canvas').css("borderLeftWidth")) + $('#scroll_container').scrollLeft();
						var canwidth = $('#scroll_container_bg').width()<$('#canvas').width()?$('#canvas').width():$('#scroll_container_bg').width();
						if(cnvpos.left<0) cnvpos.left=0;
						$content.css({left: (0-cnvpos.left)+'px',width: (canwidth - borderwidth)+'px',height: cntheight+'px'});
					},0)
				}
		})
		$(window).keydown(function(event){
				if(!event.ctrlKey){
					var $content = $('#'+layerid+'_content');
					var bsize =(params.pstyle != 'none') ? params.plborder_size : '0';
					var borderwidth = 2 * parseInt(bsize),cntheight = $content.parent().height() - borderwidth,cnvpos = $('#canvas').offset();
					cnvpos.left += $._parseFloat($('#canvas').css("borderLeftWidth")) + $('#scroll_container').scrollLeft();
					var canwidth = $('#scroll_container_bg').width()<$('#canvas').width()?$('#canvas').width():$('#scroll_container_bg').width();
					if(cnvpos.left<0) cnvpos.left=0;
					$content.css({left: (0-cnvpos.left)+'px',width: (canwidth - borderwidth)+'px',height: cntheight+'px'});

				}else{
					ctrldown = true;
				}
		})
	})
	$('#'+layerid).layer_ready(function(){
			var transitionstr=params.easing;
		if(params.easing=='all'){
			transitionstr=($.browser.msie) ? "slide,slice,blocks,blinds,fade" : "slide,slice,blocks,blinds,shuffle,threed,fade";
		}
		if(params.default_show=='1'){
			var arrow_show='always';
		}
		if(params.hover_show=='1'){
			var arrow_show='mouseover';
		}
			var $content = $('#'+layerid +' #'+layerid +'_content');
			var cntheight = $content.parent().height();
			cntheight = $('#'+layerid+' .wp-unslider_content').height();
			if(cntheight=='') cntheight=267;
			var  cnpos = $('#'+layerid+' .wp-unslider_content').offset();
			var contentpos = (cntheight)-39;
			if(!params.arrow_left){
				var arrow_left='template/default/images/left_arrow.png';
			}else{
				var arrow_left=params.arrow_left;
			}
			if(!params.arrow_right){
				var arrow_right='template/default/images/right_arrow.png';
			}else{
				var arrow_right=params.arrow_right;
			}
			var scripts = document.getElementsByTagName("script");
			var jsFolder = "";
			for (var i= 0; i< scripts.length; i++)
			{
					if( scripts[i].src && scripts[i].src.match(/lovelygallery\.js/i))
					jsFolder = scripts[i].src.substr(0, scripts[i].src.lastIndexOf("/") + 1);
			}
			$LAB
			.script(relativeToAbsoluteURL('plugin/unslider/js/html5zoo.js?v=4')).wait(function(){
					var win_width = $('#scroll_container_bg').width();
				jQuery("#"+layerid+"html5zoo-1").html5zoo({
					jsfolder:jsFolder,
					width:win_width,height:cntheight,
					skinsfoldername:"",loadimageondemand:false,isresponsive:false,
					addmargin:true,randomplay:false,
					slideinterval:params.interval,     // 控制时间
					loop:0,
					autoplay:params.autoplays=='false'?false:true,
					skin:"Frontpage",
					navbuttonradius:0,
					navmarginy:contentpos,showshadow:false,
					navcolor:"#999999",
					texteffect:"fade",
					navspacing:12,
					arrowtop:50,
					textstyle:"static",
					navpreviewborder:4,
					navopacity:0.8,
					shadowcolor:"#aaaaaa",
					navborder:4,
					navradius:0,
					navmarginx:16,
					navstyle:"bullets",
					timercolor:"#ffffff",
					navfontsize:12,
					navhighlightcolor:"#333333",
					navheight:12,navwidth:12,
					navshowfeaturedarrow:false,
					titlecss:"display:block;position:relative;font:"+params.title_size+"px "+params.title_family+"; color:"+params.title_color+";",//font style
					arrowhideonmouseleave:500,
					arrowstyle:params.skin=='01'?'none':arrow_show,
					texteffectduration:win_width,
					border:0,
					timerposition:"bottom",
					navfontcolor:"#333333",
					borderradius:0,
					textcss:"display:block; padding:12px; text-align:left;",
					navbordercolor:"#ffffff",
					textpositiondynamic:"bottomleft",
					ribbonmarginy:0,
					ribbonmarginx:0,
					unsliderheight:cntheight,
					unsliderlid:layerid,
					arrowimage_left:arrow_left,
					arrowimage_right:arrow_right,
                                        nav_arrow_w_size:params.nav_arrow_w_size,
                                        nav_arrow_h_size:params.nav_arrow_h_size,
					navigation_style:params.navigation_style,
					navbg_hover_color:params.navbg_hover_color,
					nav_margin_bottom:params.nav_margin_bottom_size,
					nav_arrow:params.nav_arrow,
					nav_margin_left:params.nav_margin_left_size,
					nav_margin_right:params.nav_margin_right_size,
					skin:params.skin,
					pauseonmouseover:params.pauseonmouseover=='1'?true:false,
					slide: {
							duration:win_width,
							easing:"easeOutCubic",
							checked:true
					},
					crossfade: {
							duration:win_width,
							easing:"easeOutCubic",
							checked:true
					},
					threedhorizontal: {
							checked:true,
							bgcolor:"#222222",
							perspective:win_width,
							slicecount:1,
							duration:1500,
							easing:"easeOutCubic",
							fallback:"slice",
							scatter:5,
							perspectiveorigin:"bottom"
					},
					slice: {
							duration:1500,
							easing:"easeOutCubic",
							checked:true,
							effects:"up,down,updown",
							slicecount:10
					},
					fade: {
							duration:win_width,
							easing:"easeOutCubic",
							checked:true,
							effects:"fade",
					},
					blocks: {
							columncount:5,
							checked:true,
							rowcount:5,
							effects:"topleft,bottomright,top,bottom,random",
							duration:1500,
							easing:"easeOutCubic"
					},
					blinds: {
							duration:2000,
							easing:"easeOutCubic",
							checked:true,
							slicecount:3
					},
					shuffle: {
							duration:1500,
							easing:"easeOutCubic",
							columncount:5,
							checked:true,
							rowcount:5
					},
					threed: {
							checked:true,
							bgcolor:"#222222",
							perspective:win_width,
							slicecount:5,
							duration:1500,
							easing:"easeOutCubic",
							fallback:"slice",
							scatter:5,
							perspectiveorigin:"right"
					},
				 transition: transitionstr	
			});
			//html5zoo-text position
			var fontheight = $('#'+layerid+' .unslidertxtf').height();
			var textheight = parseInt(params.title_size)+10;
			if(params.show_title=='1'){					
					if($('#'+layerid+' .html5zoo-text-bg-1').css('display')=='none'){
						var fv = parseInt($('#'+layerid+' .html5zoo-title-1').css('font-size'));
						var sv = parseInt($('#'+layerid+' .html5zoo-text-1').css('padding-top'));
						fontheight = fv+sv*2;
					}else if(fontheight<textheight){
						fontheight = fontheight+textheight;
					}
			}
			
			$('#'+layerid+' .unslidertxtf').css({'top':(cntheight-fontheight)});
			if(params.show_nav=='0'){				
				$('#'+layerid+' .dotsnew-nav').css({'display':'none'});
			}
		});    
	});
	
};
(function(){
	var fillcolor='#198ede';
	var strcolor='#666';
	var nw=150;
	var nh=100;
	var c;
	var cxt;
	var linepx=10;  //默认边框
	var shape_params;
	
	var zw=nw-(linepx/2); //减去边框后宽度
	var zh=nh-(linepx/2); //减去边框后高度
	var zx=linepx/2; //减去边框顶点位置
	
	var Shapes={}
	
	/*矩形--*/
	Shapes['rectan']=function() {
		cxt.save();
		cxt.beginPath();
		console.log(linepx);
		if(fillcolor!='transparent') cxt.fillStyle=fillcolor;
		cxt.strokeStyle=strcolor;
		if(linepx!=0)  cxt.lineWidth = linepx;  //边框大小
		if(fillcolor!='transparent')  cxt.fillRect(zx,zx,zw*2,zh*2);
		if(linepx!=0)  cxt.strokeRect(zx,zx,zw*2,zh*2);
		if(fillcolor!='transparent')  cxt.fill();
		if(linepx!=0)  cxt.stroke();
	}

	/*圆形--*/
	Shapes['circle']=function() {
		cxt.save();
		var r = (zw > zh) ? zw : zh;
		var ratioX = zw / r;
		var ratioY = zh / r;
		cxt.translate(zx, zx);
		cxt.scale(ratioX, ratioY);
		cxt.beginPath();
		cxt.arc(zw/ratioX, zh/ratioY, r, 0, 2 * Math.PI, true);
		cxt.closePath();
		cxt.restore();

		if(fillcolor!='transparent') cxt.fillStyle=fillcolor;
		cxt.strokeStyle=strcolor;
		if(linepx!=0)  cxt.lineWidth = linepx;  //边框大小
		if(fillcolor!='transparent')  cxt.fill();
		if(linepx!=0)  cxt.stroke();
	}
	
	/*五角星*/
	Shapes['pentagram']=function(){ 
			cxt.save();
			var r = (zw > zh) ? zh : zw;
			//r=r;
			cxt.translate(0, zx);
			cxt.beginPath();   
          //设置是个顶点的坐标，根据顶点制定路径   
			for (var i = 0; i < 5; i++) {   
			   cxt.lineTo(Math.cos((18+i*72)/180*Math.PI)*r+r+zx,   
							   -Math.sin((18+i*72)/180*Math.PI)*r+r+zx);   
			   cxt.lineTo(Math.cos((54+i*72)/180*Math.PI)*(r/2)+r+zx,   
							   -Math.sin((54+i*72)/180*Math.PI)*(r/2)+r+zx);   
			}   
			cxt.closePath();   
		   if(fillcolor!='transparent') cxt.fillStyle = fillcolor;   
		   if(strcolor!='transparent') cxt.strokeStyle = strcolor;  
		   if(linepx!=0) cxt.lineWidth =linepx;
		  if(fillcolor!='transparent')  cxt.fill();   
		   if(linepx!=0 && strcolor!='transparent') cxt.stroke();  
		   cxt.restore();//返回原始状态
	}
	
	/*三角形--*/
	Shapes['triangle']=function(){ 
			 cxt.save();
			 cxt.beginPath();
			
			 cxt.moveTo(zx*2, zh*2+zx);
			 cxt.lineTo(zw+zx, zx*2);
			 cxt.lineTo(zw*2,zh*2+zx);
			 cxt.closePath();
			 if(fillcolor!='transparent') cxt.fillStyle = fillcolor;   
			 if(strcolor!='transparent') cxt.strokeStyle = strcolor;  
			 if(linepx!=0) cxt.lineWidth =linepx;
			if(fillcolor!='transparent')  cxt.fill();   
		     if(linepx!=0 && strcolor!='transparent') cxt.stroke();  
	}

	/*平行四边形--*/
  	Shapes['parallelo']=function(){ 
			 cxt.save();
			 cxt.beginPath();
			 cxt.moveTo(zx*2, zh*2+zx);
			 cxt.lineTo(zw*1.4, zh*2+zx);
			 cxt.lineTo(zw*2, zx);
			 cxt.lineTo(zw*0.6+linepx, zx);
			 cxt.lineTo(zx*2, zh*2+zx);
			 cxt.closePath();
			 if(fillcolor!='transparent') cxt.fillStyle = fillcolor;   
			 if(strcolor!='transparent') cxt.strokeStyle = strcolor;  
			 if(linepx!=0) cxt.lineWidth =linepx;
			 if(fillcolor!='transparent')  cxt.fill();   
		      if(linepx!=0 && strcolor!='transparent') cxt.stroke();  
	}
	
	/*梯形--*/
  	Shapes['trapezium']=function() { 
			 cxt.save();
			 cxt.beginPath();
			 cxt.moveTo(zx*2, zh*2+zx);
			 cxt.lineTo(zw*2, zh*2+zx);
			 cxt.lineTo(zw*1.5+zx, zx);
			 cxt.lineTo(zw*0.5+zx, zx);
			 cxt.lineTo(zx*2, zh*2+zx);
			 cxt.closePath();
			 if(fillcolor!='transparent') cxt.fillStyle = fillcolor;   
			 if(strcolor!='transparent') cxt.strokeStyle = strcolor;  
			 if(linepx!=0) cxt.lineWidth =linepx;
			 if(fillcolor!='transparent')  cxt.fill();   
		      if(linepx!=0 && strcolor!='transparent') cxt.stroke();  
	}
	
	/*提示框形__左*/
	Shapes['roundtip_left']=function(){ 
	    var radius=parseInt(zw)*0.075; //圆角大小
	    if(radius<12){
			radius=12;
		} //圆角最小值
		
		var rjh= zh*0.75;
        cxt.beginPath();   
        cxt.arc( radius+zx, radius+zx, radius, Math.PI, Math.PI * 3 / 2);   
        cxt.lineTo(zw*2+zx - radius , zx);   
        cxt.arc(zw*2+zx - radius , radius +zx, radius, Math.PI * 3 / 2, Math.PI * 2);   
        cxt.lineTo(zw*2+zx , rjh*2  - radius);   
        cxt.arc(zw*2+zx - radius , rjh*2 - radius , radius, 0, Math.PI * 1 / 2); 
	    cxt.lineTo(radius*2.2+zx , rjh*2);    //左下箭头
        cxt.lineTo(radius*0.9 +zx, rjh*2+radius);  //左下箭头*/
		
        cxt.arc(radius+zx , rjh*2- radius , radius, Math.PI * 1 / 2, Math.PI); 
        cxt.closePath(); 
	   if(fillcolor!='transparent') cxt.fillStyle = fillcolor;   
	   if(strcolor!='transparent') cxt.strokeStyle = strcolor;  
	   if(linepx!=0) cxt.lineWidth = linepx;
	   if(fillcolor!='transparent')  cxt.fill();   
	   if(linepx!=0 && strcolor!='transparent') cxt.stroke();  
	   cxt.restore();//返回原始状态
    
	}
	
	/*提示框形__右*/
	Shapes['roundtip_right']=function() { 
	    var radius=parseInt(zw)*0.075; //圆角大小
	    if(radius<12){
			radius=12;
		} //圆角最小值
		
		var rjh= zh*0.75;
        cxt.beginPath();   
        cxt.arc( radius+zx, radius+zx, radius, Math.PI, Math.PI * 3 / 2);   
        cxt.lineTo(zw*2+zx - radius , zx);   
        cxt.arc(zw*2+zx - radius , radius +zx, radius, Math.PI * 3 / 2, Math.PI * 2);   
        cxt.lineTo(zw*2+zx , rjh*2  - radius);   
        cxt.arc(zw*2+zx - radius , rjh*2 - radius , radius, 0, Math.PI * 1 / 2); 
		cxt.lineTo(zw*2+zx-radius*0.9 , rjh*2+radius);  //右下箭头
	    cxt.lineTo(zw*2+zx-radius*2.2 , rjh*2);  //右下箭头
		
        cxt.arc(radius+zx , rjh*2- radius , radius, Math.PI * 1 / 2, Math.PI); 
        cxt.closePath(); 
	   if(fillcolor!='transparent') cxt.fillStyle = fillcolor;   
	   if(strcolor!='transparent') cxt.strokeStyle = strcolor;  
	   if(linepx!=0) cxt.lineWidth = linepx;
	   if(fillcolor!='transparent')  cxt.fill();   
	   if(linepx!=0 && strcolor!='transparent') cxt.stroke();  
		cxt.restore();//返回原始状态
	}
	
	
	/*箭头--*/
	Shapes['arrow']=function() { 
			 cxt.save();
			 cxt.beginPath();
			
			 cxt.moveTo(zx, zh*0.65+zx);
			 cxt.lineTo(zx, zh*1.35+zx);
			 cxt.lineTo(zw*1.04, zh*1.35+zx);
			 cxt.lineTo(zw*1.04, zh*2);
			 cxt.lineTo(zw*2,zh+zx);
			 cxt.lineTo(zw*1.04, zx*2);
			 cxt.lineTo(zw*1.04,zh*0.65+zx);
			 cxt.closePath();
			 if(fillcolor!='transparent') cxt.fillStyle = fillcolor;   
			 if(strcolor!='transparent') cxt.strokeStyle = strcolor;  
			 if(linepx!=0) cxt.lineWidth =linepx;
			 if(fillcolor!='transparent')  cxt.fill();   
		      if(linepx!=0 && strcolor!='transparent') cxt.stroke();  
	}
	
	/*钻石形--*/
	Shapes['diamond']=function() { 
			 cxt.save();
			 cxt.beginPath();
			
			 cxt.moveTo(zx*2, zh*0.9);
			 cxt.lineTo(zw+zx, zh*2);
			 cxt.lineTo(zw*2, zh*0.9);
			 cxt.lineTo(zw*1.55+zx,zh*0.38);
			 cxt.lineTo(zw*0.45+zx,zh*0.38);
			 cxt.closePath();
			 if(fillcolor!='transparent') cxt.fillStyle = fillcolor;   
			 if(strcolor!='transparent') cxt.strokeStyle = strcolor;  
			 if(linepx!=0) cxt.lineWidth =linepx;
			 if(fillcolor!='transparent')  cxt.fill();   
		      if(linepx!=0 && strcolor!='transparent') cxt.stroke();  
			
	}
	
	/*正多边形*/
   	Shapes['isogon']=function(){ 
	           var ib=5;
			 if(shape_params.ib>2) ib=shape_params.ib;
			 var i,ang;
			 var dzw=zw+zx*1.8-linepx;
			 var dzh=zh+zx*1.8-linepx;
			 var r = (dzw > dzh) ? dzh : dzw;
//			 ib = $('.inputvalue').val();
			 ang = Math.PI*2/ib;  //旋转的角度
			 cxt.save();//保存状态
			 cxt.translate(nw, nh);//原点移到x,y处，即要画的多边形中心
			 cxt.moveTo(0, -r);//据中心r距离处画点
			 cxt.beginPath();
			 for(i = 0;i < ib; i ++)
			 {
			   cxt.rotate(ang)//旋转
			   cxt.lineTo(0, -r);//据中心r距离处连线
			 }
			 cxt.closePath();
			 if(fillcolor!='transparent') cxt.fillStyle = fillcolor;   
			 if(strcolor!='transparent') cxt.strokeStyle = strcolor;  
			 if(linepx!=0) cxt.lineWidth = linepx;//设置线宽
			 if(fillcolor!='transparent')  cxt.fill();   
		      if(linepx!=0 && strcolor!='transparent') cxt.stroke();  
			 cxt.restore();//返回原始状态
	}

	
	
	function ClearCanvas(){
		cxt.clearRect(0, 0, nw*2, nh*2);
	} 

	
	function layer_shapes_draw_func(params){
		var layerid=params.layerid;
		var shapetype=params.shape_type;
		var canvasel=$('#'+layerid).find('canvas');
		var w=$('#'+layerid).find('.wp-shapes_content').width();
		var h=$('#'+layerid).find('.wp-shapes_content').height();
		canvasel.attr('width',w);
		canvasel.attr('height',h);
		if(params.fillcolor) fillcolor=params.fillcolor;
		if(params.strcolor) strcolor=params.strcolor;
		if(params.borderline != null) linepx=parseInt(params.borderline); 
		shape_params=params;
		
		c = canvasel[0];
		cxt = c.getContext("2d");
		nw=parseInt(w/2);
		nh=parseInt(h/2);
		
		zw=nw-parseInt(linepx/2); //减去边框后宽度
		zh=nh-parseInt(linepx/2); //减去边框后高度
		zx=parseInt(linepx/2); //减去边框顶点位置
		ClearCanvas();
		if(Shapes[shapetype]) Shapes[shapetype]();
	}
	window.layer_shapes_draw_func=layer_shapes_draw_func;
	
})();

;
function layer_sitesearch_init_func(param,urllist){
	var wp_productsearchcache=param.wp_productsearchcache;
	var langs=param.langs;
	var layerid=param.layer_id;
	$('#'+layerid).layer_ready(function(){
					var vskin =param.skin,$curlayer = $('#'+layerid);
					if(vskin=='skin4' || vskin=='skin5' || vskin=='skin6' || vskin=='skin7' || vskin=='skin8'){
							$curlayer.find('.searchtype').css({'display':'none'});
					}else $curlayer.find('.searchtype').css({'display':'block'});
					if(vskin=='skin4' || vskin=='skin5'){
					//adapt extend skin width 2014.4.27
							$curlayer.bind("fixedsearchwidth",function(e,width){
									var $target = $(this),$targetwidth = $target.find('.searchbox');
									//if(width != undefined) $targetwidth.css("width", width+'px');
									var this_btn_width =  $target.find('.searchbox_btn').outerWidth(true);
									var this_txt_width =  $target.find('.searchbox_txt').outerWidth(true);
									$targetwidth.css({'width':this_btn_width+this_txt_width});
							}).triggerHandler("fixedsearchwidth");
					//<<<end
					}
		var dom=$('#'+layerid);
		var domhtml=dom.find('.wp-sitesearch_container').html();
		//此处将页而ID存到本地解决在新的链接窗口中获取不到值的问题
		var article_page = param.article_page;
		var product_page =param.product_page;
		dom.data('article_page',article_page);
		dom.data('product_page',product_page);

		var article_pageres = param.article_pageres;
		var product_pageres =param.product_pageres;
		dom.data('article_pageres',article_pageres);
		dom.data('product_pageres',product_pageres);
		
		dom.data('search_type',param.search_type);
		dom.data('openArticleUrl',param.openArticleUrl);
		dom.data('openProductUrl',param.openProductUrl);
		dom.data('search_listNum',param.search_listNum);
		dom.data('extend_content',param.extend_content);//add extend skin content
		if(domhtml.length>0){
			dom.find('.sright').click(function(){
				//explain:此处不知道为什么从dom对象中获取不到输入框的值，先改为$全局对象,author:fpf,date:2015-01-27,action:modify;
				//修改bug(1694)
				//var keywords=$.trim(dom.find('input[name="keywords"]').val());
				if(vskin=='skin8'){
					var keywords=$.trim($(this).parent().parent().parent().find('input[name="keywords"]').val());
				} else{
					var keywords=$.trim($(this).parent().find('input[name="keywords"]').val());
				}
				if(keywords.length == 0) {dom.find('input[name="keywords"]').focus();return false;}
													if(vskin=='skin8'){
															var lowprice=$.trim(dom.find('input[name="lowprice"]').val().replace(/[^0-9]/ig,""));
															if(lowprice.length == 0) {dom.find('input[name="lowprice"]').focus();return false;}
															var highprice=$.trim(dom.find('input[name="highprice"]').val().replace(/[^0-9]/ig,""));
															if(highprice.length == 0) {dom.find('input[name="highprice"]').focus();return false;}
													}
				var selid=new Array();
				var i=0;
				dom.find(".catetype").each(function(){
					if($(this).prop("checked")){ selid[i]=$(this).val(); i++;}

				});		

				var str='';
				if(selid.length>0){
					str=selid.join(',');
				}

				if(str.length==0){ str='title'; }
				var infotype=0;
				var sourcecotent=parent.$('#'+layerid).find('input[name=searchcontent]').val();
				if(sourcecotent !='article' &&sourcecotent !='product'){
					if(dom.find('.type_title').html()!=langs['Search Pro']){
						infotype=1;
					}
									if(vskin=='skin4' || vskin=='skin5' || vskin=='skin6' ||  vskin=='skin8'){
											infotype=0;
									}
				}else if(sourcecotent=='article'){
					infotype=1;
				}else if(sourcecotent=='product'){
					infotype=0;
				}
				
				

				dom.attr('infotype',infotype);
				$('body').data('wp_searchcache1','1');
				var search_type = dom.data('search_type');
				var searchskin = 2;
				if(vskin=='skin4' || vskin=='skin5' || vskin=='skin6' || vskin=='skin7' || vskin=='skin8'){
 					 searchskin = 1;}
				var open = $.trim(dom.find('.wp-sitesearch_container').attr('opn'));
				if(vskin=='skin8'){ //add high low price
						var url=parseToURL('sitesearch','search',{search_listNum:dom.data('search_listNum'),openProductUrl:dom.data('openProductUrl'),search_type:dom.data('search_type'),openArticleUrl:dom.data('openArticleUrl'),article_page:article_page,product_page:product_page,keywords:keywords,searchskin:searchskin,lowprice:lowprice,highprice:highprice,type:str,infotype:infotype,layerid:layerid});
				}else{
						var url=parseToURL('sitesearch','search',{search_listNum:dom.data('search_listNum'),openProductUrl:dom.data('openProductUrl'),search_type:dom.data('search_type'),openArticleUrl:dom.data('openArticleUrl'),article_page:article_page,product_page:product_page,keywords:keywords,searchskin:searchskin,type:str,infotype:infotype,layerid:layerid});
				}
 
				var murl = '#';
				if(search_type==1){
					if(infotype==1){
						if(urllist['sitesearch_artlist']) murl = urllist['sitesearch_artlist'];
					}else{
						if(urllist['sitesearch_prolist']) murl = urllist['sitesearch_prolist'];
					}
					
					url = murl;
					if(url!="#"){
						if(url.indexOf("?")>0){
							url = url+"&search_txt="+keywords+"&type="+str;
						}else{
							url = url+"?search_txt="+keywords+"&type="+str;
						}
					} 
				}
 
				if(open=='1'){
					window.open(url,'_blank');
				}else{
					if(search_type==1){
						if((infotype==0 && param.openProductUrl=='1') ||
							(infotype==1 && param.openArticleUrl=='1')){
							window.open(url,'_blank');
						}else{
							window.location.href= url;
						}
					}else{
						$LAB
						.script(relativeToAbsoluteURL("plugin/sitesearch/js/sitesearch_browser.js"))
						.wait(function(){
							wp_sitesearch(url,{
								title:langs['Search Result'],
								width: 791,
								top:60
							});
						})
					}					
				}
			});	

			dom.find('input[name="keywords"]').keydown(function(event){
				if(event.keyCode==13){  
						dom.find('.sright').trigger('click');
				}
			});

			dom.find('.type_select span').click(function(){
				dom.find('.type_title').html($(this).html());
				dom.find('.type_select').hide();
				if($(this).html() ==langs['Search Pro']){			
					dom.find('.s_title').html(langs['Name']);
					dom.find('.s_description').html(langs['Description']);
					$(this).html(langs['Search Art']);
					$('body').data('wp_searchcache',wp_productsearchcache);
					dom.find("input[name='keywords']").autocomplete("option","source",wp_productsearchcache);
				}else{
					dom.find('.s_title').html(langs['Search Title']);
					dom.find('.s_description').html(langs['Search Summary']);
					$(this).html(langs['Search Pro']);
					if(window.wp_articlesearchcache == undefined)
					{
						$.ajax({
							url:parseToURL("sitesearch","article_titlesearch"),
							async:false,
							success:function(data){
								window.wp_articlesearchcache = eval(data);
								$('body').data('wp_searchcache',window.wp_articlesearchcache);
								dom.find("input[name='keywords']").autocomplete("option","source",window.wp_articlesearchcache);
							}
						});
					}
					else
					{
						dom.find("input[name='keywords']").autocomplete("option","source",window.wp_articlesearchcache);
					}
				}

			});

			dom.find('.nsearch').hover(function(){
				dom.find('.type_select').show();
				dom.find('input[name="keywords"]').autocomplete("close");
			},function(){
				dom.find('.type_select').hide();
			}); 
			var width_xz=0;
			if($.browser.msie && $.browser.version>=9){ width_xz=4;}
			var additionwidth=0;
			var funci=0;
			var func=function(){
				if(dom.width()>dom.find('.sleft').outerWidth(true)||funci>=3){
					if(dom.find('.sright2').length) additionwidth+=dom.find('.sright2').outerWidth(true);
					dom.find('.ninput').css({'width':(dom.width()-dom.find('.sleft').outerWidth(true)-dom.find('.sright').outerWidth(true)-additionwidth-dom.find('.nsearch').outerWidth(true)-width_xz)-4+'px'});
					dom.find('.ninput input').width(dom.find('.ninput').width());
				}else{
					funci+=1;
					setTimeout(func,300);
				}
			}
			func();
			
		}
		if(!param.editmode){
					var autocomplete_width,autocomplete_date;
					if(vskin=='default' || vskin=='skin1' || vskin=='skin2' || vskin=='skin3'){
							autocomplete_width = dom.find("input[name='keywords']").parent().outerWidth()+dom.find('.searchbox').children('.sleft').outerWidth()+dom.find('.nsearch').outerWidth()
					}else{autocomplete_width = dom.find('.searchbox_txt').parent().outerWidth() }
					var wp_searchdefalut =param.sshdefalutshow;
					if(wp_searchdefalut==1){
						if(window.wp_articlesearchcache == undefined)
						{
										$.ajax({
														url:parseToURL("sitesearch","article_titlesearch"),
														async:false,
														success:function(data){
																		window.wp_articlesearchcache = eval(data);
																		$('body').data('wp_searchcache_default',window.wp_articlesearchcache);
																		dom.find("input[name='keywords']").autocomplete("option","source",window.wp_articlesearchcache);
														}
										});
						}
						else{
										dom.find("input[name='keywords']").autocomplete("option","source",window.wp_articlesearchcache);
						}
						autocomplete_date = $('body').data('wp_searchcache_default');
					}else{ autocomplete_date = $('body').data('wp_searchcache'); }
					dom.data('wp_searchcache',autocomplete_date);
					// 数据量超过一千会有明显卡顿，此处现取前一千来比对	by lsf 2015/01/15
			dom.find("input[name='keywords']").autocomplete({
				source:autocomplete_date.slice(0,1000),
				appendTo:dom,
				width:autocomplete_width,
				open:function(event,ui){
					$('.ui-autocomplete').css('left','0px');
				},
				select:function(event,ui){
					dom.find('.searchtype').prop('checked','false');
					dom.find("input[value='title']").prop('checked',true);
				}
			});
		}
		dom.data('interface_locale',getSiteCurLang());
		//explain:修复bug(1601)搜索插件的输入框在浏览器器缩放时因其宽度问题导致后面的搜索按钮不在同一行显示，现在手动减去5px以解决该问题,author:fpf,date:2015-01-20,action:modify;
		function detectZoom (){ 
				var ratio = 0,
				screen = window.screen,
				ua = navigator.userAgent.toLowerCase() || '';
				if (window.devicePixelRatio !== undefined) {
						ratio = window.devicePixelRatio;
				}else if (~ua.indexOf('msie')) {  
						if (screen.deviceXDPI && screen.logicalXDPI) {
								ratio = screen.deviceXDPI / screen.logicalXDPI;
						}
				}else if (window.outerWidth !== undefined && window.innerWidth !== undefined) {
						ratio = window.outerWidth / window.innerWidth;
				}
				if (ratio){
						ratio = Math.round(ratio * 100);
				}
				return ratio;
		};
		var devicePixelRatios = detectZoom();
		var ischrome = navigator.userAgent.toLowerCase() || '';
		if(devicePixelRatios != 100 && ischrome.match(/chrome/)){
			var $search = dom.find('input.searchbox_txt');
			var search_width = parseFloat($search.width()).toFixed(2);
			if(search_width && search_width > 5){$search.width(search_width - 5);}
		}
	});
	
}

;
function layer_tb_product_list_init_func(param){
	var layerid=param.layer_id;
	var productStyle=param.productStyle;
	window['set_thumb_'+layerid]=function(obj){
		var callback=function(img){
				img.fadeIn('slow',function(){
				img.closest('.img,.wp-new-product-style-01-left').children('.imgloading').remove();
			   });
		}
		$(obj).each(function() {
			var img=$(this);
			callback(img);
		});      
	}
	
	$(function(){
		setTimeout(function(){
			if(productStyle=== "03"||productStyle=== "04"){
				$(".tb_product_list-"+layerid+" li").each(function(){
					var tmph = parseInt($('.productsmallfloating img').eq(0).height());
					var mrt = $(this).find('.productlistid').height()-10-tmph;
					var mrtw = ($(this).find('.productlistid').width()-$(this).find('.productsmallfloating').width())/2;
					$(this).find('.productsmallfloating').css({'marginTop':mrt+'px','marginLeft':mrtw+'px'})

				})
			}


		},300)

	})
	
	if (productStyle === "01"||productStyle === "03") {
		$("#"+layerid).bind("fixedmarginright", function(e, margin){
			var $target = $(this),$li = $target.find('.tb_product_list-'+layerid+' > ul > li');
			if(margin != undefined) {$li.css("margin-right", margin+'px');}
			else {
				var limargin=$li.filter(':first').css("margin-right");
				if(parseInt(limargin)>0){
					$li.css("margin-right", $li.filter(':first').css("margin-right"));
				}else{
					setTimeout(function(){
						$li.css("margin-right", $li.filter(':first').css("margin-right"));
					},300)
				}
			}

			// var $first = $li.filter(':first'),liwidth = $first.width()+30+6,//30、6 li的padding和border
			// 2014/04/23 leiminglin 修改为动态获取li的padding 和 border
			
			var $first = $li.filter(':first');
			var paddingLeft = $first.css("padding-left")||'0';
			var paddingRight = $first.css("padding-right")||'0';
			var liwidth = $first.width() + 
			parseInt( paddingLeft.match(/\d+/) ) + parseInt( paddingRight.match(/\d+/) ) + 
			parseInt( $first.css("border-left-width") ) * 2, //30、6 li的padding和border

			mgnright = $._parseFloat($first.css("marginRight")),
			maxwidth = $target.children('.wp-tb_product_list_content').width(),
			maxcols = Math.floor(maxwidth / (liwidth + mgnright));

			if(maxwidth >= maxcols * (liwidth + mgnright) + liwidth) maxcols += 1;
			for(var i = 1,licnt = $li.length; i <= licnt; i++){
				if (i % maxcols != 0) continue;
				if ((maxcols == 1) && (2*liwidth <= maxwidth)) continue;
				$li.filter(':eq('+(i - 1)+')').css("margin-right", '0');
			}
			if(!$("#"+layerid).find('.wp-pager_link:visible').length){
				var firstcol=($li.length % maxcols != 0)?(parseInt($li.length/maxcols)*maxcols+1):(($li.length/maxcols-1)*maxcols+1);
				for(var i = 1,licnt = $li.length; i <= licnt; i++){
					if(i>=firstcol) $li.filter(':eq('+(i - 1)+')').css("margin-bottom", '2px');
				}
			}
			layer_img_lzld(layerid);
		})

		$(window).load(function(){
			var maxliheight = 0,tmplayerid = "#"+layerid;
			if (tmplayerid.length == 1) return;var $tmpnode = $(tmplayerid+' li .wp-new-article-style-c');
			$tmpnode.css('height','');
			maxliheight = Math.max.apply(null,$tmpnode.map(function(){return $(this).outerHeight();}).toArray());
			if (maxliheight) $tmpnode.height(maxliheight);
			// 右间距 2014/03/17
			$(tmplayerid).triggerHandler("fixedmarginright");
			// <<End                
		});

		$('#'+layerid).layer_ready(function(){
			setTimeout(function(){
				if(productStyle === "03"){
					var maxliheight = 0,tmplayerid = "#"+layerid;
					if (tmplayerid.length == 1) return;var $tmpnode = $(tmplayerid+' li .wp-new-article-style-c');
					$tmpnode.css('height','');
					maxliheight = Math.max.apply(null,$tmpnode.map(function(){return $(this).outerHeight();}).toArray());
					if (maxliheight) $tmpnode.height(maxliheight);
				}
			},0)
			$('#'+layerid).triggerHandler("fixedmarginright");
		})
	}
}

function layer_tb_product_list_checkid_func(params){
	$(function(){
		var layer_id = "#"+params.layer_id;
		$(layer_id+' .productlistid').click(function(event){
			event.preventDefault();
			var gourl = $(this).attr('href');
			var targettype = $(this).attr('target');
			_this = $(this);
			//判断是否是会员文章 
			$.ajax({
				type: "POST",
				url: parseToURL('tb_product_list','checkproductid'),
	             data: {id:_this.attr('productlistid')},
	             dataType: "json",
	             async:false,
	             success: function(r){
	            	 if(r.code == -1){
		 					var islogin = params.islogin;
		 					ismember = true;  //是会员商品y
		 					if(islogin == 0){
		 						event.preventDefault();
		 						$LAB
		 						.script(relativeToAbsoluteURL("script/datepicker/custom_dialog.js"))
		 						 .wait(function(){
		 							show_custom_panel(parseToURL('userlogin','login_dialog'),{
		 								title:'Login',
		 								overlay:true,
		 								id:'wp_user_info'
		 							});
		 						});
		 						return false;
		 					}
		 				}else if(r.code == -2){
		 					ismember = false; //不是会员商品
		 								
		 				}
		 				if(targettype == undefined && gourl != 'javascript:void(0);'){
		 				location.href=gourl;
		 				}else if(targettype != undefined && gourl != 'javascript:void(0);'){
		 					window.open(gourl);
		 				}	
		 				
		 

                  }

				})
		})

	})
}

function layer_tb_product_list_pager_func(param){
	$('#'+param.layer_id).layer_ready(function(){
		var pageskips =param.pageskip;
		var layerid =param.layer_id ,$cstlayer = $('#'+layerid),
		$pglnker = $cstlayer.find('.wp-tb_product_list_content .wp-pager_link');
		$pglnker.find('a').click(function(e,page){
			var pageid = page||$(this).attr("href").replace("###",'');
			if(param.editmode == "1") $.method.tb_product_list.refreshProductList({"page":pageid,"layerid":layerid,"orderby":param.orderby,"ordertype":param.sortby});	
			else {

				var dom = $cstlayer.find('.tb_product_list_save_itemList'),
				params = {};
			
				var liststyle={"prdliststyle":param.prdliststyle}
				var search_txt = $.trim($("#"+layerid).find('.search-input').val());
				var startprice = $.trim($(".price-input").eq(0).val());              	//取搜索开始价格值
				var endprice = $.trim($(".price-input").eq(1).val());					//取搜索结束价格值
				var product_category = $("#"+layerid).find("input[name='get_product_category']").val(); //分类产品分页丢失
				$.ajax({
					type: "GET",
					url: parseToURL("tb_product_list","get_page"),
					data: {product_category:param.product_category,layer_id: layerid,page: pageid,search_txt:search_txt,start_price:startprice,end_price:endprice,"orderby":param.orderby,"ordertype":param.sortby,"filter_arr":param.filter_arr},
					success: function(data){
								var $layer = $("#"+layerid);
								var oldHeight = $layer.find('.tb_product_list-'+layerid).height();
								$layer.children('.wp-tb_product_list_content').before(data).remove();
								var maxliheight = 0,tmplayerid = "#"+layerid;
								if (tmplayerid.length == 1) return;var $tmpnode = $(tmplayerid+' li .wp-new-article-style-c');
								maxliheight = Math.max.apply(null,$tmpnode.map(function(){return $(this).outerHeight();}).toArray());
								if (maxliheight) $tmpnode.height(maxliheight);
								// 右间距 2014/03/17
								$(tmplayerid).triggerHandler("fixedmarginright");
								// <<End                
								tmplayerid = $tmpnode = null;
								$layer.triggerHandler("fixedmarginright");
								wp_heightAdapt($layer);
								//explain:产品列表模块刷新后将页面定位到该模块距离浏览器顶部的距离,author:fpf,date:2014-12-18,action:modify;
								//1/定位到网站页首2/定位到产品列表页首
								if(pageskips == 1){
									$('#scroll_container').scrollTop(0);
								} else if(pageskips == 2){
									var product_listtop = $cstlayer.css('top').replace('px','');
									var father = $cstlayer.attr('fatherid')||'';
									if(father){
										var father_top = $('#'+father).css('top').replace('px','');
										product_listtop = parseInt(product_listtop)+parseInt(father_top);
									}
									if(product_listtop){$('#scroll_container').scrollTop(product_listtop);}
								}
					}
				});
			}
			return false;
		});
		if(param.editmode != "1"){
			if($.cookie('wp_layer_page_'+layerid) && $.cookie('wp_layer_page_'+layerid) != param.curpage){
					 $pglnker.find('a:first').trigger('click',$.cookie('wp_layer_page_'+layerid));
			 }
		}
		// About input
		$pglnker.find(':input').each(function(i,dom){
			var $input = $(this),ent = pgid = '',fnc;
			switch($input.attr("type")) {
				case "text":
					ent = 'keyup';
					fnc = function(){
						pgid = this.value = this.value.replace(/(?:\b0|[^\d+])/i,'');
						return false;
					};
					break;
				case "button":
					ent = 'click';
					fnc = function(){
						if (pgid.length && /^[1-9]{1}\d*$/.test(pgid)) {
							var maxpg = _int($pglnker.find('span.total').html());
							if(!maxpg) maxpg = 1;
							$pglnker.find('a').triggerHandler('click',[Math.min(pgid,maxpg)]);
						}
						function _int(numString){
							var number = parseInt(numString);
							if(isNaN(number)) return 0;
							return number;
						}
						return false;
					};
					break;
			}
			if(fnc && $.isFunction(fnc)) $input[ent](fnc);
		});
	});
}

function layer_tb_product_list_refreshOrder_func(param){
	var layerid=param.layer_id;
	window['refreshOrderby_'+layerid]=function(obj) {
		var start_price = $.trim($('#'+layerid+' .price-input').eq(0).val());
		var end_price = $.trim($('#'+layerid+' .price-input').eq(1).val());
		var search_txt = $.trim($('#'+layerid).find('.search-input').val());
		var search_name= $.trim($('#'+layerid).find('input[name="cityname"]').val());

		var tmp_obj = {layer_id:layerid,search_name:search_name,location:$.trim($("#"+layerid).find("input[name='location']").val()),start_price:start_price,end_price:end_price,search_txt:search_txt,product_category:$.trim($("#"+layerid).find("input[name='get_product_category']").val() ||param.product_category)}
					//筛选属性
					var attr_loop_str=[];
					$('#'+layerid+' .wp_filter_attr .sorting').each(function(e){
							var attr_loop  = '';
							attr_loop = $(this).find(':input').val();
							if(attr_loop) attr_loop_str.push(attr_loop);
					});
					attr_loop_str=attr_loop_str.join('$$$')
					$("#"+layerid).find("input[name='filter_arr']").val(attr_loop_str);
					var filter_obj = {filter_arr:$.trim($("#"+layerid).find("input[name='filter_arr']").val())};
		$.extend(tmp_obj,obj,filter_obj);
		$.ajax({
			type:'POST',
			url:parseToURL('tb_product_list','orderby'),
			data:tmp_obj,
			success:function(data){
				$("#"+layerid).html(data);
				$("#"+layerid).triggerHandler("fixedmarginright");
				if (param.productStyle=== "01") {
					var maxliheight = 0,tmplayerid = "#"+layerid;
					var thisdom = $("#"+layerid).find(".img_lazy_load");
					thisdom.each(function(){
						$(this).fadeOut().fadeIn(100);
						$(this).attr("src",$(this).attr("data-original"));
					});
					setTimeout(function(){
					if (tmplayerid.length == 1) return;var $tmpnode = $(tmplayerid+' li .wp-new-article-style-c');
					maxliheight = Math.max.apply(null,$tmpnode.map(function(){return $(this).outerHeight();}).toArray());
					if (maxliheight) {$tmpnode.height(maxliheight); }
					},200);
				}
                                wp_heightAdapt($("#"+layerid));
			}
		});
		}
}