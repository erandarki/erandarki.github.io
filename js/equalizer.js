(function($) {
    "use strict";

    /* <![CDATA[ */
    var data = { "audio_source": "audio.mp3" };
    /* ]]> */

    function randomBetween(range) {
        var min = range[0],
            max = range[1];
        if (min < 0) {
            return min + Math.random() * (Math.abs(min)+max);
        }else {
            return min + Math.random() * max;
        }
    }

    // EQUALIZER TOGGLE
    if( data.audio_source !== '' ) {
        var source = data.audio_source;
        var audio = new Audio(); // use the constructor in JavaScript, just easier that way
        audio.addEventListener("load", function() {
            audio.play();
        }, true);
        audio.src = source;
        audio.autoplay = true;
        audio.loop = true;
        audio.volume = 0.01;

        $('.equalizer').click();
        var playing = true;
        $('.equalizer').on('click', function(e) {
            if (playing == false) {
                audio.play();
                playing = true;

            } else {
                audio.pause();
                playing = false;
            }
        });

        // EQUALIZER

        $.fn.equalizerAnimation = function(speed, barsHeight){
            var $equalizer = $(this);
            setInterval(function(){
                $equalizer.find('span').each(function(i){
                    $(this).css({ height:randomBetween(barsHeight[i])+'px' });
                });
            },speed);
            $equalizer.on('click',function(){
                $equalizer.toggleClass('paused');
            });
        };

        var barsHeight = [
            [2, 10],
            [5, 14],
            [11, 8],
            [4, 18],
            [8, 3]
        ];
        $('.equalizer').equalizerAnimation(180, barsHeight);
    }

})(jQuery);
