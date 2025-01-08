document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.querySelector('.sidebar');
    const openSidebar = document.querySelector('.logo');

    openSidebar.addEventListener('click', function() {
        sidebar.classList.toggle('active');
    });
});

document.getElementById('img').addEventListener('change', function() {
    var fileName = this.files[0] ? this.files[0].name : "No file selected";
    document.querySelector('.file-name').textContent = fileName;
});
