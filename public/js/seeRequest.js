const approveDonationRequest = (id)=>{
    const approveDonationRequestd = document.getElementById("approveDonationRequestd"+id)
    approveDonationRequestd.setAttribute("method","POST")
    approveDonationRequestd.setAttribute("action","/doner/manageDonations/seeDonationRequests/approveDonationRequest")
    approveDonationRequestd.submit()
}
const denyDonationRequest = (id)=>{
    const denyDonationRequestd = document.getElementById("denyDonationRequestd"+id)
    denyDonationRequestd.setAttribute("method","POST")
    denyDonationRequestd.setAttribute("action","/doner/manageDonations/seeDonationRequests/denyDonationRequest")
    denyDonationRequestd.submit()
}