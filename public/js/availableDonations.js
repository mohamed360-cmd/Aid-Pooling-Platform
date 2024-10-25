const requestDonation = (id)=>{
    const donationItem = document.getElementById("donationItem"+id)
    donationItem.setAttribute("method","post")
    donationItem.setAttribute("action" ,"/recipient/donationRequest")
    donationItem.submit()
}