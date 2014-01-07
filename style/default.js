$(function() {
    // Background image

    $.backstretch([window.bgname]);

    // Bottom image

    // <img id="img_bottom" class="img_bottom" alt="" />
    var ib = $("<img />")
        .attr("id", "img_bottom")
        .attr("class", "img_bottom")
        .attr("alt", "")
        .appendTo("body");

    var iblast = 0; // 1->top 2->bottom

    ib.attr("src", window.ibname);

    jQuery.fn.extend({cutfx: function() {
        if (this.queue("fx").length > 1) {
            this.queue("fx", new Array(this.queue("fx")[0]));
        }
        return this;
    }});

    var gotop = function() {
        if (iblast !== 1) {
            ib
                .cutfx()
                .animate({bottom: 0});
            iblast = 1;
        }
    }

    var gorun = function() {
        if (iblast !== 2 || ib.queue("fx").length === 0) {
            ib
                .cutfx()
                .animate({bottom: - ib.height() / 2})
                .animate({bottom: - ib.height() / 3});
            iblast = 2;
        }
    }

    var gobottom = function() {
        if (
            $(window).scrollTop() + $(window).height() > $(document).height() - 32
        ) {
            gotop();
        } else {
            gorun();
        }
    }

    ib.mouseenter(gotop).mouseleave(gobottom);
    $(window).scroll(gobottom);
    ib.load(function() {
        ib.mouseenter().mouseleave();
    });
});
