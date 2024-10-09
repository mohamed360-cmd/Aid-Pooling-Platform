const sendAuthDetails = async(data,endpoint)=>{
    try {
        const res = await fetch(`http://localhost:8080/${endpoint}`,{
            method : "POST",
            headers : {
                "content-type" : "application/json"
            },
            body : JSON.stringify(data)
        })
        //weka response hapa 
    } catch (error) {
        console.log("Error in the sendAuthDetails function",error)
    }
}
document.addEventListener("DOMContentLoaded",()=>{
    const tosecondRegistrationFormBtn = document.getElementById("tosecondRegistrationFormBtn")
    const AccountTpe_RECIPIENT=  document.getElementById("AccountTpe_RECIPIENT")
    const AccountTpe_DONER = document.getElementById("AccountTpe_DONER")
    const ErrorMessageAccountTypeSelection = document.getElementById("ErrorMessageAccountTypeSelection")
    tosecondRegistrationFormBtn.addEventListener("click",()=>{
        if(!AccountTpe_RECIPIENT.checked && !AccountTpe_DONER.checked){//this checks if user has not selected an Account type
            //show some error message 
            ErrorMessageAccountTypeSelection.textContent = "Please Select An Account Type "
        }else{
            const secondRegistrationForm = document.getElementById('secondRegistrationForm')
            const firstRegistrationForm = document.getElementById("firstRegistrationForm")
            firstRegistrationForm.style.display = "none"
            secondRegistrationForm.style.display = "block"
        }
    })
    const registerBtn = document.getElementById('registerBtn')
    registerBtn.addEventListener('click',()=>{
        const ErrorMessageFormError  = document.getElementById('ErrorMessageFormError')
        const registerEmail = document.getElementById('registerEmail').value
        const registrationName = document.getElementById('registrationName').value
        const registrationPhoneNumber = document.getElementById('registrationPhoneNumber').value
        const registrationPassword = document.getElementById('registrationPassword').value
        const passwordAgain = document.getElementById('passwordAgain').value
        console.log(registerEmail.length)
        if(registrationName.length > 1 && registerEmail.length > 1
             && registrationPhoneNumber.length > 1  
            && registrationPassword.length > 1 
            ){
                if(registrationPassword === passwordAgain){
                    //send the deatials to the server
                    const registrationDetails = {
                        Organization_Email  : registerEmail,
                        Organization_Name : registrationName,
                        Organization_PhoneNumber : registrationPhoneNumber,
                        Organization_Password : registrationPassword,
                        Account_Type : AccountTpe_DONER.checked ? AccountTpe_DONER.value : AccountTpe_RECIPIENT.value
                    }
                    sendAuthDetails(registrationDetails,"register")
                }else{
                    ErrorMessageFormError.textContent = "Password Not the Same"
                }
            }else{
                ErrorMessageFormError.textContent = "Please Fill the form correctly"

            }
    })
})
