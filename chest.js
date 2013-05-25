
var Chest = function(data){
  var chestWidth = 100;
  var chestHeight = 50;

  var chest_group = new Kinetic.Group({
    draggable: true,
    x: data.x,
    y: data.y
  });

  var border = new Kinetic.Rect({
    stroke: data.color,
    strokeWidth: 5,
    fill: 'white',
    height: chestHeight,
    width: chestWidth
  });

  var knob = new Kinetic.Circle({
    stroke: data.color,
    strokeWidth: 5,
    fill: 'black',
    height: 5,
    width: 5,
    x: chestWidth/2,
    y: 10
  });

  chest_group.add(border);
  chest_group.add(knob);

  var entered = false;

  return {
    shape: chest_group,
    action: data.action,
    enteredBy: function(other){
      if(other == undefined)
          return false;

      var contains = 
          (other.getX() > chest_group.getX()) && 
          (other.getX() < chest_group.getX() + chestWidth) && 
          (other.getY() > chest_group.getY()) && 
          (other.getY() < chest_group.getY() + chestHeight);

      if(!entered && contains)
      {
         entered = true;
         return true; 
      } 

      if(entered && !contains){
        entered = false;
        return false;
      }

      return false;
    }
  }

}
