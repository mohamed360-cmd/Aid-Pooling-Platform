const addDonation = ()=>{
    const addDonationForm = document.getElementById('addDonationForm')
    addDonationForm.setAttribute("method","POST")
    addDonationForm.setAttribute("action","/doner/addDonation")
    addDonationForm.submit()
}