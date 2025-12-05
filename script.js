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
        photoUrl: document.getElementById('photoUrl')
    };

    // Static Data
    const companyData = {
        name: "Nares Law Group",
        tagline: "Truck Wreck & Brain Injury Lawyers",
        address: "501 S. Cherry Street, Suite 1100 Denver, CO 80246",
        website: "www.nareslawgroup.com",
        websiteUrl: "https://www.nareslawgroup.com/",
        logoUrl: "https://www.nareslawgroup.com/wp-content/uploads/2025/03/image-99-1.png", // Using one of the images found, or we can use a text fallback
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

    // Social Icons (hosted on a reliable CDN or similar)
    const socialIcons = {
        linkedin: "https://cdn-icons-png.flaticon.com/512/174/174857.png",
        facebook: "https://cdn-icons-png.flaticon.com/512/733/733547.png",
        instagram: "https://cdn-icons-png.flaticon.com/512/2111/2111463.png",
        youtube: "https://cdn-icons-png.flaticon.com/512/1384/1384060.png"
    };

    function generateSignature() {
        const data = {
            fullName: inputs.fullName.value || "Kaitlin Nares",
            jobTitle: inputs.jobTitle.value || "Founder & Attorney",
            email: inputs.email.value || "kaitlin@nareslawgroup.com",
            phone: inputs.phone.value || "720-637-7786",
            photoUrl: inputs.photoUrl.value
        };

        let photoHtml = '';
        if (data.photoUrl) {
            photoHtml = `
                <td style="padding-right: 20px; vertical-align: top;">
                    <img src="${data.photoUrl}" alt="${data.fullName}" width="100" style="border-radius: 50%; width: 100px; height: 100px; object-fit: cover; border: 2px solid ${companyData.colors.accent};">
                </td>
            `;
        }

        const signatureHtml = `
            <table cellpadding="0" cellspacing="0" border="0" style="font-family: 'Montserrat', Arial, sans-serif; font-size: 14px; line-height: 1.4; color: ${companyData.colors.text};">
                <tr>
                    ${photoHtml}
                    <td style="vertical-align: top;">
                        <div style="font-size: 18px; font-weight: bold; color: ${companyData.colors.primary}; margin-bottom: 4px;">
                            ${data.fullName}
                        </div>
                        <div style="font-size: 14px; color: ${companyData.colors.grey}; font-style: italic; margin-bottom: 10px;">
                            ${data.jobTitle}
                        </div>
                        
                        <div style="border-top: 2px solid ${companyData.colors.accent}; width: 50px; margin-bottom: 10px;"></div>

                        <div style="margin-bottom: 5px;">
                            <strong style="color: ${companyData.colors.primary};">P:</strong> <a href="tel:${data.phone.replace(/[^0-9+]/g, '')}" style="color: ${companyData.colors.text}; text-decoration: none;">${data.phone}</a>
                            <span style="color: ${companyData.colors.accent}; margin: 0 5px;">|</span>
                            <strong style="color: ${companyData.colors.primary};">E:</strong> <a href="mailto:${data.email}" style="color: ${companyData.colors.text}; text-decoration: none;">${data.email}</a>
                        </div>
                        
                        <div style="margin-bottom: 10px;">
                            <strong style="color: ${companyData.colors.primary};">W:</strong> <a href="${companyData.websiteUrl}" style="color: ${companyData.colors.text}; text-decoration: none;">${companyData.website}</a>
                        </div>

                        <div style="margin-bottom: 15px; color: ${companyData.colors.grey}; font-size: 13px;">
                            ${companyData.address}
                        </div>

                        <div style="margin-bottom: 10px;">
                            <span style="font-weight: bold; color: ${companyData.colors.primary}; font-size: 16px;">Nares Law Group</span><br>
                            <span style="color: ${companyData.colors.accent}; font-size: 12px; letter-spacing: 1px; text-transform: uppercase;">${companyData.tagline}</span>
                        </div>

                        <div>
                            <a href="${companyData.social.linkedin}" style="text-decoration: none; margin-right: 5px;">
                                <img src="${socialIcons.linkedin}" alt="LinkedIn" width="20" height="20" style="display: inline-block;">
                            </a>
                            <a href="${companyData.social.facebook}" style="text-decoration: none; margin-right: 5px;">
                                <img src="${socialIcons.facebook}" alt="Facebook" width="20" height="20" style="display: inline-block;">
                            </a>
                            <a href="${companyData.social.instagram}" style="text-decoration: none; margin-right: 5px;">
                                <img src="${socialIcons.instagram}" alt="Instagram" width="20" height="20" style="display: inline-block;">
                            </a>
                            <a href="${companyData.social.youtube}" style="text-decoration: none;">
                                <img src="${socialIcons.youtube}" alt="YouTube" width="20" height="20" style="display: inline-block;">
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
