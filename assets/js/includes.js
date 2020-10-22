// Loading HTML
$(function () {
    $("#nav").load("/assets/html/nav.html");
});
$(function () {
    $("#footer").load("/assets/html/footer.html");
});
// Age
function getAge(dateString) {
    let today = new Date();
    let birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age.toString();
}
