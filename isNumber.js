// https://leetcode.com/problems/valid-number/#/description

var numbers = '0123456789'.split('');

function inNumbers(c) {
    var i = 0;
    while(numbers[i]) {
        if(c === numbers[i]) return true;
        i += 1;
    }
    return false;
}

function startWith(s, target) {
    return s[0] === target;
}

function endWith(s, target) {
    return s[s.length - 1] === target;
}

function startWithNumber(s) {
    return inNumbers(s[0]);
}

function startWithNumberOrE(s) {
    return startWithNumber(s) || startWith(s, 'e');
}

function startWithNumberOrPoint(s) {
    return startWithNumber(s) || startWith(s, '.');
}

function endWithNumber(s) {
    return inNumbers(s[s.length - 1]);
}

function endWithNumberOrPoint(s) {
    return endWithNumber(s) || endWith(s, '.');
}

function startWithZero(s) {
    return startWith(s, '0');
}

function targetCount(s, target) {
    var i = 0;
    var count = 0;
    while(s[i]) {
        if(s[i] === target) count += 1;
        i += 1;
    }
    return count;
}

function haveOnePoint(s) {
    return targetCount(s, '.') === 1;
}

function haveOnePointOrNone(s) {
    var count = targetCount(s, '.');
    return count === 1 || count === 0;
}

function haveOneEOrNone(s) {
    var count = targetCount(s, 'e');
    return count === 0 || count === 1;
}

function haveE(s) {
    return targetCount(s, 'e') === 1;
}

function OperatorAfterE(s) {
    var i = 1;
    while(s[i]) {
        if((s[i] === '+' || s[i] === '-') && s[i-1] !== 'e') {
            return false;
        }
        i += 1;
    }
    return true;
}

function everyItemInNumbers(s) {
    var i = 0;
    while(s[i]) {
        if(!inNumbers(s[i])) return false;
        i += 1;
    }
    return true;
}

function everyItemInNumbersOrEOrPoint(s) {
    var i = 0;
    while(s[i]) {
        if(!inNumbers(s[i])
            && s[i] !== '+'
            && s[i] !== '-'
            && s[i] !== 'e'
            && s[i] !== '.') return false;
        i += 1;
    }
    return true;
}

function trimSpace(s) {
    var i = 0;
    while(s[i] === ' ') {
        s.splice(i, 1);
    }
    i = s.length - 1;
    while(s[i] === ' ') {
        s.splice(i, 1);
        i = s.length - 1;
    }
    return s;
}

function isNumber(s) {
    // s = trimSpace(s.toString().split(''));
    s = s.toString.trim();
    if(!everyItemInNumbersOrEOrPoint(s)) return false;
    if(startWith(s, '-') || startWith(s, '+')) s.splice(0, 1);
    if(!startWithNumberOrPoint(s)) return false;
    if(!endWithNumberOrPoint(s)) return false;
    if(!haveOnePointOrNone(s)) return false;
    if(!haveOneEOrNone(s)) return false;
    if(s.length === 1 &&　!inNumbers(s[0])) return false;
    if(haveOnePoint(s)) {
        var pS = s.join('').split('.')[0];
        var nS = s.join('').split('.')[1];
        if(pS.length > 0 && !endWithNumber(pS)) return false;
        if(pS.length > 0 && !everyItemInNumbers(pS)) return false;
        if(pS.length === 0 && startWith(nS, 'e')) return false;
        if(nS.length > 0 && !endWithNumberOrPoint(nS)) return false;
    }
    if(!OperatorAfterE(s)) return false;
    return true;
}
