var currentCombination = 0;
var currentPage = 0;
var itemsPerPage = 7; // Number of items per page

// ch4 = left 40vw
// ch2 = left 42.5vw
// ch3 =     top: 14vw; left: 47.4vw;
// ch1 =     top: 15.1vw; left: 52.2vw;


$(function() {
    window.addEventListener('message', function(event) {
        var item = event.data;
        if (item.type == "show") {
            $('body').show();
        }
        if (item.type == "close") {
            exit();
        }
        if (item.type == "clear") {
            $('.delete').remove();
            $('.next-page').hide();
            $('.back-page').hide();
            $('.eyes').remove();
        }
        if (item.type == "setCombination") {
            currentPage = 1; 
                $('.combination-1').hide();
                $('.combination-2').show();
                currentCombination = 2;
            var totalPages = Math.ceil(item.number / itemsPerPage);
            if (totalPages > 1) {
                $('.next-page').show();
            } else {
                $('.next-page').hide();
            }

            $('.back-page').hide(); 


            if (item.menuType == "vehicle") {
                itemsPerPage = 4;
                $('.combination-1  , .combination-2').css('top','50%');
                $('.next-page').css({'top':'46.4vw','left':'54.8vw'});
                $('.back-page').css({'top':'46.4vw','left':'35vw'});
            }else{
                itemsPerPage = 7;
                $('.combination-1  , .combination-2').css('top','4.5vw');
                $('.next-page').css({'top':'26.7vw','left':'49.6vw'});
                $('.back-page').css({'top':'26.7vw','left':'45.3vw'});
            }


        }
        if (item.type == "add") {
            addItem(item,item.menuType);
        }
    });
});

function addItem(item) {
    let exit = {};
    if (item.sub) {
        exit["icon"] = "fa-rotate-left";
        exit["name"] = "BACK";
    } else {
        exit["icon"] = "fa-xmark";
        exit["name"] = "EXIT";
    }

    let div = `<div onclick="selectBox('` + item["id"] + `')"  class="Box circle-` + currentCombination + ` delete page-` + Math.ceil(item.number / itemsPerPage) + `">
    <svg class="iconSVG" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
        <i class="fa-solid ` + item["data"]["icon"] + ` icon"></i>
    </svg>
    <h2 class="boxText">` + item["data"]["label"] + `</h2>
    <svg class="boxBg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 86 98" fill="none">
        <path d="M40 1.73205C41.8564 0.660254 44.1436 0.660254 46 1.73205L82.4352 22.7679C84.2916 23.8397 85.4352 25.8205 85.4352 27.9641V70.0359C85.4352 72.1795 84.2916 74.1603 82.4352 75.2321L46 96.2679C44.1436 97.3397 41.8564 97.3397 40 96.2679L3.56475 75.2321C1.70835 74.1603 0.564754 72.1795 0.564754 70.0359V27.9641C0.564754 25.8205 1.70835 23.8397 3.56475 22.7679L40 1.73205Z"/>
        <path d="M45.75 2.16506L82.1852 23.201C83.8869 24.1834 84.9352 25.9991 84.9352 27.9641V70.0359C84.9352 72.0009 83.8869 73.8166 82.1852 74.799L45.75 95.8349C44.0483 96.8174 41.9517 96.8174 40.25 95.8349L3.81475 74.799C2.11305 73.8166 1.06475 72.0009 1.06475 70.0359V27.9641C1.06475 25.9991 2.11305 24.1834 3.81475 23.201L40.25 2.16506C41.9517 1.18258 44.0483 1.18258 45.75 2.16506Z"/>
    </svg>
    <svg class="hoverBg" width="4.4792vw" height="5.1042vw" viewBox="0 0 86 98" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M40 1.73205C41.8564 0.660254 44.1436 0.660254 46 1.73205L82.4352 22.7679C84.2916 23.8397 85.4352 25.8205 85.4352 27.9641V70.0359C85.4352 72.1795 84.2916 74.1603 82.4352 75.2321L46 96.2679C44.1436 97.3397 41.8564 97.3397 40 96.2679L3.56475 75.2321C1.70835 74.1603 0.564754 72.1795 0.564754 70.0359V27.9641C0.564754 25.8205 1.70835 23.8397 3.56475 22.7679L40 1.73205Z" fill="url(#paint0_radial_2400_27)"/>
        <path d="M45.75 2.16506L82.1852 23.201C83.8869 24.1834 84.9352 25.9991 84.9352 27.9641V70.0359C84.9352 72.0009 83.8869 73.8166 82.1852 74.799L45.75 95.8349C44.0483 96.8174 41.9517 96.8174 40.25 95.8349L3.81475 74.799C2.11305 73.8166 1.06475 72.0009 1.06475 70.0359V27.9641C1.06475 25.9991 2.11305 24.1834 3.81475 23.201L40.25 2.16506C41.9517 1.18258 44.0483 1.18258 45.75 2.16506Z" stroke="#08b8cf" stroke-opacity="0.9"/>
        <defs>
            <radialGradient id="paint0_radial_2400_27" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(43 49) rotate(90) scale(46)">
                <stop stop-color="#08b8cf"/>
                <stop offset="1" stop-color="#02515c"/>
            </radialGradient>
        </defs>
    </svg>
    <svg class="animetBg" width="2.9688vw" height="6.3542vw" viewBox="0 0 57 122" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M57 101.525C57 103.99 55.7032 106.274 53.5859 107.536L32.0856 120.361C29.8765 121.679 27.1228 121.679 24.9137 120.361L3.41402 107.536C1.2968 106.274 0 103.99 0 101.525V60.5V19.9753C0 17.51 1.2968 15.2265 3.41402 13.9635L24.9137 1.13901C27.1228 -0.178692 29.8765 -0.178706 32.0856 1.13897L53.5859 13.9636C55.7032 15.2265 57 17.51 57 19.9753V101.525Z" fill="url(#paint0_radial_2400_38)"/>
        <path d="M31.8295 1.56838L53.3298 14.393C55.2958 15.5657 56.5 17.6861 56.5 19.9753V101.525C56.5 103.814 55.2958 105.934 53.3298 107.107L31.8295 119.932C29.7782 121.155 27.2211 121.155 25.1698 119.932L3.67016 107.107C1.70417 105.934 0.5 103.814 0.5 101.525V60.5V19.9753C0.5 17.6861 1.70417 15.5657 3.67016 14.393L25.1698 1.56841C27.2211 0.344838 29.7782 0.344825 31.8295 1.56838Z" stroke="#08b8cf" stroke-opacity="0.6"/>
        <defs>
            <radialGradient id="paint0_radial_2400_38" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(29 61) rotate(90) scale(115 39.9017)">
                <stop stop-color="#08b8cfe7"/>
                <stop offset="1" stop-color="#08b8cfe7" stop-opacity="0"/>
            </radialGradient>
        </defs>
    </svg>
</div>`;
$('.circleArea').append(div);

    $('.ex,.eyes').remove();

    app = ``;


    div = `
    <div onclick="exit()" class="delete ex">
        <div class="Box exitBox boxAll">
            <i class="fa-solid ` + exit["icon"] + ` icon" style="position: absolute;
            color: white;
            top: 1vw;
            font-size: 1.2vw;
            text-align: center;
            left: -0.35vw;
            z-index: 5;"></i> 
            <h2 class="boxText" style="margin-top: 47%;width: 26%;text-align: center;margin-left:1%">` + exit["name"] + `</h2>
            <svg xmlns="http://www.w3.org/2000/svg" class="boxBG" viewBox="0 0 86 98" fill="none">
              <path d="M40 1.73205C41.8564 0.660254 44.1436 0.660254 46 1.73205L82.4352 22.7679C84.2916 23.8397 85.4352 25.8205 85.4352 27.9641V70.0359C85.4352 72.1795 84.2916 74.1603 82.4352 75.2321L46 96.2679C44.1436 97.3397 41.8564 97.3397 40 96.2679L3.56475 75.2321C1.70835 74.1603 0.564754 72.1795 0.564754 70.0359V27.9641C0.564754 25.8205 1.70835 23.8397 3.56475 22.7679L40 1.73205Z" fill="url(#paint0_radial_2404_59)"/>
             <defs>
    <radialGradient id="paint0_radial_2404_59" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(43 49) rotate(90) scale(61.5)">
        <stop stop-color="#910707"/>
        <stop offset="1" stop-color="#720404"/> 
    </radialGradient>
</defs>
            </svg>
          </div>
    </div>`;
    $('.circleArea').append(div);

    eyes = `

    <svg class="eyes" width="122" height="122" viewBox="0 0 122 122" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M58.5 1.44338C60.047 0.550213 61.953 0.550212 63.5 1.44338L111.328 29.0566C112.875 29.9498 113.828 31.6004 113.828 33.3867V88.6133C113.828 90.3996 112.875 92.0502 111.328 92.9434L63.5 120.557C61.953 121.45 60.047 121.45 58.5 120.557L10.6724 92.9434C9.12544 92.0502 8.17245 90.3996 8.17245 88.6133V33.3867C8.17245 31.6004 9.12545 29.9498 10.6725 29.0566L58.5 1.44338Z" fill="url(#paint0_linear_3_2)" fill-opacity="0.29"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M89.5809 53.2673C89.0221 52.5843 76.4801 37 60.5233 37C44.5664 37 32.0245 52.5843 31.4657 53.2673C30.8448 54.0124 30.8448 55.0679 31.4657 55.875C32.0245 56.558 44.5664 72.1423 60.5233 72.1423C76.4801 72.1423 89.0221 56.4959 89.5809 55.875C90.1397 55.13 90.1397 54.0124 89.5809 53.2673ZM60.5233 66.2439C54.066 66.2439 48.8506 61.0284 48.8506 54.5712C48.8506 48.1139 54.066 42.8984 60.5233 42.8984C66.9805 42.8984 72.196 48.1139 72.196 54.5712C72.196 61.0284 66.9805 66.2439 60.5233 66.2439Z" fill="url(#paint1_radial_3_2)"/>
    <path d="M60.5233 61.6493C64.4324 61.6493 67.6014 58.4803 67.6014 54.5712C67.6014 50.662 64.4324 47.493 60.5233 47.493C56.6141 47.493 53.4451 50.662 53.4451 54.5712C53.4451 58.4803 56.6141 61.6493 60.5233 61.6493Z" fill="url(#paint2_radial_3_2)"/>
    <defs>
    <linearGradient id="paint0_linear_3_2" x1="61" y1="0" x2="61" y2="122" gradientUnits="userSpaceOnUse">
    <stop stop-color="#08b8cf"/>
    <stop offset="1" stop-opacity="0"/>
    </linearGradient>
    <radialGradient id="paint1_radial_3_2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(60.5 54.5712) rotate(90) scale(17.5712 29.5)">
    <stop stop-color="#08b8cf" stop-opacity="0.48"/>
    <stop offset="1" stop-color="#08b8cf" stop-opacity="0.43"/>
    </radialGradient>
    <radialGradient id="paint2_radial_3_2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(60.5 54.5712) rotate(90) scale(17.5712 29.5)">
    <stop stop-color="#08b8cf" stop-opacity="0.48"/>
    <stop offset="1" stop-color="#08b8cf" stop-opacity="0.43"/>
    </radialGradient>
    </defs>
    </svg>
    
    `;
    $('.circleArea').append(eyes);


    if (item.menuType == "vehicle") {
        $('.ex').css({'top':'19vw','display':'none'});
        $('.eyes').show()
        $('.circle-2:nth-child(1)').css({'top':'15.1vw','left':'52.2vw'});
        $('.circle-2:nth-child(2)').css({'left':'42.5vw'});
        $('.circle-2:nth-child(3)').css({'top':'14vw','left':'47.4vw'});
        $('.circle-2:nth-child(4)').css({'left':'40vw'});
        $('.circle-2:nth-child(8)').css({'top':'15.1vw','left':'52.2vw'});
        $('.circle-2:nth-child(7)').css({'left':'42.5vw'});
        $('.circle-2:nth-child(6)').css({'top':'14vw','left':'47.4vw'});
        $('.circle-2:nth-child(5)').css({'left':'40vw'});
        $('.circle-2:nth-child(12)').css({'top':'15.1vw','left':'52.2vw'});
        $('.circle-2:nth-child(11)').css({'left':'42.5vw'});
        $('.circle-2:nth-child(10)').css({'top':'14vw','left':'47.4vw'});
        $('.circle-2:nth-child(9)').css({'left':'40vw'});

    }else{
        $('.ex').css({'top':'26.5vw','display':'block'});
        $('.eyes').hide()
    }

    showPage(currentPage,true);
}

$(document).on('click', '.eyes', function(e) {
    exit();
});

$(document).on('click', '.next-page', function(e) {
    currentPage++;
    showPage(currentPage,false);
});

$(document).on('click', '.back-page', function(e) {
    currentPage--;
    showPage(currentPage,false);
});

function showPage(page, bool) {
    $('.circle-1, .circle-2').hide();
    $('.page-' + page).show();

    if ($('.page-' + (page + 1)).length > 0) {
        $('.next-page').show();
    } else {
        $('.next-page').hide();
    }

    if (!bool) {
        if (page > 1) {
            $('.back-page').show();
        } else {
            $('.back-page').hide();
        }
    }
}
function selectBox(id) {
    $.post('https://qb-radialmenu/select', JSON.stringify({
        id: id
    }));
}

function exit() {
    $.post('https://qb-radialmenu/exit', JSON.stringify({}));
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        $("body").fadeOut(500);
        $.post(`http://qb-radialmenu/closeall`, JSON.stringify({ }), function (x) {});
    }
});