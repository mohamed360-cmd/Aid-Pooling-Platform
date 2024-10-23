const editDonation = (id)=>{
    const donationTile = document.getElementById("donationItem"+id)
    donationTile.setAttribute("action", `/doner/manageDonations/editDonations/${id}`);

    donationTile.setAttribute("method","GET")
    donationTile.submit()
}
const removeDonation = (id)=>{
    const donationTile = document.getElementById("donationItem"+id)
    donationTile.setAttribute("action", `/doner/manageDonations/removeDonation`);
    donationTile.setAttribute("method","post")
    donationTile.submit()
}
const changeDonationStatus  = (id)=>{
    const donationTile = document.getElementById("donationItem"+id)
    donationTile.setAttribute("action", `/doner/manageDonations/changeDonationStatus`);
    donationTile.setAttribute("method","post")
    donationTile.submit()
}