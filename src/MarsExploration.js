class MarsExploration {

  plateau;
  rovers = [];

  definePlateauSize(name, upperRightCoordinates) {
    const [upperX, upperY] = upperRightCoordinates.split(",")
    
    const plateau = {
      name: name,
      upperX: parseInt(upperX),
      upperY: parseInt(upperY)
    };
    
    return this.plateau = plateau;
  }

  landRover(roverId, name, landingPosition) {
    const [positionX, positionY, orientation] = landingPosition.split(" ")
    const rover = {
      id: roverId,
      name: name,
      positionX: parseInt(positionX),
      positionY: parseInt(positionY),
      orientation: orientation
    }
    this.rovers.push(rover)
    return rover;
  }

  moveRover(roverId, commands) {
    let rover = this.getRoverPosition(roverId)
    const splitted_commands = commands.split('')

    splitted_commands.forEach(command => {
      if (command == 'M') {
        // if (this.canMove(rover, command)) {
          rover = this.move(rover, command)
        // }
      }
      else {
        rover = this.move(rover, command)
      }
    });
    
    return {
      newPositionX: rover.positionX,
      newPositionY: rover.positionY,
      newOrientation: rover.orientation
    };
  }

  //check boundaries
  canMove(rover, command) {
    if 
      ((rover.orientation == 'N' && rover.positionY == this.plateau.upperY) || 
      (rover.orientation == 'E' && rover.positionX == this.plateau.upperX) ||
      (rover.orientation == 'S' && rover.positionX == 0) ||
      (rover.orientation == 'W' && rover.positiony == 0)) {
        return false
    }   
  }

  move(rover, command) {
    // effectivelly changes position
    if (command == 'M') { 
      if (rover.orientation == 'N') {
        rover.positionY +=1 
      }
      else if (rover.orientation == 'S') {
        rover.positionY -=1 
      }
      else if (rover.orientation == 'E') {
        rover.positionX +=1 
      }
      else if (rover.orientation == 'W') {
        rover.positionX -=1 
      }
      return rover
    }
    else {
      if (command == 'L') {
        this.movesLeft(rover)
       
      }
      else {
       this.movesRight(rover)
      }
      return rover
    }
  }

  movesLeft(rover) {
    if (rover.orientation == 'N') {rover.orientation = 'W'}
    else if (rover.orientation == 'S') {rover.orientation = 'E'}
    else if (rover.orientation == 'E') {rover.orientation = 'N'}
    else if (rover.orientation == 'W') {rover.orientation = 'S'}
  }

  movesRight(rover) {
    if (rover.orientation == 'N') {rover.orientation = 'E'}
    else if (rover.orientation == 'S') {rover.orientation = 'W'}
    else if (rover.orientation == 'E') {rover.orientation = 'S'}
    else if (rover.orientation == 'W') {rover.orientation = 'N'}
  }

  getRoverPosition(roverId) {
    return this.rovers.find(rover => 
      rover.id === roverId
    );
  }

  getRoverPositionMessage(roverId) {
    const rover = this.getRoverPosition(roverId)
    const message = 'Rover "' + rover.name +
                   '" is now at positioin ' +
                   rover.positionX + ' ' + rover.positionY + ' ' + 
                   rover.orientation
    return message
  }
}

module.exports = MarsExploration;