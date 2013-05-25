

var room_1    = new Room({width: 500, height: 500, name: "Main", color: "orange"});
var room_2    = new Room({width: 500, height: 500, name: "Second", color: "green"});
var room_3    = new Room({width: 500, height: 500, name: "Third", color: "red"});


room_1.addDoor({
  to: room_2,
  color: "green"
});

room_2.addDoor({
  to: room_3,
  color: "red"
});

room_3.addDoor({
  to: room_1,
  color: "orange"
});

room_1.addChest({
  color: 'purple',
  param_checks:  [hasInventory],
  param_filters: [identity],
  param_errors:  ["No items in inventory"],
  action: function(){
        var v = this.params[0];
        var shape = v.inventory.drop(v.inventory.items()[0]);
        room_1.addVisitor(new EmptyVisitor(shape));
        shape.setX(v.getX());
        shape.setY(v.getY());
  } 
});

room_1.addChest({
  color: 'teal',
  param_checks:  [isNumber,        isNumber],
  param_filters: [removeAndReturn, identity],
  param_errors:  ["Not a number",  "Not a number"],
  action: function(){  
    var int_vis_1 = this.params[0];
    var int_vis_2 = this.params[1];

    var int_1 = int_vis_1.data;
    var int_2 = int_vis_2.data;

    int_vis_2.setData(int_2 + int_1);
  } 
});

var visitor_1 = new EmptyVisitor(
  new Kinetic.Circle({
    stroke: 'black',
    strokeWidth: 5,
    fill: 'white',
    radius: 25,
    offset: -25
  })
);
room_1.addVisitor(visitor_1);

var inventory = new Inventory();
inventory.addInteger(4);
inventory.addInteger(3);
inventory.addInteger(9);
inventory.addInteger(7);
inventory.addInteger(10);
inventory.addInteger(4);
inventory.addInteger(3);
inventory.addInteger(9);
inventory.addInteger(7);
inventory.addInteger(10);


visitor_1.inventory = inventory;

var labyrinth = new Labyrinth();

labyrinth.addRoom(room_1);
labyrinth.addRoom(room_2);
labyrinth.addRoom(room_3);

labyrinth.start();
