function Coordinate(points) {
    return this.init(points);
}

Coordinate.prototype = {
    init: function(points) {
        this.points = points;
        this.coordinate = [];
        this.negativePoint = [];
        this.lines = [];
        this.pointPosition = [];
        this.pointLines = [];
        this.minimumY = 0;
        this.minimumX = 0;
        this.setLineSize(1);

        for(var i = 0; i < points.length; i += 1) {
            this.addPoint(points[i].x, points[i].y);
            if(points[i].x < 0 || points[i].y < 0) continue;
        }
        if(this.negativePoint.length > 0) {
            this.move(-this.minimumX, -this.minimumY);
            for(var i = 0; i < this.negativePoint.length; i += 1) {
                this.addPoint(this.negativePoint[i].x - this.minimumX, 
                    this.negativePoint[i].y - this.minimumY);
            }
        }
        this.checkPoint();

        return this;
    },
    
    addPoint: function(x, y) {
        if(x === undefined || y === undefined) return;
        if(y < 0 || x < 0) {
            this.negativePoint.push({x: x, y: y});
            if(y < this.minimumY) this.minimumY = y;
            if(x < this.minimumX) this.minimumX = x;
            return;
        } 
        if(y >= this.coordinate.length) {
            this.setLineSize(10 + y);
        }
        if(x >= this.coordinate[y].length) {
            this.setLineSize(10 + x);
        }
        if(isNaN(this.coordinate[y][x])) {
            this.coordinate[y][x] = 1;
        } else {
            this.coordinate[y][x] += 1;
        }
    },

    checkPoint: function() {
        for(var i = 0;; i += 1) {
            for(var j = 0;; j += 1) {
                if(!isNaN(this.lines[j][i]) ) {
                    this.pointPosition.push([i, j]);
                }
            }
        }
    },

    checkLine: function() {
        var i, j, k;
        var point;
        var tmpPoint;
        for(i = 0; i < this.pointPosition.length; i += 1) {
            point = this.pointPosition[i];
            for(j = i; j < this.pointPosition.length; j += 1) {
                tmpPoint = this.pointPosition[j];
                k = (point[1] - tmpPoint[1])/(point[0] - tmpPoint[0]);

                if(!this.pointLines[i]) this.pointLines[i] = [];
                
            }
        }
    },
    
    getMaxLinePoints: function() {
        var max = 0;
        var x, y, tmp;
        
        for(y = 0; y < this.coordinate.length; y += 1) {
            tmp = 0;
            for(x = 0; x < this.coordinate[y].length; x += 1) {
                if(isNaN(this.coordinate[y][x])) continue;
                tmp += this.coordinate[y][x];
            }
            if(tmp > max) max = tmp;
        }

        for(x = 0; x < this.coordinate.length; x += 1) {
            tmp = 0;
            for(y = 0; y < this.coordinate.length; y += 1) {
                if(isNaN(this.coordinate[y][x])) continue;
                tmp += this.coordinate[y][x];
            }
            if(tmp > max) max = tmp;
        }

        y = 0;
        x = 0;
        while(y < this.coordinate.length) {
            var tmp = 0;
            var ty = y;
            while(ty < this.coordinate.length && x < this.coordinate[ty].length) {
                if(!isNaN(this.coordinate[ty][x])){
                    tmp += this.coordinate[ty][x];
                };
                ty += 1;
                x += 1;
            }
            if(tmp > max) max = tmp;
            x = 0;
            y += 1;
        }


        y = this.coordinate.length - 1;
        x = 0;
        while(x < this.coordinate[y].length) {
            var tmp = 0, tx = x;
            while(y >= 0 && tx >= 0) {
                if(!isNaN(this.coordinate[y][tx])){
                    tmp += this.coordinate[y][x];
                };
                y -= 1;
                tx -= 1;
            }
            if(tmp > max) max = tmp;
            x += 1;
            y = this.coordinate.length - 1;
        }

        return max;
    },
    
    setLineSize: function(size) {
        var i = 0;
        if(this.coordinate.length < size) {
            while(this.coordinate.length < size) {
                this.coordinate.push([]);
            }
        }
        while(i < this.coordinate.length) {
            var w = this.coordinate[i].length;
            while(w < size) {
                this.coordinate[i].push(NaN);
                w += 1;
            }
            i += 1;
        }
    },
    
    movePointTo: function(x, y, right, up) {
        if(((y + up) < this.coordinate.length) && ((x + right) < this.coordinate[y].length)) {
            if(isNaN(this.coordinate[y + up][x + right])) {
                this.addPoint(x + right, y + up);
            } else {
                this.movePointTo(x + right, y + up, right, up);
            }
        } else {
            this.addPoint(x + right, y + up);
        }
        this.deletePoint(x, y);
    },
    
    move: function(right, up) {
        var y = this.coordinate.length - 1;
        var x = this.coordinate[y].length - 1;
        for(; x >= 0; x -= 1) {
            for(; y >= 0; y -= 1) {
                if(!isNaN(this.coordinate[y][x])) {
                    this.movePointTo(x, y, right, up);
                }
            }
            y = this.coordinate.length - 1;
        }
    },
    
    deletePoint: function(x,y) {
        this.coordinate[y][x] = NaN;
    }
};


function maxPoints(points) {
    var coordinate = new Coordinate(points);
    return coordinate.getMaxLinePoints();
}

console.log(
    maxPoints([ 
        {x: 0, y: 0},
        {x: 2, y: 2},
        // {x: 1, y: -1},
        {x: -1, y: -1}
    ])
)