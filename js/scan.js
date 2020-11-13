// var key = "197c41c0f47432d835afd6d84a7f5db8";
// var secret = "c82e89c6ec7fa3fe";
$(document).ready(function(){
    //var pg_num = 0;
    function makeApiCall(){
        // var $num_photos = $('#num_photos');
        // var $tags = $('#tags');
        // var tag = $tags.val();
        // var subtags = tag.split();
        
        //pg_num = pg_num + 1
        var url =`https://en.wikipedia.org/api/rest_v1/page/summary/Stack_Overflow`;
        
        console.log(url);
        $.ajax({url:url, dataType:"jsonp", jsonp: 'jsoncallback'}).then(function(data) {
            //helper function - to be used to get the key for each of the 5 days in the future when creating cards for forecasting weather
            console.log(data);
            //$('#searched_images').append(data.photos.photo)
            // $.each(data.photos.photo, function(i, sp){
            //     //console.log(sp);
            //     var title = sp.title;
            //     //console.log(title)
            //     var img_link = sp.url_sq;
          
            //     $("#searched_images").append(`
            //     <div class="card" style="width: 18rem;">
            //         <img class="card-img-top border-2" src = ${img_link} alt="picture">
            //         <div class="card-body">
            //             <p class="card-text">${title}</p>
            //         </div>
            //     </div>`);
            // })
        })
    }
    
    $('#search').on('click', function(){
        makeApiCall();
    })

    // $(window).on("scroll", function() {
    //     var scrollHeight = $(document).height();
    //     var scrollPosition = $(window).height() + $(window).scrollTop();
    //     if ((scrollHeight - scrollPosition) / scrollHeight === 0) {
    //         makeApiCall();
    //     }
    // });
});

