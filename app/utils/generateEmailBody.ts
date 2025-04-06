// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function generateEmailBody(formData: any): string {
  return `
    <h1>ViolaMed Contact Form Submission</h1>
    <p><strong>Selected Package:</strong> ${formData.package || 'N/A'}</p>
    <h2>Personal Information</h2>
    <p><strong>Name:</strong> ${formData.name || 'N/A'}</p>
    <p><strong>Surname:</strong> ${formData.surname || 'N/A'}</p>
    <p><strong>Street and Number:</strong> ${formData.streetNumber || 'N/A'}</p>
    <p><strong>Postal Code:</strong> ${formData.postalCode || 'N/A'}</p>
    <p><strong>City:</strong> ${formData.city || 'N/A'}</p>
    <p><strong>Date of Birth:</strong> ${formData.dob || 'N/A'}</p>
    <p><strong>Email:</strong> ${formData.email || 'N/A'}</p>
    <p><strong>Phone:</strong> ${formData.phone || 'N/A'}</p>
    <p><strong>Termination Date:</strong> ${formData.termination || 'N/A'}</p>
    <h2>Children</h2>
    ${
      formData.children && formData.children.length > 0
        ? formData.children
            .map(
              (child: { name?: string; surname?: string; dob?: string }, index: number) => `
        <p><strong>Child ${index + 1} Name:</strong> ${child.name || 'N/A'}</p>
        <p><strong>Child ${index + 1} Surname:</strong> ${child.surname || 'N/A'}</p>
        <p><strong>Child ${index + 1} DOB:</strong> ${child.dob || 'N/A'}</p>
      `
            )
            .join('')
        : '<p>No children added.</p>'
    }
    <h2>IBAN & Payment Information</h2>
    <p><strong>Bank Name:</strong> ${formData.bank || 'N/A'}</p>
    <p><strong>Account Owner:</strong> ${formData.owner || 'N/A'}</p>
    <p><strong>BIC:</strong> ${formData.bic || 'N/A'}</p>
    <p><strong>IBAN:</strong> ${formData.iban || 'N/A'}</p>
    <p><strong>IBAN Authorization Date:</strong> ${formData.iban_date || 'N/A'}</p>
  `;
}