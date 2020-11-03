const Direction = {
    UP: 1,
    DOWN: 2,
    RIGHT: 3,
    LEFT: 4,
};

const GRID_SIZE = 20

class SnakeApp {
    
    buildPositionStr(position) {
        return this.padZeros(position.y, 2) + "x" + this.padZeros(position.x, 2);
    }

    padZeros(number, numberOfDigits) {
        let result = number.toString();
        while (result.length < numberOfDigits) {
            result = "0" + result;
        }
        return result;
    }

    calculateNextHeadPosition(currentHead, direction) {
        let nextHeadPosition = Object.assign({}, currentHead);
        switch (direction) {
            case Direction.UP: nextHeadPosition.y--; break;
            case Direction.DOWN: nextHeadPosition.y++; break;
            case Direction.LEFT: nextHeadPosition.x--; break;
            case Direction.RIGHT: nextHeadPosition.x++; break;
        }
        return nextHeadPosition;
    }

    verifyHeadPosition(position, squares) {
        return position.x > 0
            && position.y > 0
            && position.x <= GRID_SIZE
            && position.y <= GRID_SIZE
            && !this.hasPositionInStr(position, this.removeFirstFromStr(squares));
    }

    removeFirstFromStr(str) {
        return str.replace(/\d\dx\d\d/, "");
    }

    createFood(squares, food) {
        return this.randomEmptyPositionStr(squares, food);
    }

    hasPositionInStr(position, str) {
        return str.includes(this.buildPositionStr(position))
    }

    eatFoodAtPosition(position, food) {
        return food.replace(this.buildPositionStr(position), "").trim();
    }

    randomEmptyPositionStr(squares, food) {
        while (true) {
            let randomIndex = Math.ceil(GRID_SIZE * GRID_SIZE * Math.random());
            let randomPosition = this.indexToPosition(randomIndex);
            let positionStr = this.buildPositionStr(randomPosition);
            if (!squares.includes(positionStr) && !food.includes(positionStr)) {
                return positionStr;
            }
        }
    }

    addPositionStr(position, str) {
        return (str + " " + position).trim();
    }

    indexToPosition(index) {
        return {
            y: Math.floor(index / GRID_SIZE) + 1,
            x: (index % GRID_SIZE) + 1
        };
    }

    getSquarePosition(square) {
        let xy = square.split("x");
        return {
            y: parseInt(xy[0]),
            x: parseInt(xy[1])
        }
    }

    getSquareIndex(square) {
        position = this.getSquarePosition(square);
        return (GRID_SIZE * (y-1)) + x;
    }

}

module.exports = {
    Snake: new SnakeApp(),
    Direction,
    GRID_SIZE
};