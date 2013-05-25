var Door = function(data){
  var doorWidth = 50;
  var doorHeight = 100;

  var door_group = new Kinetic.Group({
    draggable: true,
    x: data.x,
    y: data.y
  });

  var border = new Kinetic.Rect({
    stroke: data.color,
    strokeWidth: 5,
    fill: 'white',
    height: doorHeight,
    width: doorWidth
  });

  var knob = new Kinetic.Circle({
    stroke: data.color,
    strokeWidth: 5,
    fill: 'black',
    height: 5,
    width: 5,
    x: doorWidth - 10,
    y: doorHeight/2
  });

  door_group.add(border);
  door_group.add(knob);

  return{
    shape: door_group,
    from: data.from,  //Previous room
    to: data.to,  //Next room
    contains: function(other){
      if(other == undefined)
          return;

      var ret = 
          (other.getX() > door_group.getX()) && 
          (other.getX() < door_group.getX() + doorWidth) && 
          (other.getY() > door_group.getY()) && 
          (other.getY() < door_group.getY() + doorHeight);

      return ret;
    }
  }
}
