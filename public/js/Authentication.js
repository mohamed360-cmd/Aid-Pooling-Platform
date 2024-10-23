const sendAuthDetails = async (data, endpoint) => {
    try {
        const res = await fetch(`http://localhost:8080/${endpoint}`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        })
        //weka response hapa 

    } catch (error) {
        console.log("Error in the sendAuthDetails function", error)
    }
}
const registerUser = () => {
    const registerPassword = document.getElementById('registerPassword');
    const registerPasswordAgain = document.getElementById('registerPasswordAgain');
    const registrationFormError = document.getElementById('registrationFormError');
    
    // Get selected account type value
    const accountType = document.querySelector('input[name="Account_Type"]:checked');
    
    if (registerPassword.value === registerPasswordAgain.value) {
        if (accountType) {
            // Send the form with method and action
            const registrationForm = document.getElementById('registrationForm');
            registrationForm.setAttribute("method", "POST");
            registrationForm.setAttribute("action", "/register");
                        registrationForm.submit();
        } else {
            registrationFormError.textContent = "Please select an account type.";
        }
    } else {
        registrationFormError.textContent = "Passwords do not match!";
    }
};

document.addEventListener("DOMContentLoaded", () => {
    const ErrorMessageAccountTypeSelection = document.getElementById("ErrorMessageAccountTypeSelection")
    const loginBtnMain = document.getElementById("loginBtnMain")
    const registerBtn = document.getElementById('registerBtn')
    gotoRegisterPageBtn.addEventListener('click', () => {
        window.location.href = "/register"
    })
    loginBtnMain.addEventListener('click', () => {
        const loginForm = document.getElementById('loginForm')
        const loginEmail = document.getElementById('loginEmail').value
        const loginPassword = document.getElementById('loginPassword').value

        if (loginEmail.length > 1 && loginPassword.length > 1) {
            loginForm.setAttribute("method", "POST")
            loginForm.setAttribute("action", "/login")
            loginForm.submit()
        } else {
            const LoginFormErrorMsg = document.getElementById('LoginFormErrorMsg')
            LoginFormErrorMsg.textContent = "Error In the Value Lenght "
        }
    })
        //user registration


    
})
