# LeadSolar - Solar Lead Generation Platform

A modern, dark-themed solar lead generation platform with a multi-step form designed to maximize conversions and capture high-quality solar installation leads.

## Features

### Multi-Step Form Flow
1. **Location (ZIP Code)** - Qualifying step to ensure service availability
2. **Homeownership Status** - Critical qualifier for solar installation
3. **Electric Bill Amount** - Helps calculate potential savings
4. **Roof Type** - Technical qualifier for installation
5. **Installation Timeline** - Prioritizes hot leads
6. **Contact Information** - Final step for quote delivery

### Design Highlights
- **Dark Theme**: Sleek, modern dark UI with orange accent colors
- **Smooth Animations**: Fade-in transitions between steps
- **Progress Indicator**: Visual progress bar showing completion
- **Mobile Responsive**: Optimized for all screen sizes
- **Social Proof**: Trust badges, testimonials, and statistics
- **Auto-advance**: Option cards automatically move to next step

### Form Optimization Best Practices
Based on research of successful solar lead generation sites:

- ✅ **Progressive Disclosure**: Start with low-touch questions (location, bill amount)
- ✅ **Visual Options**: Button-based selections instead of dropdowns
- ✅ **Trust Signals**: Licensed/insured badges, 4.9★ rating, testimonials
- ✅ **Value Proposition**: Clear benefits shown upfront ($2,400 avg savings, $0 down)
- ✅ **Privacy Assurance**: Visible privacy notice on contact step
- ✅ **Quick Completion**: 6 steps completable in under 60 seconds

## Information Collected

### Qualifying Data
- **ZIP Code**: Geographic service area validation
- **Homeownership**: Must own property for installation
- **Electric Bill Range**: Determines system size and ROI
- **Roof Type**: Affects installation method and cost
- **Timeline**: Lead prioritization (ASAP, 1-3mo, 3-6mo, 6mo+)

### Contact Information
- First Name
- Last Name
- Email Address
- Phone Number

## Technology Stack

- **Frontend**: Pure HTML5, CSS3, JavaScript (ES6+)
- **Storage**: LocalStorage for form state management
- **Design**: Custom CSS with CSS Grid and Flexbox
- **Icons**: Inline SVG icons
- **Animation**: CSS transitions and keyframe animations

## File Structure

```
LeadSolar/
├── index.html          # Main landing page with multi-step form
├── css/
│   └── styles.css     # Dark theme styling and animations
├── js/
│   └── script.js      # Form logic, validation, and submission
└── README.md          # This file
```

## Getting Started

### Installation
1. Clone or download the repository
2. Open `index.html` in a web browser
3. No build process or dependencies required!

### Usage
1. User enters ZIP code to start
2. Answers qualifying questions via visual button selections
3. Provides contact information on final step
4. Receives confirmation modal
5. Lead data saved for follow-up

## Form Validation

### Built-in Validation
- **ZIP Code**: 5-digit numeric validation
- **Email**: RFC-compliant email format
- **Phone**: Auto-formatted to (XXX) XXX-XXXX
- **Required Fields**: All steps validated before proceeding

### Error Handling
- Real-time field validation
- Clear error messages
- Red border highlights for invalid fields
- Focus on first error field

## Customization

### Colors
Edit CSS variables in `styles.css`:
```css
:root {
    --accent-primary: #FFA500;    /* Change primary accent */
    --bg-primary: #0a0e1a;        /* Change background */
    --text-primary: #ffffff;       /* Change text color */
}
```

### Form Fields
Add/remove steps in `index.html`:
- Duplicate `.form-step` div
- Update `totalSteps` in JavaScript
- Add corresponding validation logic

### Analytics Integration
Uncomment tracking functions in `script.js`:
- Google Analytics (gtag)
- Facebook Pixel (fbq)
- Custom analytics endpoint

## Backend Integration

To connect to your backend:

1. **Update submitForm() function** in `script.js`:
```javascript
fetch('/api/submit-lead', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
})
.then(response => response.json())
.then(data => {
    showSuccessModal();
    // Send to CRM, email notification, etc.
});
```

2. **Create API endpoint** to:
   - Save lead to database
   - Send email notifications
   - Integrate with CRM (Salesforce, HubSpot, etc.)
   - Calculate solar savings
   - Trigger follow-up workflows

## Conversion Optimization

### A/B Testing Ideas
- Test different headlines
- Vary the number of steps (combine/split)
- Test button colors and text
- Experiment with social proof placement
- Try different value propositions

### Lead Quality Improvements
- Add credit score qualifier
- Include utility provider dropdown
- Add estimated roof size
- Include current solar interest level
- Add referral source tracking

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- **Lightweight**: < 50KB total size
- **Fast Load**: No external dependencies
- **Optimized Images**: SVG icons only
- **Smooth Animations**: Hardware-accelerated CSS

## Security Considerations

For production deployment:

1. **HTTPS Required**: Always use SSL/TLS
2. **Input Sanitization**: Validate and sanitize on backend
3. **Rate Limiting**: Prevent spam submissions
4. **CAPTCHA**: Add reCAPTCHA on final step
5. **Data Privacy**: GDPR/CCPA compliance
6. **Secure Storage**: Encrypt sensitive data

## Future Enhancements

- [ ] Solar savings calculator integration
- [ ] Real-time eligibility checking
- [ ] Calendar integration for consultation booking
- [ ] SMS verification for phone numbers
- [ ] Multi-language support
- [ ] A/B testing framework
- [ ] Advanced analytics dashboard
- [ ] CRM auto-sync
- [ ] Email automation
- [ ] Lead scoring system

## License

Proprietary - All rights reserved

## Support

For questions or customization requests, contact the development team.

---

**Built with modern web standards and conversion optimization best practices for solar lead generation.**
