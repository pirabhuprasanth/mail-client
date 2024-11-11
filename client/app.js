const apiUrl = 'http://localhost:3000/api';
let currentPage = 1;

// Load emails on page load
window.onload = function () {
    loadEmails();
};

// Load emails from backend
async function loadEmails() {
    try {
        const response = await axios.get(`${apiUrl}/emails?page=${currentPage}&limit=10`);
        const emails = response.data.emails;
        displayEmails(emails);
        currentPage++;
    } catch (error) {
        console.error('Error fetching emails:', error);
    }
}

// Display emails in email list
function displayEmails(emails) {
    const emailList = document.getElementById('email-list');
    emails.forEach(email => {
        const emailItem = document.createElement('div');
        emailItem.classList.add('email-item');
        emailItem.innerHTML = `
            <h3>${email.subject}</h3>
            <p>From: ${email.from}</p>
            <p>Date: ${new Date(email.date).toLocaleString()}</p>
        `;
        emailList.appendChild(emailItem);
    });
}

// Load more emails when 'Load More' button is clicked
document.getElementById('load-more').addEventListener('click', loadEmails);

// Send email when form is submitted
document.getElementById('send-email-form').addEventListener('submit', async function (event) {
    event.preventDefault();
    const to = document.getElementById('to').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    try {
        await axios.post(`${apiUrl}/send`, { to, subject, text: message });
        document.getElementById('send-status').innerText = 'Email sent successfully!';
        this.reset();
    } catch (error) {
        console.error('Error sending email:', error);
        document.getElementById('send-status').innerText = 'Error sending email.';
    }
});
