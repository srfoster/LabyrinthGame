
var roomHeight = 700;
var roomWidth = 900;

var inventoryHeight = 700;
var inventoryWidth = 300;

var stage =
  new Kinetic.Stage({
    container: "container", 
    width: roomWidth + 10 + inventoryWidth, 
    height: roomHeight
  });

var lineLayer = new Kinetic.Layer();
stage.add(lineLayer);

var Labyrinth = function(){

  var rooms = [];
  var current_room = null;
  var stack = [];

  var destinations = {};

  function enterDoor(door, visitor)
  {
      stopVisitors();

      current_room.hide();
      
      if(visitor != undefined)
          current_room.removeVisitor(visitor);

      if(door.to != null)
      {
          stack.push(current_room);
          current_room = door.to;
      } else {
          current_room = stack.pop();
      }
      
      if(visitor != undefined)
          current_room.addVisitor(visitor);

      current_room.show();
      current_room.layer.draw();
      stage.draw();
  }

  function moveSelectedVisitor(x,y)
  {
    var visitors = current_room.visitors;
    for(i=0;i<visitors.length;i++){
        var visitor = visitors[i];

        if(visitor.isSelected()){
          visitor.pushDestination(x, y);
        }
    }
  }


  function showInventory(visitor){
  }

  function stopVisitors()
  {
    var visitors = current_room.visitors;
    for(i=0;i<visitors.length;i++){
      var visitor = visitors[i];
      visitor.clearDestinations();  
    }
  }

  function updateVisitor(visitor){
      if(visitor.isSelected()){
        var dest   = visitor.currentDestination();
        if(dest == undefined) return;

        var next_x = dest[0];
        var next_y = dest[1];

        if(next_x != undefined && next_y != undefined){
           var start_x = visitor.getX();
           var start_y = visitor.getY();

           var diff_x = start_x - next_x;
           var diff_y = start_y - next_y;
           var distance = Math.sqrt(diff_x*diff_x + diff_y*diff_y);

           if(distance < 10)
           {
              visitor.shiftDestination();
           }
           
           var vec_x = (diff_x * 5.0) / distance;
           var vec_y = (diff_y * 5.0) / distance;
           
           var x = visitor.getX() - vec_x;
           var y = visitor.getY() - vec_y;
           visitor.setX(x);
           visitor.setY(y);
           stage.draw();
        }
      }
  }

  return {
    current_room: current_room,
    addRoom: function(room){
      if(rooms.length == 0)
      {
        current_room = room;
        room.show();
      } else {
        room.hide();
      }

      rooms.push(room); 
    },
    start: function(){
        stage.getContainer().addEventListener('mousedown', 
          function(evt) {
            for(var i=0;i<current_room.doors.length;i++)
            {
                var door = current_room.doors[i];
                point = new Point(evt.x,evt.y);
                if(door.contains(new Point(evt.x,evt.y))){

                    enterDoor(door, undefined); 
                    return;
                } 
            }

            var to_select;

            for(var i=0;i<current_room.visitors.length;i++)
            {
                var visitor = current_room.visitors[i];
                if(visitor.contains(evt.x,evt.y)){
                    to_select = visitor;
                    break;
                } 
            }


            if(to_select != undefined)
            {
                for(var i=0;i<current_room.visitors.length;i++)
                {
                    var visitor = current_room.visitors[i];
                    if(visitor == to_select)
                       to_select.toggle(); 
                    else
                        visitor.unselect();
                }
                
            } else {
                moveSelectedVisitor(evt.x, evt.y);
            }

            
          }
        );

        var anim = 
          new Kinetic.Animation(function(frame) {
            var visitors = current_room.visitors;
            var doors    = current_room.doors;
            var chests   = current_room.chests;


            for(i=0;i<visitors.length;i++){
            var visitor = visitors[i];

              updateVisitor(visitor);

              showInventory(visitor); 

              for(j=0;j<doors.length;j++){
                var door    = doors[j];

                if(door.contains(visitor))
                {
                  enterDoor(door, visitor);
                } 
              }

              for(j=0;j<chests.length;j++){
                var chest    = chests[j];
                 
                if(visitor.isSelected() && chest.enteredBy(visitor))
                {
                    chest.action(visitor);
                }
              }
            }
          });

        anim.start();
    }
  }
}

var Point = function(x,y){
  return {
    getX: function(){
      return x;
    },
    getY: function(){
      return y;
    }
  }
}
