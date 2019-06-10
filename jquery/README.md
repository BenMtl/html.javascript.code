# Simple yet effective CSS tricks using jQuery

## Change Specific CSS Element

It’s really easy to change CSS with jQuery this is the format of the .CSS() function.

    $('jQuery selector').css({"css property name":"css property value"});

Here are some common examples:

    //change paragraph text colour to green 
    $('p').css({"color":"green"});

    //float all divs with class .left
    $('div.left').css('float');

    //change all elements with class .bg-red to have a red background
    $('.bg-red').css({"background-color":"red"});

## Nest Your jQuery CSS Commands

It is handy to know jQuery can equally interpret the CSS and DOM formatting of multiple-word properties. This will not only save you alot of time but it looks prettier!

    newimg.css({'background-image': 'url('+newimgsrc+')'});
    newimg.css({'position': 'absolute'});
    newimg.css({'height': '70px'});
    newimg.css({'width': '200px'});
    newimg.css({'top': '68px'});
    newimg.css({'right': '2px'});

Is exactly the same as:

    newimg.css({'background-image': 'url('+newimgsrc+')', 'position': 'absolute', 'height': '70px', 'width': '200px', 'top': '68px', 'right': '2px'});

## Remove CSS Styles

There are two main ways to remove CSS styles not much difference between them.

1\. You can remove the class associated with the page or element

    //remove text color from a div
    $('#mydiv').removeClass('colors');

2\. You can also remove CSS styles on certain elements directly

    //remove text color from a div
    $('#mydiv').css('color', '');

This is also a nifty jQuery CSS trick to remove and add a class in the same call.

    //change text color from red to green (classes specified in stylesheet)
    $('#div').removeClass('red').addClass('green');

## Extending Existing Styles Values

You may wish to just extend a style based upon it’s current value. For example, if an element’s padding-left was 10px then the following code would result in a total padding-left of 25px.

    .css( "padding-left", "+=15" )

## jQuery .CSS() Function Property

As most of you avid jQuery developers know, as of jQuery 1.4, .css() allows us to pass a function as the property value. This is handy for returning current CSS values to determine changes.

    $('div.example').css('width', function(index) {
      return index * 50;
    });

## Common Background CSS Changes

Here are some examples of changing background CSS.

    $('#myDiv').css('background-image', 'my_image.jpg');
    // OR
    $('#myDiv').css('background', 'path/to/image.jpg');
    // OR
    $('#myDiv').css("background-image", "url(/myimage.jpg)");  

    <br /><br />
    <h2>A Full Code Example - Set Div Background Image</h2>
    This is a full example of jQuery Code to set a background image into a div dynamically when the page is loaded.

    [code lang="js"]
    <script type='text/javascript'>
    $(document).ready(function() {
    	//preload image (add timestamp to prevent cache)
    	var newimgsrc = 'https://dab1nmslvvntp.cloudfront.net/wp-content/uploads/jquery4u/2011/03/jquery-plugins2.jpg?' + (new Date().getTime());
    	var newimg = $('#header');
        //replace the image
    	$('#header').css("background-image", "url("+newimgsrc+")");
    	newimg.css({'background-image': 'url('+newimgsrc+')', 'position': 'absolute', 'height': '70px', 'width': '200px', 'top': '68px', 'right': '2px'});
    	newimg.show();
    });
    </script>
