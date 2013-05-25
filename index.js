

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
  action: function(v){
    try{
        var shape = v.inventory.drop(v.inventory.items()[0]);
        room_1.addVisitor(new EmptyVisitor(shape));
        shape.setX(v.getX());
        shape.setY(v.getY());
    }catch(e){
    }
  } 
});

room_1.addChest({
  color: 'teal',
  param1: undefined,
  action: function(v){  //Adds two integers.  Can't you see that?
    if(v.data == undefined)
      return;

    if(this.param1 == undefined)
    {
      this.param1 = v;
      room_1.removeVisitor(v);
      room_1.layer.draw();
      return; 
    }

    this.param1.remove();

    v.data = this.param1.data + v.data;
    v.setText(""+v.data);

    this.param1 = undefined;
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
