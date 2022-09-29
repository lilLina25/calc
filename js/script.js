"use strict";
let elems = document.querySelectorAll('.number input');
let win = document.querySelector('.window input');
let del = document.querySelector('#del');
let backspace = document.querySelector('#backspace');
let mul = document.querySelector('#mul');
let div = document.querySelector('#div');
let add = document.querySelector('#add');
let sub = document.querySelector('#sub');
let dot = document.querySelector('#dot');
let sign = document.querySelector('#sign');
let equals = document.querySelector('#equals');
let percent = document.querySelector('#percent');
let separators = ['÷', '×', '-', '+', '%', '.'];

for (let elem of elems) {
    elem.addEventListener('click', function() {
        if (!isNaN(elem.value)) {
            win.value = win.value + elem.value;
        }
    })
}
sign.addEventListener('click', function() {
    let num = Number(win.value);
    if (num < 0) {
        win.value = Math.abs(num);
    }
    if (num > 0) {
        win.value = '-' + Math.abs(num);
    }
});
del.addEventListener('click', function() {
    win.value = '';
});
backspace.addEventListener('click', function() {
    win.value = win.value.slice(0, -1);
});

function check(str) {
    let check = separators.some(function(elem) {
        if (elem === str[str.length - 1]) {
            return true;
        } else {
            return false;
        }
    });
    return check;
};

mul.addEventListener('click', mult);

function mult() {
    if (check(win.value[win.value.length - 1]) === true) {
        mul.removeEventListener('click', mult);
    } else {
        win.value = win.value + '×';
    }
    mul.addEventListener('click', mult);
};
div.addEventListener('click', division);

function division() {
    if (check(win.value[win.value.length - 1]) === true) {
        div.removeEventListener('click', division);
    } else {
        win.value = win.value + '÷';
    }
    div.addEventListener('click', division);
};

add.addEventListener('click', plus);

function plus() {
    if (check(win.value[win.value.length - 1]) === true) {
        add.removeEventListener('click', plus);
    } else {
        win.value = win.value + '+';
    }
    add.addEventListener('click', plus);
};

sub.addEventListener('click', subtraction);

function subtraction() {
    if (check(win.value[win.value.length - 1]) === true) {
        sub.removeEventListener('click', subtraction);
    } else {
        win.value = win.value + '-';
    }
    sub.addEventListener('click', subtraction);
};

dot.addEventListener('click', point);

function point() {
    if (check(win.value[win.value.length - 1]) === true) {
        dot.removeEventListener('click', point);
    } else {
        win.value = win.value + '.';
    }
    dot.addEventListener('click', point);
};

percent.addEventListener('click', perc);

function perc() {
    if (check(win.value[win.value.length - 1]) === true) {
        percent.removeEventListener('click', perc);
    } else {
        win.value = win.value + '%';
    }
    percent.addEventListener('click', perc);
};


equals.addEventListener('click', function() {
    if(!isNaN(calc(win.value))){
        win.value = calc(win.value);
    }else{
       win.value = 'Ошибка!';
    }
});

function calc(str) {
    let arr = str.match(/(?<!\d)-?\d*[.,]?\d+/g, '!');
    let res = str.match(/\×|\÷|\-|\+|\%/g, '!');
    if (arr[0] < 0) {
        res.splice(0, 1);
    }
    for (let j = 0; j < res.length;) {
        if (res[j] === '%') {
            arr[j] = arr[j] / 100;
            res.splice(j, 1);
        }
        if (res[j] === '×' || res[j] === '÷') {
            if (res[j] === '×') {
                arr[j] = arr[j] * arr[j + 1];
                arr.splice(j + 1, 1);
                res.splice(j, 1);
            } else if (res[j] === '÷') {
                if (Number(arr[j + 1]) === 0) {
                    return 'Ошибка!';
                }
                arr[j] = arr[j] / arr[j + 1];
                arr.splice(j + 1, 1);
                res.splice(j, 1);
            }
        } else {
            j++;
        }
    };
    for (let i = 0; i < res.length;) {
        console.log(arr[i], res[i]);
        if (res[i] === '+') {
            arr[i] = Number(arr[i]) + Number(arr[i + 1]);
            arr.splice(i + 1, 1);
            res.splice(i, 1);
        } else if (res[i] === '-') {
            arr[i] = Number(arr[i]) - Number(arr[i + 1]);
            arr.splice(i + 1, 1);
            res.splice(i, 1);
        } else {
            i++;
        }
    }
    return arr[0];
};