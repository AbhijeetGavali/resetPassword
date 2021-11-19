function stringHasTheWhiteSpaceOrNot(value) {
    return value.indexOf(' ') >= 0;
}

const form = document.getElementById('signup');
form.addEventListener('submit', (event) => {
    // stop form submission
    event.preventDefault();

    var newPassword = form.elements['newPassword'].value;
    var confirmNewPassword = form.elements['confirmNewPassword'].value;
    if ((!stringHasTheWhiteSpaceOrNot(newPassword)) && (!stringHasTheWhiteSpaceOrNot(confirmNewPassword))) {
        if (newPassword === confirmNewPassword) {
            if (newPassword != "") {
                form.elements['status'].value = "";
                var url = new URL(window.location.href);
                var email = url.searchParams.get("email");
                var post_url = `https://warranty.ml/api/user/resetpassword/${email}`
                console.log(post_url)
                var xhr = new XMLHttpRequest();
                xhr.open("PATCH", post_url);
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
                xhr.onreadystatechange = function() {
                    if (xhr.readyState === 4) {
                        console.log(xhr.status);
                        console.log(xhr.responseText);
                    }
                };
                var data = `{"new_password":"${newPassword}"}`;
                xhr.send(data);
                xhr.DONE(()=>{
                form.elements['status'].value = "Password updated!";    
                })
            } else {
                form.elements['status'].value = "Password can't be blank.";
            }
        } else {
            form.elements['status'].value = "Please enter same password.";
        }
    } else {
        form.elements['status'].value = "Do not use spaces.";
    }
});