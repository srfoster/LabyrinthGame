

var Room = function(data){
  var top_margin = 30;
  var wall_width = 5;

  var enter = [wall_width * 2 + 70, top_margin+wall_width*2 + 5];
  var visitors = [];

  var visitorLayer = new Kinetic.Layer();
  stage.add(visitorLayer);

  //Place the border
  var border = new Kinetic.Rect({
    stroke: data.color,
    strokeWidth: wall_width,
    fill: 'white',
    height: roomHeight - wall_width*2 - top_margin,
    width: roomWidth - wall_width*2,
    x: wall_width,
    y: wall_width + top_margin
  });
  visitorLayer.add(border);

  //Place the room's label
  var room_name = new Kinetic.Text({
    text: data.name,
    color: data.color,
    fontSize: 30,
    fontFamily: 'Calibri',
    fill: 'black',
    align: 'center'
  });
  visitorLayer.add(room_name);
 
  //Place the room's exit door
  var door = new Door({
    x: 10,
    y: 40,
    from: this,
    to: null //Returns to previous room
  });
  visitorLayer.add(door.shape);

  var doors = [];
  doors.push(door);

  var chests = [];

  visitorLayer.draw();

  return{
    addVisitor:
      function(visitor){
        visitor.setX(enter[0]);
        visitor.setY(enter[1]);
        visitors.push(visitor);
        visitorLayer.add(visitor);
        visitorLayer.draw();
        visitor.room = this;
      },
    removeVisitor:
      function(visitor){
        var i = visitors.indexOf(visitor)
        visitors.splice(i,1);
        visitor.remove();
        visitor.room = undefined;
      },
    hide:
      function(){
        visitorLayer.hide(); 
      },
    show:
      function(){
        visitorLayer.show(); 
      },
    addDoor:
      function(door_data){
        door_data.x = Math.floor(Math.random() * (roomWidth - wall_width*2 - 200)) + 60;
        door_data.y = Math.floor(Math.random() * (roomHeight - top_margin - wall_width*2 - 200)) + top_margin + wall_width*2;

        var door = new Door(door_data); 

        visitorLayer.add(door.shape);
        doors.push(door);
      },
    addChest:
      function(chest_data){
        chest_data.x = Math.floor(Math.random() * (roomWidth - wall_width*2 - 200)) + 60;
        chest_data.y = Math.floor(Math.random() * (roomHeight - top_margin - wall_width*2 - 200)) + top_margin + wall_width*2;

        chest = new Chest(chest_data); 

        visitorLayer.add(chest.shape);
        chests.push(chest);
        visitorLayer.draw();
      },
    doors: doors,
    chests: chests,
    visitors: visitors,
    layer: visitorLayer
  }
}
