(function ($, pagination) {
    var timeout = prompt("Время поиска на странице в мс\nЕсли интернет медленный - увеличьте значение", 500);
    if (!timeout) {
        return;
    }

    var value = prompt("Введите ОГРН или название", "");

    function searchOrganization() {
        var found = false;
        $(".datalist-item.item-org").each(function () {
            var $el = $(this);
            if ($el.text().toLowerCase().indexOf(value.toLocaleLowerCase()) !== -1) {
                $el.closest(".datalist-item").css('background-color', 'yellow');
                found = true;
                $("html, body").animate({
                    scrollTop: ($el.offset().top)
                },500);
                return false;
            }
        });
        if (!found) {
            if ($(".pager-block #lastPage").hasClass("disabled")) {
                alert("Организации " + value + " не найдено!");
                return;
            }
            pagination.showNext();
            setTimeout(searchOrganization, parseInt(timeout));
        }
    }

    if (value) {
        pagination.showFirst();
        setTimeout(function () {
            searchOrganization($(".datalist-item .item-org"));
        }, parseInt(timeout));
    }
})(window.$, window.orgPage);
