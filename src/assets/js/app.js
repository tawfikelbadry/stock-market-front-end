(function($){
    "use strict";
    $(document).ready(function ($) {
        $(function () {

            // Viewing Uploaded Picture On Setup Admin Profile
            function livePreviewPicture(picture)
            {
              if (picture.files && picture.files[0]) {
                var picture_reader = new FileReader();
                picture_reader.onload = function(event) {
                  $('#uploaded-user').attr('src', event.target.result);
                  $('#upload-company').attr('src', event.target.result);
                  $('#uploaded-singup').attr('src', event.target.result);
                  $('#upload-news').attr('src', event.target.result);
                  
                };
                picture_reader.readAsDataURL(picture.files[0]);
              }
            }
          
            $('.profile-cover .image .icon-chang input').on('change', function () {
              $('#uploaded-user').fadeIn();
              livePreviewPicture(this);
            });
            $('.pic-input input').on('change', function () {
                $('#upload-company').fadeIn();
                livePreviewPicture(this);
            });
            $('.signup .profile-buttons-div input').on('change', function () {
                $('#uploaded-singup').fadeIn();
                livePreviewPicture(this);
            });
            $('.add-news .pic-input input').on('change', function () {
                $('#upload-news').fadeIn();
                livePreviewPicture(this);
            });
              
        });
        // Nav toggel
        var zero = 0;
        $(document).ready(function (){
        
           
           $(window).on("scroll",function (){
               $("nav").toggleClass("hide-nav", $(window).scrollTop() > zero);
               zero = $(window).scrollTop();
           }) ;
        });
        // Get height of nav and get it to main as padding
        $(document).ready(function (){
            $(".main").css("padding-top",$("nav").outerHeight());
        });
        // Add Classes
        $(document).ready(function (){
            $(".user-nav li a").click(function () {
                $(this).addClass("active").parent().siblings().find("a").removeClass("active");
            });
            $(".search-stock .filter").click(function () {
                $(".search-filter").toggleClass("active");
            });
            $(".close-filter").click(function (){
                $(".search-filter").toggleClass("active");
            });
            $(".best-comp ul li").click(function () {
                $(this).addClass("active").siblings().removeClass("active");
            });
        });
        /* Sector To Slick
        ========================== */
        $(document).ready(function () {
            "use strict";
            $(".stock-info .slider").slick({
                prevArrow: ".company-slider .arrow-slider .left-arrow",
                nextArrow: ".company-slider .arrow-slider .right-arrow",
                autoplay: false,
                autoplaySpeed: 2000,
                slidesToShow: 4,
                dots: false,
                rtl:true,
                responsive: [
                    {
                        breakpoint: 991,
                        settings: {
                            arrows: false,
                            centerMode: true,
                            centerPadding: '40px',
                            slidesToShow: 3,
                            variableWidth: false
                        }
                    },
                    {
                        breakpoint: 768,
                        settings: {
                            arrows: false,
                            centerMode: true,
                            centerPadding: '40px',
                            slidesToShow: 2,
                            variableWidth: false
                        }
                    },
                    {
                        breakpoint: 480,
                        settings: {
                            arrows: false,
                            centerMode: true,
                            centerPadding: '40px',
                            slidesToShow: 1,
                            variableWidth: false
                        }
                    }
                ]
            });
            $(".home-news .slider").slick({
                prevArrow: "",
                nextArrow: "",
                autoplay: true,
                autoplaySpeed: 2000,
                slidesToShow: 1,
                dots: true,
                rtl:true
            });
        });
        /* Nice Scroll
        ===============================*/
        $(document).ready(function () {
            
            "use strict";
            
            $("html").niceScroll({
                scrollspeed: 60,
                mousescrollstep: 35,
                cursorwidth: 7,
                cursorcolor: '#ffd42d',
                cursorborder: 'none',
                background: 'rgba(255,255,255,0.3)',
                cursorborderradius: 3,
                autohidemode: false,
                cursoropacitymin: 0.1,
                cursoropacitymax: 1,
                zindex: "999",
                horizrailenabled: false
            });
            $(".scrollbar,.scrollbar-item").niceScroll({
                scrollspeed: 60,
                mousescrollstep: 15,
                cursorwidth: 4,
                cursorcolor: '#ffd42d',
                cursorborder: 'none',
                background: 'rgba(255,255,255,0.3)',
                cursorborderradius: 3,
                autohidemode: false,
                cursoropacitymin: 0.1,
                cursoropacitymax: 1,
                zindex: "1",
                horizrailenabled: false
            });
            $(".table-responsive").niceScroll({
                scrollspeed: 60,
                mousescrollstep: 15,
                cursorwidth: 4,
                cursorcolor: '#ffd42d',
                cursorborder: 'none',
                background: 'rgba(255,255,255,0.3)',
                cursorborderradius: 3,
                autohidemode: false,
                cursoropacitymin: 0.1,
                cursoropacitymax: 1,
                zindex: "1",
                horizrailenabled: true
            });
           
        });
        
        /*  Charts
        ================================== */
        // google.charts.load('current', {'packages':['corechart']});
        //     google.charts.setOnLoadCallback(drawChart);
        
        //     function drawChart() {
        //     var data = google.visualization.arrayToDataTable([
        //         ['Year', 'Sales', 'Expenses'],
        //         ['2004',  1000,      400],
        //         ['2005',  1170,      460],
        //         ['2006',  660,       1120],
        //         ['2007',  1030,      540]
        //     ]);
        
        //     var options = {
        //         title: 'Company Performance',
        //         curveType: 'function',
        //         legend: { position: 'bottom' }
        //     };
        
        //     var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));
        //     var chart2 = new google.visualization.LineChart(document.getElementById('curve_chart2'));
        //     chart.draw(data, options);
        //     chart2.draw(data, options);
        //     }
        /* Login
        ================================ */
        $(document).ready(function (){
        
            var working = false;
        $('.login').on('submit', function(e) {
          e.preventDefault();
          if (working) return;
          working = true;
          var $this = $(this),
            $state = $this.find('button > .state');
          $this.addClass('loading');
          $state.html('مصادقة');
          setTimeout(function() {
            $this.addClass('ok');
            $state.html('مرحب بعودتك!');
            setTimeout(function() {
              $state.html('تسجيل الدخول');
              $this.removeClass('ok loading');
              working = false;
            }, 4000);
          }, 3000);
        });
        });
        /* Profile picture 
        ============================== */
        /* Setting comapny 
        ==============================*/
        $(document).ready(function (){
           
            $(".company-setting .user-nav li a").click(function (e){
                 e.preventDefault();
                  $("html, body").animate({
                      scrollTop: $("#"+ $(this).data("scroll")).offset().top
                  }, 1000);
          //Add Class Active
                $(this).addClass("active").parent().siblings().find("a").removeClass("active");
                e.preventDefault();
                $.scrollTo(e.target.hash, 600, {
                    offset: -120
                });
             });
             // Sycn Navbar
             $(window).scroll(function (){
                $(".setting-widget").each(function (){
                    if($(window).scrollTop() > ($(this).offset().top - 50)){
                       var  widgetID=$(this).attr("id");
                        $(".company-setting .user-nav  li a").removeClass("active");
                        $(".company-setting .user-nav  li a[data-scroll='"+ widgetID +"']").addClass("active");
                    }
                })
            })
            // Loadmore
            $(".box-hidden").slice(0, 4).show();
            $("#loadmore").on("click", function(e){
                e.preventDefault();
                
                $(".box-hidden:hidden").slice(0,4).slideDown();
                if($(".box-hidden:hidden").length == 0){
                    $(".load-more").fadeOut("slow");
                }
                $("html, body").animate({
                    scrollTop: $(this).offset().top - 150
                },1500);
            })
              // affix
              $('#setting-nav').affix({
                offset: {     
                    top: $('#setting-nav').offset().top - 150,
                    bottom: ($('footer').outerHeight(true))  
                }
            });
            
          });        
    });
//     google.charts.load('current', {packages: ['corechart', 'line']});
//     google.charts.setOnLoadCallback(drawBasic);

//     function drawBasic() {

//           var data = new google.visualization.DataTable();
//           data.addColumn('number', 'Date-Time');
//           data.addColumn('number', 'Stock Price');

//           data.addRows([
//             [0, 0],   [1, 10],  [2, 23],  [3, 17],  [4, 18],  [5, 9],
//             [6, 11],  [7, 27],  [8, 33],  [9, 40],  [10, 32], [11, 35],
//             [12, 30], [13, 40], [14, 42], [15, 47], [16, 44], [17, 48],
//             [18, 52], [19, 54], [20, 42], [21, 55], [22, 56], [23, 57],
//             [24, 60], [25, 50], [26, 52], [27, 51], [28, 49], [29, 53],
//             [30, 55], [31, 60], [32, 61], [33, 59], [34, 62], [35, 65],
//             [36, 62], [37, 58], [38, 55], [39, 61], [40, 64], [41, 65],
//             [42, 63], [43, 66], [44, 67], [45, 69], [46, 69], [47, 70],
//             [48, 72], [49, 68], [50, 66], [51, 65], [52, 67], [53, 70],
//             [54, 71], [55, 72], [56, 73], [57, 75], [58, 70], [59, 68],
//             [60, 64], [61, 60], [62, 65], [63, 67], [64, 68], [65, 69],
//             [66, 70], [67, 72], [68, 75], [69, 80]
//           ]);

//           var options = {
//             hAxis: {
//               title: 'Time'
//             },
//             vAxis: {
//               title: 'Popularity'
//             }
//           };

//           var chart = new google.visualization.LineChart(document.getElementById('chart_div'));

//           chart.draw(data, options);
// }
})(jQuery);

 