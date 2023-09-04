
/**
 * Calculates the new position after moving some distance at some rotational value
 * @param {*} x x-coordinate of start pos
 * @param {*} y y -coodinate of start pos
 * @param {*} rotation rotation of travel in radians
 * @param {*} distance distance to be traveled in Three.js units
 * @return the new position
 */
function calculateNextPosition(x, y, rotation, distance) {
    let newX = x + Math.cos(rotation) * distance;
    let newY = y + Math.sin(rotation) * distance;

    return [newX, newY];
}

export default calculateNextPosition;