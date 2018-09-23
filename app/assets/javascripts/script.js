
$(function() {
    var anim_id;
    var spaces={motor1:0, motor2:0, motor3:0,motor4:0};
    const URL = "157.253.226.176/motors"
    //saving dom objects to variables
    var container = $('#container');
    var car = $('#car');
    var car_1 = $('#car_1');
    var car_2 = $('#car_2');
    var car_3 = $('#car_3');
    var car_4 = $('#car_4');
    var red = $('#red');
    var line_1 = $('#line_1');
    var line_2 = $('#line_2');
    var line_3 = $('#line_3');
    var restart_div = $('#restart_div');
    var restart_btn = $('#restart');
    var score = $('#score');
    var position;
    var danger_zone = $('#danger-zone');
    var light = { 1: '#481a02', 2: 'yellow', 3: 'orange', 4: 'red' }

    //saving some initial setup
    var container_left = parseInt(container.css('left'));
    var container_width = parseInt(container.width());
    var container_height = parseInt(container.height());
    var car_width = parseInt(car.width());
    var car_height = parseInt(car.height());

    //some other declarations
    var game_over = false;

    var score_counter = 1;

    var speed = 2;
    var line_speed = 5;

    var move_right = false;
    var move_left = false;
    var move_up = false;
    var move_down = false;

    $(document).on('keydown', function(e) {
        if (game_over === false) {
            var key = e.keyCode;
            if (key === 37 && move_left === false) {
                move_left = requestAnimationFrame(left);
            } else if (key === 39 && move_right === false) {
                move_right = requestAnimationFrame(right);
            } else if (key === 38 && move_up === false) {
                move_up = requestAnimationFrame(up);
            } else if (key === 40 && move_down === false) {
                move_down = requestAnimationFrame(down);
            }
        }

    });

    $(document).on('keyup', function(e) {
        if (game_over === false) {
            var key = e.keyCode;
            if (key === 37) {
                cancelAnimationFrame(move_left);
                move_left = false;
            } else if (key === 39) {
                cancelAnimationFrame(move_right);
                move_right = false;
            } else if (key === 38) {
                cancelAnimationFrame(move_up);
                move_up = false;
            } else if (key === 40) {
                cancelAnimationFrame(move_down);
                move_down = false;
            }
        }
        measureSide( car, car_1, spaces)
        // $.get( "http://157.253.226.176/", spaces );
        if (spaces.motor1 == 0) {
          $('.p-up').css('background', '#481a02')
        }
        if (spaces.motor2 == 0 ){
          $('.p-left').css('background', '#481a02')
        }
        if (spaces.motor3 == 0 ){
          $('.p-down').css('background', '#481a02')
        }
        if (spaces.motor4 == 0 ){
          $('.p-right').css('background', '#481a02')
        }
        spaces={motor1:0, motor2:0, motor3:0,motor4:0};

    });

    function left() {
        if (game_over === false && parseInt(car.css('left')) > 0) {
            car.css('left', parseInt(car.css('left')) - 5);
            move_left = requestAnimationFrame(left);
        }
    }

    function right() {
        if (game_over === false && parseInt(car.css('left')) < container_width - car_width) {
            car.css('left', parseInt(car.css('left')) + 5);
            move_right = requestAnimationFrame(right);
        }
    }

    function up() {
        if (game_over === false && parseInt(car.css('top')) > 0) {
            car.css('top', parseInt(car.css('top')) - 3);
            move_up = requestAnimationFrame(up);
        }
    }

    function down() {
        if (game_over === false && parseInt(car.css('top')) < container_height - car_height) {
            car.css('top', parseInt(car.css('top')) + 3);
            move_down = requestAnimationFrame(down);
        }
    }
      anim_id = requestAnimationFrame(repeat);

     function repeat() {

       if ( collision( car, danger_zone) ) {
         anim_id =cancelAnimationFrame(anim_id);
         stop = true
       }
        // car_down(car_1);

        zones(danger_zone);
        line_down(line_1);
        line_down(line_2);
        line_down(line_3);

        if (stop) {

        }
        anim_id = requestAnimationFrame(repeat);

    }

    function car_down(car) {
        var car_current_top = parseInt(car.css('top'));
        if (car_current_top > container_height) {
            car_current_top = -200;
            var car_left = parseInt(Math.random() * (container_width - car_width));
            car.css('left', car_left);
        }
        car.css('top', car_current_top + speed);
    }

    function line_down(line) {
        var line_current_top = parseInt(line.css('top'));
        if (line_current_top > container_height) {
            line_current_top = -300;
        }
        line.css('top', line_current_top + line_speed);
    }
    function zones(line) {
      var line_current_top = parseInt(line.css('top'));
        if (line_current_top < 2500) {
            line_current_top += 5;
        } else {
          var line_current_top = -1500;
        }
        line.css('top', line_current_top);

    }
    restart_btn.click(function() {
        location.reload();
    });

    function stop_the_game() {
        game_over = true;
        cancelAnimationFrame(zones);
        cancelAnimationFrame(line_down);
        // cancelAnimationFrame(move_left);
        // cancelAnimationFrame(move_up);
        // cancelAnimationFrame(move_down);
        // restart_div.slideDown();
        // restart_btn.focus();
    }

    /* ------------------------------GAME CODE ENDS HERE------------------------------------------- */


    function collision($div1, $div2) {
        var x1 = $div1.offset().left;
        var y1 = $div1.offset().top+20;
        var h1 = $div1.outerHeight(true);
        var w1 = $div1.outerWidth(true);
        var b1 = y1 + h1;
        var r1 = x1 + w1;
        var x2 = $div2.offset().left;
        var y2 = $div2.offset().top;
        var h2 = $div2.outerHeight(true);
        var w2 = $div2.outerWidth(true);
        var b2 = y2 + h2;
        var r2 = x2 + w2;

        if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
        return true;
    }

    var height = $("#car").outerHeight(true) * 4;

    function measureLeft( $div1, $div2, spaces ){
      let disLeft = $div1.offset().left - ($div2.offset().left + $div2.outerWidth(true));
      let range;
      if ( disLeft <= height ) {
        range = 100 - (( disLeft * 100 )/height);
      }
      if ( range > 0 ) {
        let left = (range/100) * 700;
        var arr = $('.p-left')
        setLight(range/100, arr)
        if( left > spaces.motor4 ) {
            spaces.motor2 = left;
        }
      }
    }

    function measureRight( $div1, $div2 ){
      let disRight =  ($div2.offset().left) - ($div1.offset().left + $div1.outerWidth(true));
      let range;
      if ( disRight <= height ) {
        range = 100 - (( disRight * 100 )/height);
      }
      if ( range > 0 ) {
        let right = (range/100) * 700;
        var arr = $('.p-right')
        setLight(range/100, arr)
        if( right > spaces.motor2 ) {
            spaces.motor4 = right;
        }
      }
    }

    function measureTop( $div1, $div2 ){
      let disTop = $($div1).offset().top - ($($div2).offset().top + $div2.outerHeight(true));
      let range;
      if ( disTop <= height ) {
        range = 100 - (( disTop * 100 )/height);
      }
      if ( range > 0 ) {
        let top = (range/100) * 700;
        var arr = $('.p-up')
        setLight(range/100, arr)
        if( top > spaces.motor1 ) {
            spaces.motor1 = top;
        }
      }
    }

    function measureBottom( $div1, $div2 ){
      let disBot = $($div2).offset().top - ($($div1).offset().top + $div1.outerHeight(true));
      let range;
      if ( disBot <= height ) {
        range = 100 - (( disBot * 100 )/height);
      }
      if ( range > 0 ) {
        let bottom = (range/100) * 700;
        var arr = $('.p-down')
        setLight(range/100, arr)
        if( bottom > spaces.motor3 ) {
            spaces.motor3 = bottom;
        }
      }
    }

    function setLight(range, arrow ){
      if ( range < 0.25 ) {
        arrow.css('background',light[1])
      } else if (range < 0.5) {
        arrow.css('background',light[2])
      } else if ( range < 0.75){
        arrow.css('background',light[3])
      } else if (range < 1) {
        arrow.css('background',light[4])
      }
    }

    function measureSide( $div1, $div2, spaces ){
      var x1 = $div1.offset().left;
      var y1 = $div1.offset().top;
      var h1 = $div1.outerHeight(true);
      var w1 = $div1.outerWidth(true);
      var b1 = y1 + h1;
      var r1 = x1 + w1;
      var x2 = $div2.offset().left;
      var y2 = $div2.offset().top;
      var h2 = $div2.outerHeight(true);
      var w2 = $div2.outerWidth(true);
      var b2 = y2 + h2;
      var r2 = x2 + w2;
      if ( y1 < b2 && b1 > y2 ) {
        if ( x1 > r2 ) {
          measureLeft( $div1, $div2, spaces );
        } else if ( r1 < x2 ) {
          measureRight( $div1, $div2, spaces );
        }
      } else if ( x1 < r2 && r1 > x2 ) {
        if ( y1 > b2 ) {
          measureTop( $div1, $div2, spaces );
        } else if ( b1 < y2 ) {
          measureBottom( $div1, $div2, spaces );
        }
      }
      console.log(spaces);

    }
    var stop = false;
    $('#start').on('click',function blop(){
      if (!stop) {
        anim_id =cancelAnimationFrame(anim_id);
        stop = true
      } else {
        anim_id = requestAnimationFrame(repeat)
        stop = false
      }
    })
});
