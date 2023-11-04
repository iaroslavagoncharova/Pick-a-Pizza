    const doughButtons = document.querySelectorAll('.dough-image button');
    const sizeButtons = document.querySelectorAll('.size button');

    doughButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.style.border = 'solid 3px green';
            this.style.fontWeight = 'bold';
            this.style.boxShadow = '1px 1px 1px #68563d';
        });
    });

    sizeButtons.forEach(button => {
        button.addEventListener('click', function () {
            this.style.fontWeight = '750';
            this.style.boxShadow = '1px 1px 1px #68563d';
            this.style.border = 'solid 3px #ffe200'
        });
    });


const categoryTitles = document.querySelectorAll('.category-title');

categoryTitles.forEach(function (title) {
    title.addEventListener('click', function () {
        const content = title.nextElementSibling;
        const arrow = title.querySelector('.arrow');

        if (content.style.display === 'block' || content.style.display === '') {
            content.style.display = 'none';
            content.style.maxHeight = '0';
            arrow.style.transform = 'rotate(0deg)';
        } else {
            const openCategories = document.querySelectorAll('.category-content');
            openCategories.forEach(function (openCategory) {
                openCategory.style.display = 'none';
                openCategory.style.maxHeight = '0';

                const arrowToReset = openCategory.previousElementSibling.querySelector('.arrow');
                arrowToReset.style.transform = 'rotate(0deg)';
            });

            content.style.display = 'block';
            content.style.maxHeight = content.scrollHeight + 'px'; 
            arrow.style.transform = 'rotate(180deg)';
        }
    });
});

    