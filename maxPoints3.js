// shit javascript number...

function maxPoints(points) {
    var max = 0;
    for(i = 0; i < points.length ; i += 1) {
        var map = {};
        var same = 1;
        for(j = i + 1; j < points.length; j += 1) {
            if(samePosition(points[i], points[j])) {
                same += 1;
            } else if(sameAbscissa(points[i], points[j])) {
                if(!map['Infinity']) {
                    map['Infinity'] = 1;
                } else {
                    map['Infinity'] += 1;               
                }
            } else {
                var divide = points[i].x-points[j].x 
                var dividend = points[i].y-points[j].y;
                var b = bca(dividend, divide);
                var slope = (dividend/b).toString() + '/' + (divide/b).toString();
                if(!map[slope]) {
                    map[slope] = 1;
                } else {
                    map[slope] += 1;
                }
            }
        }

        if(same > max) max = same;
        for(var s in map) {
            max = Math.max(max, map[s] + same);
        }
    }

    return max;
}

function bca(a, b) {
    var r;
    if(b === 0) return 1;
    r = a % b;
    return r === 0 ? b : bca(b ,r);
}

function sameAbscissa(p1, p2) {
    return p1.x === p2.x;
}

function samePosition(p1, p2) {
    return p1.x === p2.x && p1.y === p2.y;
}

console.log(
    maxPoints([
        {x: 2, y: 3},
        {x: 3, y: 3},
        {x: -5, y: 3}
    ])
)