document.addEventListener("DOMContentLoaded",()=>{
const navGetDonationBtn = document.getElementById("navGetDonationBtn")
const navDonateBtn = document.getElementById("navDonateBtn")
const navLoginBtn = document.getElementById('navLoginBtn')
const navsignUpBtn = document.getElementById('navsignUpBtn')
navLoginBtn.addEventListener("click",()=>{
    window.location.href = "/login"
})
navsignUpBtn.addEventListener("click",()=>{
    window.location.href = "/register"
})  
navGetDonationBtn.addEventListener("click",()=>{
    window.location.href = "/register"
})
navDonateBtn.addEventListener("click",()=>{
    window.location.href = "/register"
})
})
const goToAddDonationsPage = ()=>{
    window.location.href = "/doner/addDonation"
}
const goToManageDonationsPage = ()=>{
    window.location.href = "/doner/manageDonations"
}
