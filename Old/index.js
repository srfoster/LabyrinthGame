var IntegerInput = function(data){
   var text = new Kinetic.Text({
                            text: data.val + "",
                            fontSize: 18,
                            fontFamily: 'Calibri',
                            fill: 'black',
                            width: 60,
                            height: 55,
                            padding: 20,
                            align: 'center'
                });


    var textBox = new Kinetic.Rect({
                            stroke: '#555',
                            strokeWidth: 5,
                            fill: '#ddd',
                            width: 60,
                            height: 55,
                            height: text.getHeight(),
                            shadowColor: 'black',
                            shadowBlur: 10,
                            shadowOffset: [10, 10],
                            shadowOpacity: 0.2,
                            cornerRadius: 10
                });

     var ret = {
       group: new Kinetic.Group({x: data.x, y: data.y, offset: 55/2 }),
       getX: function(){ return this.group.getX(); },
       getY: function(){ return this.group.getY(); },
       setX: function(x){ return this.group.setX(x); },
       setY: function(y){ return this.group.setY(y); },
       setText: function(t) { 
             var text = this.group.getChildren()[1];
             text.setText(t);
       },
       getVal: function(){
             var text = this.group.getChildren()[1];
             var val = parseInt(text.getText());
             return val;
       }
     };
   
    
    ret.group.add(textBox);
    ret.group.add(text);

    mainLayer.add(ret.group);

    return ret;
}



var FunctionBox = function(data){
   var rect = (new Kinetic.Rect({
                            x: data.x,
                            y: data.y,
                            width: 100,
                            height: 50,
                            fill: data.fill,
                            stroke: 'black',
                            strokeWidth: 4,
                            draggable: true
                       }));

   var is_inside = false;

   ret = {
      shape : rect,
      getX: function(){return rect.getX();},
      getY: function(){return rect.getY();},
      getWidth: function(){return rect.getWidth();},
      getHeight: function(){return rect.getHeight();},
      action: data.action,
      doActionIfInside: function(input){
           if(inside(input,this) && !is_inside)
           {
             this.action(input);
             is_inside = true;
           } else if (!inside(input,this) && is_inside) {
             is_inside = false;
           }
      }
   };

   widgetLayer.add(ret.shape);

   return ret;
}


function inside(shape, rect)
{
   return shape.getX() > rect.getX() && shape.getX() < rect.getX() + rect.getWidth() &&
          shape.getY() > rect.getY() && shape.getY() < rect.getY() + rect.getHeight()
}



var originalNumber = parseInt(window.location.toString().split('=')[1]);

var canvasWidth = 1000, 
    canvasHeight = 800;

var original_points = [0,100, 100, 100];
var points = [0,100, 100, 100];

var recursiveImageUrl = undefined;
var recImage = undefined;
var recursiveCall = false;

var recImage_original_x = 700;
var recImage_original_y = 600;
var recImage_original_width = 200;
var recImage_original_height = 160;

var lost = false;
var won = false;

var stage           = new Kinetic.Stage({
                             container: "container", 
                             width: canvasWidth, 
                             height: canvasHeight
                          });

var mainLayer       = new Kinetic.Layer();
var widgetLayer     = new Kinetic.Layer();

var feedbackText    = new Kinetic.Text({
                        x: 0,
                        y: 10,
                        width: 1000,
                        text: '',
                        fontSize: 30,
                        fontFamily: 'Calibri',
                        fill: 'green',
                        align: 'center'
                    });
mainLayer.add(feedbackText);



var bgBox = new Kinetic.Rect({
                            stroke: '#555',
                            strokeWidth: 5,
                            fill: 'white',
                            width: canvasWidth,
                            height: canvasHeight,
});
widgetLayer.add(bgBox);

var inputThing = new IntegerInput({
   x: points[0],
   y: points[1],
   val: originalNumber
});





var greenLine       = new Kinetic.Line({
                            points: points,
                            stroke: 'green',
                            strokeWidth: 2,
                            lineJoin: 'round',
                            dashArray: [33, 10]
                        });
mainLayer.add(greenLine);


var subBox = new FunctionBox({
          x: 600,
          y: 100,
          fill: '#00D2FF',
          action: function(input){
            input.setText(input.getVal()-1);
          }
        });


var oneBox             = new FunctionBox({
                            x: 600,
                            y: 500,
                            fill: 'red',
                            action: function(input){
                                 var box = input.getChildren()[0];
                                 var text = input.getChildren()[1];
                                 var num = parseInt(text.getText());
                                 if(num != 1){
                                     text.setText("F");
                                     box.setFill("#A00");
                                     feedbackText.setText("YOU LOSE: This box only accepts the number 1");
                                     feedbackText.setFill("red");
                                     lost = true;
                                 } 
                                 else if(originalNumber % 2 == 1) 
                                 {
                                     text.setText("T");
                                     box.setFill("green");
                                     feedbackText.setText("YOU WIN: " + originalNumber + " is odd");
                                     feedbackText.setFill("green");
                                     won = true;
                                 }
                                 else
                                 {
                                     text.setText("F");
                                     box.setFill("#A00");
                                     feedbackText.setText("YOU LOSE: " + originalNumber + " was even");
                                     feedbackText.setFill("red");
                                     lost = true;
                                 }
                            }
                       });

zeroBox = new FunctionBox({
        x: 200,
        y: 400,
        fill: 'green',
        action: function(input){
             var box = input.getChildren()[0];
             var text = input.getChildren()[1];
             var num = parseInt(text.getText());
             if(num != 0){
                 text.setText("F");
                 box.setFill("#A00");
                 feedbackText.setText("YOU LOSE: This box only accepts the number 0");
                 feedbackText.setFill("red");
                 lost = true;
             } 
             else if(originalNumber % 2 == 0)
             {
                 text.setText("T");
                 box.setFill("green");
                 feedbackText.setText("YOU WIN: " + originalNumber + " is even");
                 feedbackText.setFill("green");
                 won = true;
             }
             else
             {
                 text.setText("F");
                 box.setFill("#A00");
                 feedbackText.setText("YOU LOSE: " + originalNumber + " was odd");
                 feedbackText.setFill("red");
                 lost = true;
             }
        }
    });


var patternBox             = new FunctionBox({
                                x: 200,
                                y: 100,
                                fill: 'orange',
                                action: function(input){
                                      var text = input.getChildren()[1];
                                      var num = parseInt(text.getText());

                                      if(num == 1)
                                      {
                                        next_x = oneBox.getX() + 50;
                                        next_y = oneBox.getY() + 10;
                                        start_x = input.getX();
                                        start_y = input.getY();
                                        var redLine       = new Kinetic.Line({
                                                                    points: [start_x, start_y, next_x, next_y],
                                                                    stroke: 'orange',
                                                                    strokeWidth: 2,
                                                                    lineJoin: 'round',
                                                                    dashArray: [33, 10]
                                                                });
                                        widgetLayer.add(redLine);
                                        widgetLayer.draw();
                                      } else if (num == 0) {
                                        next_x = zeroBox.getX() + 50;
                                        next_y = zeroBox.getY() + 10;
                                        start_x = input.getX();
                                        start_y = input.getY();
                                        var redLine       = new Kinetic.Line({
                                                                    points: [start_x, start_y, next_x, next_y],
                                                                    stroke: 'orange',
                                                                    strokeWidth: 2,
                                                                    lineJoin: 'round',
                                                                    dashArray: [33, 10]
                                                                });
                                        widgetLayer.add(redLine);
                                        widgetLayer.draw();
                                      }
                                }
                           });



var recBox             = new Kinetic.Rect({
                            x: 400,
                            y: 200,
                            width: 100,
                            height: 50,
                            fill: 'white',
                            stroke: 'black',
                            strokeWidth: 4,
                            draggable: true
                       });



stage.add(widgetLayer);

stage.toDataURL({
  callback: function(dataUrl) {
        recursiveImageUrl = dataUrl;
        stage.add(mainLayer);
   }
});




var start_x = points.shift();
var start_y = points.shift();
var next_x  = points.shift(); 
var next_y  = points.shift(); 


var anim = new Kinetic.Animation(function(frame) {
   if(next_x == undefined || next_y == undefined)
      return;

   if(lost || won) {
      setTimeout(function(){
                  if(won)
                      window.location = window.location.pathname + "?num=" + (originalNumber + 1);
                  else
                      window.location = window.location.pathname + "?num=" + 0;
                }, 1000);
      return;
   }


   if(recursiveCall)
   {
      inputThing.setX(original_points[0]);
      inputThing.setY(original_points[1]);

      if(recImage.getWidth() < canvasWidth)
          recImage.setWidth(recImage.getWidth() + 10);      
      if(recImage.getHeight() < canvasHeight)
          recImage.setHeight(recImage.getHeight() + 10);      
      if(recImage.getX() > 0)
          recImage.setX(recImage.getX() - 10);
      if(recImage.getY() > 0)
          recImage.setY(recImage.getY() - 10);

      var done = recImage.getWidth() >= canvasWidth && 
                 recImage.getHeight() >= canvasHeight &&
                 recImage.getX() <= 0 &&
                 recImage.getY() <= 0;

      if(done)
      {
         recImage.setWidth(recImage_original_width);
         recImage.setHeight(recImage_original_height);
         recImage.setX(recImage_original_x);
         recImage.setY(recImage_original_y);
         recursiveCall = false;

         points = original_points.slice(0);

         start_x = points.shift();
         start_y = points.shift();
         next_x  = points.shift(); 
         next_y  = points.shift(); 
    
         widgetLayer.draw();
      } else {
         widgetLayer.draw();
         return;
      }


   }



   greenLine.setPoints(original_points);

   var diff_x = start_x - next_x;
   var diff_y = start_y - next_y;
   var distance = Math.sqrt(diff_x*diff_x + diff_y*diff_y);
   
   var vec_x = (diff_x * 5.0) / distance;
   var vec_y = (diff_y * 5.0) / distance;
   
   var x = inputThing.getX() - vec_x;
   var y = inputThing.getY() - vec_y;
   inputThing.setX(x);
   inputThing.setY(y);
  
   var new_diff_x = x - next_x;
   var new_diff_y = y - next_y;
   var new_distance = Math.sqrt(new_diff_x*new_diff_x + new_diff_y*new_diff_y);

   if(new_distance < 10)
   {
      start_x = next_x;
      start_y = next_y;

      next_x  = points.shift();
      next_y  = points.shift();
      
   }


   if(recImage != undefined && inside(inputThing,recImage))
   {
      recursiveCall = true;
   }



   patternBox.doActionIfInside(inputThing);
   zeroBox.doActionIfInside(inputThing);
   oneBox.doActionIfInside(inputThing);
   subBox.doActionIfInside(inputThing);


   if(recursiveImageUrl != undefined)
   {
      var imageObj = new Image();
      imageObj.onload = function() {
        recImage = new Kinetic.Image({
                  image: imageObj,
                  x: recImage_original_x,
                  y: recImage_original_y,
                  width: recImage_original_width,
                  height: recImage_original_height,
                  stroke: 'black',
                  strokeWidth: 4,
                  draggable: true
                });
        widgetLayer.add(recImage);
        widgetLayer.draw();
      };
      imageObj.src = recursiveImageUrl;
  

      recursiveImageUrl = undefined;
   }
}, mainLayer);

anim.start();

stage.getContainer().addEventListener('mousedown', 
  function(evt) {
    points.push(evt.x);
    points.push(evt.y);
    original_points.push(evt.x);
    original_points.push(evt.y);
    if(next_x == undefined && next_y == undefined)
    {
        next_x = points.shift();
        next_y = points.shift();
    }
  }
);

