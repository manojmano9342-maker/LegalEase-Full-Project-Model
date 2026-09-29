const $ = id => document.getElementById(id);

const templates = {
  "Rental Agreement": (d) => `RENTAL AGREEMENT

This Rental Agreement is prepared as a DRAFT on ${d.date}.

LANDLORD / OWNER:
${d.fullName || "[Full Name]"}

ADDRESS:
${d.address || "[Address]"}

TERMS
1. Property and purpose: ${d.details || "[Describe the property and permitted use]."}
2. Rent and payment terms: [Insert agreed amount and payment date].
3. Security deposit: [Insert amount and conditions].
4. Duration: [Insert start date and end date].
5. Maintenance and responsibilities: [Insert agreed responsibilities].
6. Termination: [Insert notice and termination conditions].

SIGNATURES

Landlord: ______________________

Tenant: ________________________

Date: __________________________

DRAFT — REVIEW REQUIRED BY A QUALIFIED LEGAL PROFESSIONAL.`,

  "Affidavit": (d) => `AFFIDAVIT

I, ${d.fullName || "[Full Name]"}, residing at
${d.address || "[Address]"}, state that the following information is true to the best of my knowledge:

${d.details || "[Insert statement/facts to be affirmed]."}

I understand that this is a draft prepared for educational purposes and that applicable local requirements may differ.

Date: ${d.date}

Signature: ______________________

DRAFT — REVIEW REQUIRED BY A QUALIFIED LEGAL PROFESSIONAL.`,

  "Leave and License Agreement": (d) => `LEAVE AND LICENSE AGREEMENT

Date: ${d.date}

LICENSOR / OWNER:
${d.fullName || "[Full Name]"}

ADDRESS:
${d.address || "[Address]"}

LICENSE DETAILS
1. Licensed premises: [Insert property details].
2. License period: [Insert period].
3. License fee: [Insert amount and payment schedule].
4. Security deposit: [Insert amount].
5. Responsibilities: [Insert maintenance and usage terms].
6. Termination: [Insert applicable notice terms].

Additional details:
${d.details || "[Insert additional terms]."}

Signatures:
Licensor: ______________________
Licensee: ______________________

DRAFT — REVIEW REQUIRED BY A QUALIFIED LEGAL PROFESSIONAL.`,

  "Simple Legal Notice": (d) => `LEGAL NOTICE — DRAFT

Date: ${d.date}

FROM:
${d.fullName || "[Full Name]"}
${d.address || "[Address]"}

SUBJECT: [Insert subject]

NOTICE

${d.details || "[Describe the relevant facts, request, deadline, and supporting information]."}

REQUEST / ACTION REQUIRED:
[Insert requested action and reasonable response period.]

Contact details:
[Insert contact information]

Signature: ______________________

DRAFT — REVIEW REQUIRED BY A QUALIFIED LEGAL PROFESSIONAL.`,

  "Non-Disclosure Agreement": (d) => `NON-DISCLOSURE AGREEMENT — DRAFT

Date: ${d.date}

PARTY A:
${d.fullName || "[Full Name]"}
${d.address || "[Address]"}

PURPOSE
The parties intend to discuss information that may be confidential.

1. Confidential Information
[Define information that should be treated as confidential.]

2. Permitted Use
Confidential information should be used only for the agreed purpose.

3. Exceptions
[Insert applicable exceptions.]

4. Duration
[Insert confidentiality period.]

5. Return / Destruction
[Insert agreed process.]

Additional details:
${d.details || "[Insert project-specific terms]."}

Signatures:
Party A: ______________________
Party B: ______________________

DRAFT — REVIEW REQUIRED BY A QUALIFIED LEGAL PROFESSIONAL.`,

  "Employment Agreement": (d) => `EMPLOYMENT AGREEMENT — DRAFT

Date: ${d.date}

EMPLOYEE:
${d.fullName || "[Full Name]"}
${d.address || "[Address]"}

1. Position: [Insert job title].
2. Start Date: [Insert date].
3. Compensation: [Insert salary/wage and payment terms].
4. Duties: [Insert responsibilities].
5. Working Hours: [Insert hours].
6. Leave and Benefits: [Insert applicable terms].
7. Termination: [Insert applicable notice terms].
8. Confidentiality and Intellectual Property: [Insert terms].

Additional details:
${d.details || "[Insert additional employment terms]."}

Employer Signature: ______________________
Employee Signature: ______________________

DRAFT — REVIEW REQUIRED BY A QUALIFIED LEGAL PROFESSIONAL.`
};

function getData(){
  return {
    documentType: $("documentType").value,
    fullName: $("fullName").value.trim(),
    address: $("address").value.trim(),
    date: $("date").value || new Date().toISOString().slice(0,10),
    details: $("details").value.trim()
  };
}

function showDocument(text){
  $("preview").textContent = text;
}

async function generate(){
  const data = getData();
  $("status").textContent = "Generating draft...";

  try {
    const response = await fetch("/api/generate", {
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(data)
    });

    if(response.ok){
      const result = await response.json();
      showDocument(result.document);
      $("status").textContent = "AI draft generated.";
      return;
    }
  } catch(e) {
    // Local/demo mode.
  }

  const template = templates[data.documentType];
  showDocument(template ? template(data) : "Draft template unavailable.");
  $("status").textContent = "Demo draft generated locally.";
}

$("generateBtn").addEventListener("click", generate);
$("printBtn").addEventListener("click", () => window.print());
$("clearBtn").addEventListener("click", () => {
  $("fullName").value = "";
  $("address").value = "";
  $("date").value = "";
  $("details").value = "";
  $("status").textContent = "";
  $("preview").innerHTML = `<div class="empty"><div class="empty-icon">📄</div><h4>Your generated document will appear here</h4><p>Fill the form and click <b>Generate Draft</b>.</p></div>`;
});
