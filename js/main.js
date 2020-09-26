$(document).ready(function () {

    $('.image-popup-vertical-fit').magnificPopup({
        type: 'image',
        closeOnContentClick: true,
        mainClass: 'mfp-img-mobile',
        image: {
            verticalFit: true
        }

    });
    $(function () {
        $('.popup-modal').magnificPopup({
            type: 'inline',
            preloader: false,
            focus: '#username',
            modal: true
        });
        $(document).on('click', '.popup-modal-dismiss', function (e) {
            e.preventDefault();
            $.magnificPopup.close();
        });
    });

    let loader = $('#loader');

    $('#submit').click(function () {
        let name = $('#name');
        let address = $('#address');
        let number = $('#number');
        let valid = false;
        $('.text-error').hide();

        if (!name.val()) {
            name.siblings('.text-error').show();
            name.css('border-color', 'red');
            valid = true;
        } else {
            name.css('border-color', 'green');
        }

        if (!address.val()) {
            address.siblings('.text-error').show();
            address.css('border-color', 'red');
            valid = true;
        } else {
            address.css('border-color', 'green');
        }

        if (!number.val()) {
            number.siblings('.text-error').show();
            number.css('border-color', 'red');
            valid = true;
        } else {
            number.css('border-color', 'green');
        }

        if (!valid) {
            loader.css('display', 'flex');
            $.ajax({
                method: "POST",
                url: "https://itlogia.ru/test/checkout",
                data: {name: name.val(), address: address.val(), number: number.val()}
            })
                .done(function (message) {
                    loader.hide();
                    if (message.success) {
                        $('#popup').show();
                    } else {
                        alert('Возникла ошибка при оформлении заказа, позвоните нам и сделайте заказ.');
                    }
                });
        }
    })

})