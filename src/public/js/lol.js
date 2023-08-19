var circle_show = document.getElementById("circle_2")

$('a[href^="#"]').on('click', function () {

    var target = $($(this).attr('href'));
    target.fadeToggle('slow');
    target.css('z-index', 4);

    /*if( target.length ) {
      event.preventDefault();
      $('html, body').animate({
          scrollTop: target.offset().top
      }, 2000);
  }*/
});
var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");
context.lineWidth = 1
var step2 = -100;f
var i = -0;
var step = 0;
var step3 = -110;
var step4 = -210;
var step5 = -310;
var c = document.getElementsByClassName("border_canvas");
for (let i = 0; i < c.length; i++) {

    const ctx = c[i].getContext("2d");
    ctx.lineWidth = 0.9
    ctx.moveTo(0, 0)
    ctx.lineTo(270, 0)
    ctx.lineTo(300, 30)
    ctx.lineTo(300, 150)
    ctx.lineTo(0, 150)
    ctx.lineTo(0, 0)
    ctx.stroke()
}


function steps() {
    i = i <= 10 ? i + 2 : i;
    context.strokeStyle = "gray";
    step = step < 100 ? step + 1 : step;
    step2 = step2 <= 10 ? step2 + 1 : step2;
    step3 = step3 <= 100 ? step3 + 1 : step3;
    step4 = step4 <= 100 ? step4 + 1 : step4;
    step5 = step5 <= 100 ? step5 + 1 : step5;

    if (step <= 100) {
        context.beginPath();
        context.moveTo(0, 0);
        context.lineTo(step * 24, 0);
        context.stroke();
        context.restore();
    }

    context.beginPath();
    context.moveTo(2400, 0);
    context.lineTo(2400 + step2 * 8, step2 * 8);
    context.stroke();
    context.restore();

    if (step3 > 0) {
        context.beginPath();
        context.moveTo(2480, 100);
        context.lineTo(2480, 12 * step3 + 70);
        context.stroke();
        context.restore();
    }

    context.moveTo(2480, 1236);
    context.lineTo(2480 - 24 * step4 - 80, 1236);
    context.stroke();
    context.restore();

    context.moveTo(0, 1236);
    context.lineTo(0, 1236 - 13 * step5);
    context.stroke();
    context.restore();
    window.requestAnimationFrame(steps);


}


window.requestAnimationFrame(steps);

/**/

var canvas_circle = document.getElementById("canvas_id")

var ctx = canvas_circle.getContext("2d");
var list_text = document.getElementsByClassName("circle_span");
var list_text_2 = document.getElementsByClassName("liner_circle");
var list_text_3 = document.getElementsByClassName("point_button");
var list_img = document.getElementsByClassName("cheo_img_div");
var button_ass = document.getElementById("satthu_id");
var list_button = document.getElementsByClassName("type_champiton")
var list_logo = document.getElementsByClassName("logo_type_champion")

var text_1 = document.getElementsByClassName("text_1")

var count = 0
var listnode = []
var circle_show = document.getElementsByClassName("circle_boder")
$(list_logo).mouseover(function () {
    if( $(this.childNodes[1]).css("transform") > "scalet(1.2)")
    {
        $(this.childNodes[1]).css("transform", "scale(1)")
    }
    else
    $(this.childNodes[1]).css("transform", "scale(1.2)")
})
.mouseout(function()
{
    $(this.childNodes[1]).css("transform", "scale(1)")
});
$(list_button).on('click', function () {
    progress = -99;
    var count = 0;
    document.getElementsByClassName("active").item(1).classList.remove("active");
    document.getElementsByClassName("active").item(0).classList.remove("active");
    document.getElementsByClassName("change_back").item(0).classList.remove("change_back");
    document.getElementsByClassName("liner_back").item(0).classList.remove("liner_back");
    if (document.getElementsByClassName("click_logo").item("") != null) {
        document.getElementsByClassName("click_logo").item("").classList.remove("click_logo");
    }
    var child_node = this.childNodes[1]
    for (let i = 0; i < list_button.length; i++) {
        if (this.id != list_button.item(count).id) {
            count += 1
        }
        else
            break
    }
    var child_node_circle = child_node.childNodes
    listnode.push(child_node_circle)

    listnode[0][1].classList.toggle("active")
    list_img[count].classList.toggle("active")
    list_text_3[count].classList.toggle("change_back")
    list_text_2[count].classList.toggle("liner_back")
    list_logo[count].childNodes[1].classList.toggle("click_logo")

    listnode.shift()
    $(circle_show).css("left", 6.2 + count * 16.7 + "%");
    $(circle_show).css("opacity", "1");
    $("logo_type_champion").children(".svg").css("fill", "black");

});
var bigCircle = {
    center: {
        x: 637,
        y: 638
    },
    radius: 635,
}
var stt = 1
var progress = 0;
var click_progress = 0
function loading() {
    ctx.clearRect(0, 0, canvas_circle.width, canvas_circle.height);
    if (progress > -99) {

        if (progress <= 0.32) {
            progress += 0.004
        }
        else if (progress <= 0.52) {
            progress += 0.0035
        }
        else if (progress <= 0.92) {
            progress += 0.003
        }
        else if (progress <= 0.96) {
            progress += 0.002;
        }
        else if (progress < (0.99 + 0.045)) {
            progress += 0.001;
        }
        if (progress >= (0.99 + 0.045)) {
            progress = 0;

            if (stt <= list_img.length - 1) {
                list_text[stt].classList.toggle("active");
                list_text[stt - 1].classList.toggle("active");


                list_img[stt].classList.toggle("active");
                list_img[stt].classList.toggle("animate");

                list_img[stt - 1].classList.toggle("active");
                list_img[stt - 1].classList.toggle("animate");

                list_text_2[stt].classList.toggle("liner_back");
                list_text_2[stt - 1].classList.toggle("liner_back");

                list_text_3[stt].classList.toggle("change_back");
                list_text_3[stt - 1].classList.toggle("change_back");
                $(circle_show).css("left", 6.3 + stt * 16.7 + "%")
                console.log(list_logo[stt])
                
        
                list_logo[stt].childNodes[1].classList.toggle("click_logo")
                list_logo[stt-1].childNodes[1].classList.toggle("click_logo");



            }
            if (stt > list_img.length - 1) {
                stt = 0;
                list_text_2[list_text.length - 1].classList.toggle("liner_back");
                list_text_2[0].classList.toggle("liner_back");
                list_text[0].classList.toggle("active");
                list_text[list_img.length - 1].classList.toggle("active");
                list_img[list_img.length - 1].classList.toggle("active");
                list_img[list_img.length - 1].classList.toggle("animate");

                list_img[0].classList.toggle("active");
                list_img[0].classList.toggle("animate");
                list_text_3[list_text.length - 1].classList.toggle("change_back");
                list_text_3[0].classList.toggle("change_back");
                list_logo[list_text.length - 1].childNodes[1].classList.toggle("click_logo");

                list_logo[0].childNodes[1].classList.toggle("click_logo");

            }
            stt += 1
        }

    }
    else if (progress == -99) {
        if (click_progress > 1) {
            click_progress = 0
        }
        click_progress += 0.01

    }
    drawCircle(bigCircle, progress, 1);

    requestAnimationFrame(loading);
}
loading();
function drawCircle(circle, progress, num) {
    let myArray = [];

    var end = PointEnd(progress, 0.5) * num;
    var start = PointStart(progress, 0.5) * num;
    var end2 = PointEnd(progress, 1) * num;
    var start2 = PointStart(progress, 1) * num;
    var end3 = PointEnd(progress, 1.5) * num;
    var start3 = PointStart(progress, 1.5) * num;
    var end4 = PointEnd(progress, 2) * num;
    var start4 = PointStart(progress, 2) * num;
    ctx.lineWidth = 0.5;
    ctx.strokeStyle = "gray";

    ctx.beginPath();
    ctx.arc(circle.center.x, circle.center.y, circle.radius, 0, 2 * Math.PI);
    ctx.restore()
    ctx.stroke();
    if (progress != -99) {
        if (progress <= 0.92) {
            ctx.lineWidth = 4;
        }
        if (progress > 0.92 && progress < 2) {
            ctx.lineWidth = 2;
        }
        
        ctx.beginPath();
        ctx.strokeStyle = "orange";
        ctx.arc(circle.center.x, circle.center.y, circle.radius, start * Math.PI, (end - 0.5) * Math.PI);
        ctx.restore()
        ctx.stroke();

        for( let i = 2;i<5; i++)
        {
            ctx.beginPath();
            ctx.arc(circle.center.x, circle.center.y, circle.radius, PointStart(progress, i*0.5) * num * Math.PI, (PointEnd(progress, i*0.5) * num - 0.5) * Math.PI);
            ctx.stroke();
            ctx.restore()
        }
   
    }
    if (progress == -99) {

        var end_click2 = x(click_progress);
        var start_click2 = x(click_progress) - 0.2;
        ctx.beginPath();
        ctx.lineWidth = 3;
        ctx.strokeStyle = "orange";
      
        ctx.arc(circle.center.x, circle.center.y, circle.radius, (start_click2) * Math.PI, end_click2 * Math.PI);
        ctx.restore()
        ctx.stroke();
        for( let i = 1;i<5; i++)
        {
            ctx.beginPath();
            ctx.arc(circle.center.x, circle.center.y, circle.radius, (start_click2 - i*0.5) * Math.PI, (end_click2 - i*0.5) * Math.PI);
            ctx.restore()
            ctx.stroke();
        }
        
    }
}
i = 0
function CreateCtx(i)
{

}
function x(x) {
    return x + 1;
}
function PointEnd(x, c) {
    return 2 * x * x - c;

}
function PointStart(x, c) {
    return 1.5 * x * x - 0.5 - c;
}

// $(window).scroll(function()
// {
//     $(".text_bigger" ).css( "animation", "animate 4s")
//     $(".text_bigger" ).css( "transition", "all 4s")


// });
const observer=new IntersectionObserver((entries)=>{


    entries.forEach((entry)=>
    {

        if(entry.isIntersecting)
        {
            entry.target.classList.add('show');

        }
        else
        {
            entry.target.classList.remove('show')
        }
    })
})
const hiddenElenments=document.querySelectorAll('.hidden');
console.log(hiddenElenments)
hiddenElenments.forEach((el)=>observer.observe(el));


