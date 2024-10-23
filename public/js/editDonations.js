const updateDonation = ()=>{
    const editDonationForm = document.getElementById('editDonationForm')
    editDonationForm.setAttribute("action","/doner/manageDonations/editDonations")
    editDonationForm.setAttribute("method","POST")
    editDonationForm.submit()
}