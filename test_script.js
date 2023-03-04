


jQuery(document).ready(function($)
{
//global val
var view_width = window.innerWidth;
var view_height = window.innerHeight;
document.documentElement.style.setProperty("--view_width",view_width+"px");
document.documentElement.style.setProperty("--view_height",view_height+"px");

var c_w = 1920/view_width;
var img_num = 0, b_img_num = 0, star_img_num = 0, b_star_img_num = 0;
var imgs_obj = document.getElementById("obj_bocchi");
var star_imgs_obj = document.getElementById("obj_star");
var obj_github = document.getElementById("obj_github");
var stars_bg = document.getElementById("stars_bg");
var bg_star_created = 0, obj_bg_star = [], n_bg_star_num = 0;
var bocchi_effect_created = 0, obj_effect_star = [], n_effect_star_num = 0;
var loading = 0;
var step_fps = 50;

    //onload
    setTimeout(automatic_loading,2000);
    preload_images("imgs","png","0","1","2","3","4","5","6","7","8","9","10","11","12","star_anime0","star_anime1","star_anime2","star_anime3","star_anime4","star_anime5","star_anime6","star_anime7");
    window.onload = function()
    {
    automatic_loading();
    }
    
    function automatic_loading()
    {
    view_width = window.innerWidth;
    view_height = window.innerHeight;
    c_w = 1920/view_width;
    document.getElementById("body_t").style.background = "radial-gradient(#1f252c,#0b0d0f)";
    document.documentElement.style.setProperty("--view_width",view_width+"px");
    document.documentElement.style.setProperty("--view_height",view_height+"px");
    
        if (view_width < 1500)
        {
        step_fps = 100;
        }

        if (loading <= 0)
        {
        imgs_obj.style.cursor = "pointer";
        imgs_obj.style.width = c_w*300+"px";
        imgs_obj.style.position = "absolute";
        imgs_obj.style.display = "block";
        imgs_obj.style.opacity = "1";
        imgs_obj.style.zIndex = 100;
        imgs_obj.draggable = false;
        imgs_obj.style.left = view_width*0.5-150*c_w+"px";
            
        setTimeout(bocchi_falling_animation,100);
            if (loading == 0)
            {
            setTimeout(StepEvent,step_fps);
            setTimeout(falling_star,irandom_range(1000,3000));
            }
        loading = 1;
        }
    }
   
    
    $(window).resize(function()
    {
    loading = -1;
    setTimeout(automatic_loading,10);
    })
    
    
    //별똥별
    function falling_star()
    {
    star_img_num = 0;
    star_imgs_obj.style.opacity = 1;
    star_imgs_obj.src = "imgs/star_anime0.png";
    var scale__ = irandom_range(616,916)
    star_imgs_obj.style.width = scale__+"px";
    star_imgs_obj.style.top = irandom_range(100,view_height*0.5)+"px";
    star_imgs_obj.style.left = irandom_range(view_width*0.2,view_width*0.45)+"px";
    star_imgs_obj.style.transform = "rotate("+(irandom_range(0,90)-45)+"deg)";
    star_imgs_obj.style.filter = "blur("+scale__/400+"px)" 
    setTimeout(falling_star,irandom_range(4000,10000));
    }
    

    
    //animation for obj_github
    obj_github.addEventListener("mouseover",function()
    {
    obj_github.style.opacity = 0.5;
    })

    obj_github.addEventListener("mouseleave",function()
    {
    obj_github.style.opacity = 1;
    })
    
    
    
    
    function bocchi_falling_animation()
    {
    imgs_obj.style.transition = "top 4s";
    imgs_obj.style.top = (view_height/1080*320)+"px";
    obj_github.style.opacity = 1;
    }
    
    //interaction for bocchi
    imgs_obj.addEventListener("click",function()
    {
        if (imgs_obj.style.top != view_height+320+"px")
        {
        imgs_obj.style.top = view_height+320+"px";
        setTimeout(bocchi_interaction_animation1,5000);
        }
    })
    
    function bocchi_interaction_animation1()
    {
    imgs_obj.style.transition = "none";
    setTimeout(bocchi_interaction_animation2,100);
    }
    
    function bocchi_interaction_animation2()
    {
    imgs_obj.style.top = -300*c_w+"px";
    setTimeout(bocchi_falling_animation,100);
    }
    
    
    function StepEvent()
    {
    //set bocchi animation
    img_num += 0.51*step_fps/50
    star_img_num += 0.7*step_fps/50
        
        if (img_num >= 12.5)
        {
        img_num -= 12.5
        }
    
    
    var cal_img_num = round(img_num);
    if (cal_img_num != b_img_num)
    {
    b_img_num = cal_img_num;
    imgs_obj.src = "imgs/"+cal_img_num+".png";
    }
    
    var cal_star_img_num = round(star_img_num);
    if (cal_star_img_num != b_star_img_num)
    {
    b_star_img_num = cal_star_img_num;
        if (cal_star_img_num <= 6)
        {
        star_imgs_obj.src = "imgs/star_anime"+cal_star_img_num+".png";
        }
        else
        {
        star_imgs_obj.style.opacity = 0
        }
    }
    
    //create stars from bocchi
    var random_val = irandom_range(0,100);
    
        if (bocchi_effect_created == 1)
        {
            for(var i = 0; i < n_effect_star_num; i++)
            {
            obj_effect_star[i].style.top = -320+parseInt(window.getComputedStyle(obj_effect_star[n_effect_star_num-1]).top)+"px";
            obj_effect_star[i].style.opacity = 0;
            }
        bocchi_effect_created = 0;
        }
    
        if (random_val <= 2000/step_fps)
        {
            for(var i = 0; i <= irandom_range(0,3); i++)
            {
            var random_xx = (irandom_range(0,100)-60);
            var _xx = view_width*0.5+random_xx*c_w;
            var _yy = (parseInt(window.getComputedStyle(imgs_obj).top)+64+abs(random_xx - 0)*3)+"px";
            obj_effect_star[n_effect_star_num] = document.createElement("img");
            var transition_time = 5;
            obj_effect_star[n_effect_star_num].style.width = c_w*14+"px";
            obj_effect_star[n_effect_star_num].opacity = irandom_range(10,100)/100;
            obj_effect_star[n_effect_star_num].src = "imgs/star2.png";
            obj_effect_star[n_effect_star_num].style.position = "absolute";
            obj_effect_star[n_effect_star_num].style.display = "block";
            obj_effect_star[n_effect_star_num].style.zIndex = 98;
            obj_effect_star[n_effect_star_num].style.top = _yy;
            obj_effect_star[n_effect_star_num].draggable = false;
            obj_effect_star[n_effect_star_num].style.left = _xx+"px";
            obj_effect_star[n_effect_star_num].style.transition = "all "+(transition_time)+"s";
            stars_bg.appendChild(obj_effect_star[n_effect_star_num]);
            setTimeout(instance_destroy,transition_time*1000,obj_effect_star[n_effect_star_num]);
            n_effect_star_num ++;
            bocchi_effect_created = 1;
            }
        }
        
        if (bg_star_created == 1)
        {
        obj_bg_star[n_bg_star_num-1].style.top = "-64px";
        bg_star_created = 0;
        }
        
        if (random_val <= 150/step_fps)
        {
        var _xx = irandom_range(0,view_width);
        var _yy = view_height;
        obj_bg_star[n_bg_star_num] = document.createElement("img");
        var scale = irandom_range(5,100)/100;
        var transition_time = (scale*60);
        obj_bg_star[n_bg_star_num].style.width = c_w*24*(scale)+"px";
        obj_bg_star[n_bg_star_num].opacity = irandom_range(10,100)/100;
        obj_bg_star[n_bg_star_num].src = "imgs/star2.png";
        obj_bg_star[n_bg_star_num].style.position = "absolute";
        obj_bg_star[n_bg_star_num].style.display = "block";
        obj_bg_star[n_bg_star_num].style.zIndex = 98;
        obj_bg_star[n_bg_star_num].style.top = _yy+"px";
        obj_bg_star[n_bg_star_num].draggable = false;
        obj_bg_star[n_bg_star_num].style.left = _xx+"px";
        obj_bg_star[n_bg_star_num].style.transition = "top "+(transition_time)+"s";
        stars_bg.appendChild(obj_bg_star[n_bg_star_num]);
        setTimeout(instance_destroy,transition_time*1000,obj_bg_star[n_bg_star_num]);
        n_bg_star_num ++;
        bg_star_created = 1;
        }
    //step event
    setTimeout(StepEvent,step_fps);
    }
    
    
    function instance_destroy(ele)
    {
    ele.remove();
    }


    // let be = Date.now(),fps=0,info='';
    // requestAnimationFrame(function loop(){
    //     let now = Date.now()
    //     fps = Math.round(1000 / (now - be))
    //     be = now
    //     requestAnimationFrame(loop)
    //     if (fps < 35)
    //     {
    //     kFps.style.color = "red"
    //     kFps.textContent = fps 
    //     } 
    //     if (fps >= 35 && fps <= 41)
    //     {
    //     kFps.style.color = "deepskyblue"
    //     kFps.textContent = fps + " FPS"
    //     } else 
    //     {
    //     kFps.style.color = "white"
    //     kFps.textContent = fps + " FPS"
    //     }
    //     kpFps.value = fps;
    //     info+=(''+new Date()+' '+fps+'\n');
    // })
////////////////////////////////////////////////////////////
})