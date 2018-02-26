var socket = io();

socket.on('connect', function () {
    console.log('new employee join');

    var param = jQuery.deparam(window.location.search);
    console.log(param);
    socket.emit('newEmpjoin', param, function(error) {
        if (error) {
            alert(error);
            window.location.href = '/';
        } else {
            console.log('no error');
        }
    });
});
socket.on('disconnect', function () {
    console.log('disconnect employee');
});

