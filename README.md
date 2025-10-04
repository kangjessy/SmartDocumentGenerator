## How I Built an Automated Quotation System Using Google Forms and Apps Script

As a freelance web developer, I often receive quotation requests from potential clients. The problem was simple but time-consuming: every time a new request came in, I had to copy a quotation template, change the client’s name, service details, and send the email manually.

Over time, these administrative tasks took up more time than the pitching process itself. I then thought — couldn’t this be automated with a bit of logic and some free tools from Google?

### The Problem I Wanted to Solve

My goal wasn’t to create a full-fledged CRM or a professional proposal generator. I just wanted a simple, free, and serverless solution that could be used right away.

The requirements were straightforward:

* Clients only need to fill out a simple form.
* The system automatically generates a quotation in PDF format.
* The document is sent to the client’s email.
* I can download the PDF archive directly from Google Sheets or Drive.

With that principle in mind, I started building what I later called the **Smart Document Generator**.

---

### The Solution I Designed

I used three main tools from the Google ecosystem:

* **Google Forms** — as the input interface for clients (name, company, address, email).
* **Google Sheets** — as the database for storing responses.
* **Google Apps Script** — as the “brain” that processes data, generates documents, and sends them automatically.

All three tools are naturally integrated: the form connects to the sheet, and the script runs whenever a new entry is submitted.

---

### Development Process

I began by creating a quotation template in Google Docs, using placeholders such as `{{Client Name}}`, `{{Company Name}}`, and `{{Company Address}}`.

Then, in Apps Script, I wrote a function to:

1. Capture data from the Sheet whenever a new entry is added.
2. Replace placeholders in the document template.
3. Save the result as a PDF file in Google Drive.
4. Send that file to the client’s email using `MailApp.sendEmail()`.

For convenience, I also added an extra column in Google Sheets containing a direct download link to the generated PDF.

The result: every time a client fills out the form, the system automatically creates and sends the quotation — without me having to open any document.

---

### The Results

The time I used to spend typing and sending quotations manually has dropped dramatically — from around 15–30 minutes to less than 1 minute (just to review the output).

Besides efficiency, this system also:

* Ensures the document format stays consistent and clean.
* Reduces the risk of typos in names or company details.
* Automatically stores all quotation archives in Drive.

Even more interesting — this solution is **100% free** and can be built by anyone without any backend development experience.

This small project reminded me of an important truth:

> **Automation doesn’t have to be complicated to make a big impact.**

Sometimes, all we need is to leverage existing tools — Google Forms, Sheets, and a bit of Apps Script logic — to save time and energy.

For freelancers, small agencies, or digital business owners, this kind of approach can be a great first step toward true work efficiency.

If you’re interested in building a similar system, I’ve written a full technical guide on Dev.to:

🔗 **[Automating Client Proposal Generation with Google Forms, Sheets, and Apps Script (Step-by-Step Guide)](https://dev.to/kangjessy/automating-client-proposal-generation-with-google-forms-sheets-and-apps-script-step-by-step-59aj)
**

This project may be simple, but it opens up a lot of possibilities.

Sometimes, big ideas are born from small solutions that effectively solve everyday problems.

---

Would you like me to format this translation into a **README.md** layout (with sections like “Introduction,” “How It Works,” “Setup,” etc.)?
