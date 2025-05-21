var currentCombination = 0;
var currentPage = 0;
var itemsPerPage = 8;

$(function() {
    window.addEventListener('message', function(event) {
        var item = event.data;
        if (item.type == "show") {
            $('body').fadeIn(300);
            $('.circleArea').css('transform', 'scale(0.9)').animate({
                opacity: 1,
                scale: '1'
            }, {
                duration: 300,
                easing: 'easeOutCubic'
            });
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
            if (totalPages > 1) {
                $('.next-page').fadeIn(300);
            } else {
                $('.next-page').hide();
            }
            $('.back-page').hide();
        }
        if (item.type == "add") {
            addItem(item);
        }
    });
});

function addItem(item) {
    let div = `
        <div onclick="selectBox('${item.id}')" class="Box circle-${currentCombination} delete page-${Math.ceil(item.number / itemsPerPage)}">
            <i class="fa-solid ${item.data.icon} icon"></i>
            <div class="boxText">${item.data.label}</div>
        </div>
    `;
    
    $('.circleArea').append(div);

    let exitDiv = `
        <div onclick="exit()" class="Box ex delete">
            <i class="fa-solid fa-xmark icon"></i>
            <div class="boxText">EXIT</div>
        </div>
    `;
    
    $('.circleArea').append(exitDiv);

    // Add navigation buttons
    let navButtons = `
        <div class="next-page delete">
            <i class="fa-solid fa-chevron-right icon"></i>
        </div>
        <div class="back-page delete">
            <i class="fa-solid fa-chevron-left icon"></i>
        </div>
    `;
    
    $('body').append(navButtons);

    // Initialize page display
    showPage(currentPage, true);

    // Animate items appearance
    $('.Box').each(function(index) {
        $(this).css({
            'opacity': '0',
            'transform': 'scale(0.5)'
        }).delay(index * 50).animate({
            opacity: 1,
            scale: '1'
        }, {
            duration: 300,
            easing: 'easeOutCubic'
        });
    });
}

function showPage(page, isFirst) {
    $('.circle-1, .circle-2').hide();
    $(`.page-${page}`).show().css('display', 'flex');

    $('.next-page').toggle($('.page-' + (page + 1)).length > 0);
    if (!isFirst) {
        $('.back-page').toggle(page > 1);
    }

    // Animate page transition
    $('.Box:not(.ex)').each(function(index) {
        $(this).css({
            'opacity': '0',
            'transform': 'scale(0.5)'
        }).delay(index * 50).animate({
            opacity: 1,
            scale: '1'
        }, {
            duration: 300,
            easing: 'easeOutCubic'
        });
    });
}

function selectBox(id) {
    $.post('https://qb-radialmenu/select', JSON.stringify({ id: id }));
}

function exit() {
    $('.circleArea').animate({
        opacity: 0,
        scale: '0.9'
    }, {
        duration: 300,
        easing: 'easeInCubic',
        complete: function() {
            $('body').fadeOut(300, function() {
                $.post('https://qb-radialmenu/exit', JSON.stringify({}));
            });
        }
    });
}

// Navigation handlers
$(document).on('click', '.next-page', function() {
    currentPage++;
    showPage(currentPage, false);
});

$(document).on('click', '.back-page', function() {
    currentPage--;
    showPage(currentPage, false);
});

$(document).keyup(function(e) {
    if (e.key === "Escape") {
        exit();
    }
});