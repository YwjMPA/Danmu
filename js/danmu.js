$(document).ready(function() {
  var ref = new Wilddog("https://danwu.wilddogio.com/");	
  var danmu = document.getElementById("danmu-input");  
  var arr = [];
  $("#submit").click(function() {
    if(!danmu.value){
      $("#warning").fadeIn(1000).fadeOut(1000);
    }else{
    	  var text = danmu.value;
   	  ref.child('message').push(text);
      $("input").val("");
    }
  });
  $("#clear").click(function() {
  	ref.remove();
  	arr = [];
  	$(".msg").empty();
  })
  $("#danmu-input").keypress(function(event) {
    if (event.keyCode == "13") {      
       $("#submit").trigger("click");
    }
  });
  ref.child('message').on('child_added',function(snapshot) {
  	var text = snapshot.val();
  	arr.push(text);
  	var textObj = $("<div class=\"msg\"></div>");
  	textObj.text(text);
    $("#danmu_show").append(textObj);
    mov(textObj);
  });
  var mask_width = $("#mask").width();
  var mask_topMax = $("#mask").height();
  var mask_topMin = 30;
  function mov(obj)  {
  	obj_width = obj.width()
  	var move_left = Math.ceil(obj_width / mask_width * 100 + 100);
  	mask_topMin = mask_topMin + 50;
  	if (mask_topMin >= mask_topMax - 50) {
  		mask_topMin = 30;
  	}
  	obj.css({
  		top:"" + mask_topMin + "px",
  		left:"100%",
  		color:randomColor()
  	});
  	var time = 12000 + 10000 * Math.random();
    obj.animate({"left":"-=" + move_left + "%"},time, function () {
    		obj.remove();
    });
  };
  function randomColor() {
    function randomNum() {
      return Math.round(Math.random()*(255-60) + 60);
    }
    return  ("rgb(" + randomNum()  + "," + randomNum()+',' + randomNum() + ")"); 
  }
   var getAndRun = function() {
    if (arr.length > 0) {
      var n = Math.floor(Math.random() * arr.length + 1) - 1;
      var textObj = $("<div class = \"msg\">" + arr[n] + "</div>");
      $("#danmu_show").append(textObj);
      mov(textObj);
    }
    setTimeout(getAndRun, 3000);
  }
  jQuery.fx.interval = 50;
  getAndRun();
});