document.addEventListener('DOMContentLoaded', function () {
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
});
