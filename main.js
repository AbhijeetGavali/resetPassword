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
                var data = `{"new_password":"${newPassword}"}`;
                fetch(post_url, {
                    method: "PATCH",
                    headers: {'Content-Type': 'application/json'}, 
                    body: JSON.stringify(data)
                  }).then(res => {
                    console.log("Request complete! response:", res);
                  }).catch(err=>{
                      console.log('Error in sending password',err);
                  })
                /* var xhr = new XMLHttpRequest();
                xhr.open("PATCH", post_url);
                xhr.setRequestHeader("Accept", "application/json");
                xhr.setRequestHeader("Content-Type", "application/json");
                xhr.onreadystatechange = function() {
                    if (xhr.readyState === 4) {
                        console.log(xhr.status);
                        console.log(xhr.responseText);
                    }
                };
               
                console.log(data)
                xhr.send(data); */
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