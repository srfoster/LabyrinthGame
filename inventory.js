
var Inventory = function(data){
  var top_margin = 30;
  var wall_width = 5;

  var itemLayer = new Kinetic.Layer();
  stage.add(itemLayer);

  var itemGroup = new Kinetic.Group({
    x: roomWidth + 10,
    y: wall_width + top_margin
  });
  itemLayer.add(itemGroup);

  //Place the border
  var border = new Kinetic.Rect({
    stroke: 'black',
    strokeWidth: wall_width,
    fill: 'white',
    height: inventoryHeight - wall_width*2 - top_margin,
    width: inventoryWidth - wall_width*2
  });

  itemGroup.add(border);
  itemGroup.draw();


  var items       = [];
  var item_shapes = [];


  return {
    moveToTop: function(){
      itemLayer.moveToTop();
    },
    moveToBottom: function(){
      itemLayer.moveToBottom();
    },
    addInteger: function(integer){
       var text = new Kinetic.Text({
                            text: "" + integer,
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
                            height: text.getHeight(),
                            shadowColor: 'black',
                            shadowBlur: 10,
                            shadowOffset: [10, 10],
                            shadowOpacity: 0.2,
                            cornerRadius: 10
                });
      var item = new Kinetic.Group({
        x: 25 + (items.length % 4) * 60,
        y: 10 + Math.floor(items.length / 4) * 60
      });
      item.add(textBox);
      item.add(text);
      item.getWidth = function(){ return textBox.getWidth();}
      item.getHeight = function(){ return textBox.getHeight();}
      item.setFill = function(color){textBox.setFill(color);}
      item.setText = function(t){text.setText(t);}
      item.data = integer;

      items.push(integer);
      item_shapes.push(item);

      itemGroup.add(item);
      item.draw();
    },
    drop: function(item){
      var index = items.indexOf(item);         
      var shape = item_shapes[index];
      items.splice(index,1);
      item_shapes.splice(index,1);
      shape.remove();
      return shape;
    },
    items: function(){
      return items;
    }
  };
}
