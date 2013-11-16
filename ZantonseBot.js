//FightCode can only understand your robot
//if its class is called Robot
var Robot = function (robot) {
	robot.clone();
};


Robot.prototype.onIdle = function (ev) {
	var robot = ev.robot;
	robot.cannonAngle = robot.angle + 90;
	robot.turn(50);
};


Robot.prototype.onScannedRobot = function (ev) {
	var robot = ev.robot;
	var scannedRobot = ev.scannedRobot;
	var isClone = (scannedRobot.parentId === robot.id);
  var isParent = (robot.parentId === scannedRobot.id);
	
	if(isParent || isClone) {
			return; 
		}
	
	robot.stop();
	for (var i=0;i<5;i++) {
		robot.fire();
		robot.ahead(5);
	} robot.turnLeft(5);
};

Robot.prototype.onWallCollision = function (ev) {
	var robot = ev.robot;
	var bearing = ev.bearing;
	var rotateAngle = 90-robot.angle % 90
	
	robot.turn(rotateAngle);
};

Robot.prototype.onRobotCollision = function (ev) {
    var robot = ev.robot;
	var collidedRobot = ev.collidedRobot;
	var bearing = ev.bearing;
	
	if(collidedRobot.parentId == robot.id){
		robot.ignore(robot.onScannedRobot); 
	} else { 
		if(ev.myFault && (robot.life > collidedRobot.life)) {
			robot.turn(bearing);
			robot.back(30);
		} else {
			robot.back(30);
			robot.turn(45);
			robot.back(30);
			}
	}
};

Robot.prototype.onHitByBullet = function (ev) {
	var robot = ev.robot;
	
    if (robot.availableDisappears) robot.disappear();
	robot.turn(ev.bearing-150);
    robot.ahead(100);
	robot.log(robot.position.x);
	robot.log(robot.position.y);
};