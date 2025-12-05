document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('signatureForm');
    const previewBox = document.getElementById('signaturePreview');
    const copyBtn = document.getElementById('copyBtn');
    const copyStatus = document.getElementById('copyStatus');

    // Input elements
    const inputs = {
        fullName: document.getElementById('fullName'),
        jobTitle: document.getElementById('jobTitle'),
        email: document.getElementById('email'),
        phone: document.getElementById('phone'),
        fax: document.getElementById('fax'),
        photoUrl: document.getElementById('photoUrl')
    };

    // Static Data
    const companyData = {
        name: "Nares Law Group",
        tagline: "Truck Wreck & Brain Injury Lawyers",
        address: "501 S. Cherry Street, Suite 1100 <br>Denver, CO 80246",
        website: "www.nareslawgroup.com",
        websiteUrl: "https://www.nareslawgroup.com/",
        logoUrl: "https://www.nareslawgroup.com/wp-content/uploads/elementor/thumbs/LOGO-2-FOR-LIGHT-BACKGROUND_2-removebg-preview-1-r333rbobxh5vfux4toi0wl2ghzqn1hl7w9d74e7lpc.png", // Using one of the images found, or we can use a text fallback
        colors: {
            primary: "#002147", // Navy
            accent: "#D4AF37",  // Gold
            text: "#333333",
            grey: "#666666"
        },
        social: {
            linkedin: "https://www.linkedin.com/company/nareslawgroup",
            facebook: "https://www.facebook.com/profile.php?id=61562560452944",
            instagram: "https://www.instagram.com/nareslawgroup/",
            youtube: "https://youtube.com/@nareslawgroup"
        }
    };

    // Icons (hosted on a reliable CDN or similar)
    const icons = {
        social: {
            linkedin: "https://cdn-icons-png.flaticon.com/512/61/61109.png",
            facebook: "https://cdn-icons-png.flaticon.com/512/20/20673.png",
            instagram: "https://cdn-icons-png.flaticon.com/512/87/87390.png",
            youtube: "https://cdn-icons-png.flaticon.com/512/1384/1384028.png"
        },
        contact: {
            phone: "https://cdn-icons-png.flaticon.com/512/483/483947.png",
            email: "https://cdn-icons-png.flaticon.com/512/542/542638.png",
            web: "https://cdn-icons-png.flaticon.com/512/1006/1006771.png",
            address: "https://cdn-icons-png.flaticon.com/512/535/535239.png",
            fax: "https://cdn-icons-png.flaticon.com/512/7175/7175143.png"
        }
    };

    function generateSignature() {
        const data = {
            fullName: inputs.fullName.value || "Kaitlin Nares",
            jobTitle: inputs.jobTitle.value || "Founder & Attorney",
            email: inputs.email.value || "kaitlin@nareslawgroup.com",
            phone: inputs.phone.value || "720-637-7786",
            fax: inputs.fax.value || "",
            photoUrl: inputs.photoUrl.value
        };

        let photoHtml = '';
        if (data.photoUrl) {
            photoHtml = `
                <td width="200" style="width: 200px; vertical-align: top;">
                    <img src="${data.photoUrl}" alt="${data.fullName}" width="180" style="width: 180px; height: auto; border-radius: 4px; object-fit: cover;">
                </td>
            `;
        }

        // Helper for contact rows
        const contactRow = (icon, text, href) => `
            <tr>
                <td style="width: 20px; vertical-align: middle; padding-bottom: 5px;">
                    <img src="${icon}" width="14" height="14" style="display: block;">
                </td>
                <td style="vertical-align: middle; padding-bottom: 5px; padding-left: 8px;">
                    ${href ? `<a href="${href}" style="color: ${companyData.colors.text}; text-decoration: none;">${text}</a>` : `<span style="color: ${companyData.colors.text};">${text}</span>`}
                </td>
            </tr>
        `;

        const signatureHtml = `
            <table width="600" cellpadding="0" cellspacing="0" border="0" style="width: 600px; font-family: 'Montserrat', Arial, sans-serif; font-size: 14px; line-height: 1.4; color: ${companyData.colors.text};">
                <tr>
                    ${photoHtml}
                    <td width="400" style="width: 400px; vertical-align: top;">
                        <div style="font-size: 18px; font-weight: bold; color: ${companyData.colors.primary}; margin-bottom: 4px;">
                            ${data.fullName}
                        </div>
                        <div style="font-size: 14px; color: ${companyData.colors.grey}; font-style: italic; margin-bottom: 10px;">
                            ${data.jobTitle}
                        </div>
                        
                        <div style="border-top: 2px solid ${companyData.colors.accent}; width: 50px; margin-bottom: 15px;"></div>

                        <table cellpadding="0" cellspacing="0" border="0" style="font-size: 13px; margin-bottom: 15px;">
                            ${contactRow(icons.contact.phone, data.phone, `tel:${data.phone.replace(/[^0-9+]/g, '')}`)}
                            ${data.fax ? contactRow(icons.contact.fax, data.fax, null) : ''}
                            ${contactRow(icons.contact.email, data.email, `mailto:${data.email}`)}
                            ${contactRow(icons.contact.web, companyData.website, companyData.websiteUrl)}
                            ${contactRow(icons.contact.address, companyData.address, null)}
                        </table>

                        <div style="margin-bottom: 15px;">
                            <img src="${companyData.logoUrl}" alt="Nares Law Group" width="400" style="display: block; width: 100%; max-width: 100%; height: auto;">
                        </div>

                        <div>
                            <a href="${companyData.social.linkedin}" style="text-decoration: none; margin-right: 5px;">
                                <img src="${icons.social.linkedin}" alt="LinkedIn" width="20" height="20" style="display: inline-block;">
                            </a>
                            <a href="${companyData.social.facebook}" style="text-decoration: none; margin-right: 5px;">
                                <img src="${icons.social.facebook}" alt="Facebook" width="20" height="20" style="display: inline-block;">
                            </a>
                            <a href="${companyData.social.instagram}" style="text-decoration: none; margin-right: 5px;">
                                <img src="${icons.social.instagram}" alt="Instagram" width="20" height="20" style="display: inline-block;">
                            </a>
                            <a href="${companyData.social.youtube}" style="text-decoration: none;">
                                <img src="${icons.social.youtube}" alt="YouTube" width="20" height="20" style="display: inline-block;">
                            </a>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td colspan="${data.photoUrl ? 2 : 1}" style="padding-top: 20px;">
                        <p style="font-size: 10px; color: #999; line-height: 1.2; margin: 0; border-top: 1px solid #eee; padding-top: 10px;">
                            CONFIDENTIALITY NOTICE: The contents of this email message and any attachments are intended solely for the addressee(s) and may contain confidential and/or privileged information and may be legally protected from disclosure.
                        </p>
                    </td>
                </tr>
            </table>
        `;

        previewBox.innerHTML = signatureHtml;
    }

    // Event Listeners
    Object.values(inputs).forEach(input => {
        input.addEventListener('input', generateSignature);
    });

    copyBtn.addEventListener('click', function() {
        // Select the signature content
        const range = document.createRange();
        range.selectNode(previewBox);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);

        try {
            // Execute copy command
            document.execCommand('copy');
            window.getSelection().removeAllRanges();
            
            copyStatus.textContent = "Signature copied to clipboard!";
            setTimeout(() => {
                copyStatus.textContent = "";
            }, 3000);
        } catch (err) {
            console.error('Unable to copy', err);
            copyStatus.textContent = "Failed to copy. Please select and copy manually.";
            copyStatus.style.color = "red";
        }
    });

    // Initial generation
    generateSignature();
});
