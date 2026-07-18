// Shared security utilities for FormFix
window.FormFix = window.FormFix || {};

// Sanitize text for safe innerHTML insertion
window.FormFix.escapeHtml = function(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
};

// Sanitize filename for download attributes
window.FormFix.sanitizeFilename = function(name) {
    return (name || 'download').replace(/[^a-zA-Z0-9._-]/g, '_').substring(0, 100);
};
