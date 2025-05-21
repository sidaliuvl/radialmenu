var currentCombination = 0;
var currentPage = 0;
var itemsPerPage = 8;

$(function() {
    window.addEventListener('message', function(event) {
        var item = event.data;
        if (item.type == "show") {
            $('body').fadeIn(300);
        }
        if (item.type == "close") {
            exit();
        }
        if (item.type == "clear") {
            $('.delete').remove();
            $('.next-page').hide();
            $('.back-page').hide();
        }
        if (item.type == "setCombination") {
            currentPage = 1;
            $('.combination-1').hide();
            $('.combination-2').show();
            currentCombination = 2;

            var totalPages = Math.ceil(item.number / itemsPerPage);
            $('.next-page').toggle(totalPages > 1);
            $('.back-page').hide();
        }
        if (item.type == "add") {
            addItem(item);
        }
    });
});

function addItem(item) {
    let div = `<div onclick="selectBox('${item.id}')" class="Box circle-${currentCombination} delete page-${Math.ceil(item.number / itemsPerPage)}">
        <div class="boxBg"></div>
        <i class="fa-solid ${item.data.icon} icon"></i>
        <div class="boxText">${item.data.label}</div>
    </div>`;
    
    $('.circleArea').append(div);

    let exitDiv = `<div onclick="exit()" class="Box ex delete">
        <div class="boxBg exitBox"></div>
        <i class="fa-solid fa-xmark icon"></i>
        <div class="boxText">EXIT</div>
    </div>`;
    
    $('.circleArea').append(exitDiv);

    showPage(currentPage, true);
}

function showPage(page, isFirst) {
    $('.circle-1, .circle-2').hide();
    $('.page-' + page).show();

    $('.next-page').toggle($('.page-' + (page + 1)).length > 0);
    if (!isFirst) {
        $('.back-page').toggle(page > 1);
    }
}

function selectBox(id) {
    $.post('https://qb-radialmenu/select', JSON.stringify({ id: id }));
}

function exit() {
    $('body').fadeOut(300, function() {
        $.post('https://qb-radialmenu/exit', JSON.stringify({}));
    });
}

$(document).keyup(function(e) {
    if (e.key === "Escape") {
        exit();
    }
});