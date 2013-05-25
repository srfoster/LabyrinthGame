
var EmptyVisitor = 
  function(shape){
    var selected = false;

    shape.isSelected = function(){ return selected;}
    
    shape.toggle = function(){
      if(shape.isSelected()){
        shape.unselect();
      }
      else{
        shape.select();
      }
    }

    shape.select = function() { 
        shape.setFill("orange");
        shape.draw();
        selected = true;
    }

    shape.unselect = function() { 
        shape.setFill("white");
        shape.draw();
        selected = false; 
    }

    var destinations = []

    shape.pushDestination = function(x,y){
      destinations.push(x);
      destinations.push(y);
    }

    shape.shiftDestination = function(){
      return [destinations.shift(), destinations.shift()];
    }

    shape.currentDestination = function(){
      return [destinations[0], destinations[1]];
    }

    shape.clearDestinations = function(){
      return destinations = [];
    }

    shape.inventory = {};

    shape.contains = function(x,y){
      var ret = 
          (x > shape.getX()) && 
          (x < shape.getX() + shape.getWidth()) && 
          (y > shape.getY()) && 
          (y < shape.getY() + shape.getHeight());

      return ret;
    }
      
    return shape;
  }

