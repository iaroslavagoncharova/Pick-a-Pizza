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
                });

                content.style.display = 'block';
                content.style.maxHeight = 'none';
                arrow.style.transform = 'rotate(180deg)';
            }
        });
    });

    const doughButtons = document.querySelectorAll('.dough button');
    const sizeButtons = document.querySelectorAll('.size button');

    // Add event listeners to dough buttons
    doughButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.style.border = 'solid 3px green';
            this.style.fontWeight = 'bold';
            this.style.boxShadow = '1px 1px 1px #68563d';
        });
    });

    // Add event listeners to size buttons
    sizeButtons.forEach(button => {
        button.addEventListener('click', function () {
            this.style.fontWeight = '750';
            this.style.boxShadow = '1px 1px 1px #68563d';
            this.style.border = 'solid 3px #ffe200'
        });
    });


