
for(var i = 1; i <= 3; i++) {
    setTimeout(function () {
        console.log(i);
    }, 0);
}



var a = 100;
function test(){
    alert(a);
    a = 10;
    alert(a);
}
test();
alert(a);




var uname = 'jack';
function change() {
    alert(uname);
    var uname = 'lily';
    alert(uname);
}
change();


var num = 3 + 2 + '7';
console.log(num);
