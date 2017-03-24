function maxPoints(inputPoints) {
    var points = [];
    var K = [];
    var B = [];
    var kPointsMap = [];
    var p;

    function addPoint(x ,y) {
        points.push([x, y]);
        return points.length - 1;
    }

    function gcd(m ,n){
        if(n) return gcd(n ,m%n);
        return m;
    }

    function getK(ia, ib) {
        var p1 = points[ia];
        var p2 = points[ib];
        if(p1[0] === p2[0]) return Infinity;
        var dx = (p1[1] - p2[1]);
        var dy = (p1[0] - p2[0]);

        return dy/dx;
    }

    function addPointToKMap(k, point) {
        if(kPointsMap[k] === undefined) kPointsMap[k] = [];
        if(kPointsMap[k].indexOf(point) === -1) {
            kPointsMap[k].push(point);
        }
    }

    function getB(k, p1) {
        return !isFinite(k) ? NaN : (k*points[p1][0] - points[p1][1]);
    }

    function addLine(p1idx, p2idx) {
        var k;
        var b;
        k = getK(p1idx, p2idx);
        b = getB(k, p1idx);
        for(var i = 0; i < K.length; i += 1) {
            // console.log(K[i], kPointsMap[i], B[i]);
            if(!isFinite(k) && !isFinite(K[i])
            && points[pidx][0] === points[kPointsMap[i][0]][0]) {
                addPointToKMap(i, p1idx);
                addPointToKMap(i, p2idx);
                return;
            } else if(compareK(K[i], k) && compareB(B[i], b)) {
                addPointToKMap(i, p1idx);
                addPointToKMap(i ,p2idx);
                return;
            };
        }
        K.push(k);
        B.push(b);
        addPointToKMap(K.length - 1, p1idx);
        addPointToKMap(K.length - 1, p2idx);
    }

    function compareK(k1, k2) {
        return ((k1[1]/k1[0]) === (k2[1]/k2[0]))
    }

    function compareB(b1, b2) {
        var tb1 = b1[2] - (b1[1]*b1[0]);
        var tb2 = b2[2] - (b2[1]*b2[0]);
        return Math.abs(tb1 - tb2 < 0.000001);
    }

    function initial() {
        var a = inputPoints.pop();
        var b = inputPoints.pop();
        var ia = addPoint(a.x, a.y);
        var ib = addPoint(b.x, b.y);
        addLine(ia, ib);
    }

    if(inputPoints.length < 2) {
        return inputPoints.length;
    }

    initial();
    p = inputPoints.pop();
    while(p !== undefined) {
        var pidx = addPoint(p.x, p.y);
        for(var i = 0; i < K.length; i += 1) {
            var tmpK = K[i];
            var tmpB = B[i];

            for(var j = 0; j < kPointsMap[i].length; j += 1) {
                addLine(pidx, kPointsMap[i][j]);
            }
            if(!isFinite(tmpK) && points[pidx][0] === points[kPointsMap[i][0]][0]) {
                addPointToKMap(i, pidx);
                continue;
            }
            if (compareB(tmpB, getB(tmpK, pidx))) {
                addPointToKMap(i, pidx);
                continue;
            }
        }
        p = inputPoints.pop();
    }

    console.log(kPointsMap);

    var max = 0;
    for(var m = 0; m < kPointsMap.length; m += 1) {
        if(kPointsMap[m].length > max) max = kPointsMap[m].length;
    }

    return max;
}

console.log(
    maxPoints(
        [
            // { x: 1, y: 1 },
            // { x: 1, y: 1 },
            // { x: 2, y: 2 },
            // { x: 3, y: 3 },
            // { x: 3, y: 3 },
            // { x: 3, y: 3 },
            { x: 3, y: 3 },
            { x: 5, y: 5 },
            { x: 5, y: 6 },
            // {x: 3, y: 1},
            // {x: 12, y: 3},
            // {x: 3, y: 1},
            // {x: -6, y: -1},
        ]
    )
)