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

let imgOBJ = document.getElementById('img')
let motOBJ = document.getElementById('mot')
let catOBJ = document.getElementById('cat')

async function addReceipt() {
    let total = 0
    await OCR(imaOBJ).then(txt => extractTotal(txt)).then(ttl => total = ttl)

    let month = motOBJ.value
    let category = catOBJ.value

    console.log({total, month, category})
}